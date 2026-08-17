import { useState, useEffect, useRef } from "react";
import { Heart, X, CreditCard } from "lucide-react";

declare global {
  interface Window {
    cp?: {
      CloudPayments: new () => {
        pay: (
          method: "charge" | "auth",
          payload: object,
          callbacks: {
            onSuccess?: () => void;
            onFail?: (reason: string) => void;
            onComplete?: (paymentResult: object, params: object) => void;
          }
        ) => void;
      };
    };
  }
}

const CP_PUBLIC_ID = "pk_29304e270934045c05a006a4e38a0";
const PRESETS = [500, 1000, 3000];

function formatAmount(n: number) {
  return n.toLocaleString("ru-RU") + " ₽";
}

export function DonateWidget() {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [preset, setPreset] = useState<number | null>(null);
  const [recurrent, setRecurrent] = useState(false);
  const [status, setStatus] = useState<{ text: string; ok: boolean } | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 80);
      setStatus(null);
    }
  }, [open]);

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function selectPreset(p: number) {
    setPreset(p);
    setAmount(String(p));
    setStatus(null);
  }

  function handleAmountInput(v: string) {
    setAmount(v);
    const num = parseFloat(v);
    setPreset(PRESETS.includes(num) ? num : null);
    setStatus(null);
  }

  function handlePay() {
    const amountNum = parseFloat(amount);
    if (!amountNum || amountNum <= 0) {
      setStatus({ text: "Пожалуйста, укажите сумму пожертвования.", ok: false });
      inputRef.current?.focus();
      return;
    }

    if (!window.cp) {
      setStatus({ text: "Платёжный виджет не загружен. Обновите страницу.", ok: false });
      return;
    }

    setLoading(true);
    setStatus(null);

    const payload: Record<string, unknown> = {
      publicId: CP_PUBLIC_ID,
      description: recurrent
        ? "Ежемесячное пожертвование в благотворительный фонд «Добро Даром»"
        : "Пожертвование в благотворительный фонд «Добро Даром»",
      amount: amountNum,
      currency: "RUB",
      skin: "modern",
      data: { source: "dobrodarom — Replit виджет" },
    };

    if (recurrent) {
      (payload.data as Record<string, unknown>).CloudPayments = {
        recurrent: { interval: "Month", period: 1 },
      };
    }

    const widget = new window.cp.CloudPayments();
    widget.pay("charge", payload, {
      onSuccess: () => {
        setLoading(false);
        setStatus({
          text: recurrent
            ? "Спасибо! Первый платёж проведён, подписка на ежемесячную поддержку оформлена."
            : "Спасибо за вашу поддержку! Платёж успешно проведён.",
          ok: true,
        });
      },
      onFail: (reason) => {
        setLoading(false);
        setStatus({
          text: "Платёж не завершён: " + (reason || "попробуйте ещё раз."),
          ok: false,
        });
      },
      onComplete: () => { setLoading(false); },
    });
  }

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed right-5 bottom-5 z-[9998] flex items-center gap-2 rounded-full px-5 py-3.5 font-semibold text-[15px] text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
        style={{ background: "#C1495A", boxShadow: "0 6px 20px rgba(193,73,90,0.4)" }}
        aria-label="Пожертвовать картой"
      >
        <CreditCard className="w-5 h-5 shrink-0" />
        Пожертвовать картой
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ background: "rgba(20,15,16,0.55)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
          role="dialog"
          aria-modal="true"
          aria-label="Пожертвование картой"
        >
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-7 shadow-2xl">
            {/* Close */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-3 text-gray-400 hover:text-gray-700 transition-colors text-2xl leading-none"
              aria-label="Закрыть"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-5">
              <Heart className="w-5 h-5 text-[#C1495A] fill-[#C1495A]" />
              <p className="text-[18px] font-bold text-gray-900">Поддержать «Добро Даром»</p>
            </div>

            {/* Presets */}
            <div className="flex gap-2 mb-3">
              {PRESETS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => selectPreset(p)}
                  className="flex-1 rounded-lg border py-2.5 text-sm font-medium transition-colors"
                  style={
                    preset === p
                      ? { background: "#C1495A", borderColor: "#C1495A", color: "#fff" }
                      : { background: "#FBF3F4", borderColor: "#e0d3d5", color: "#333" }
                  }
                >
                  {formatAmount(p)}
                </button>
              ))}
            </div>

            {/* Amount input */}
            <label className="block text-xs text-gray-500 mb-1.5">Сумма, ₽</label>
            <input
              ref={inputRef}
              type="number"
              min={1}
              step={1}
              placeholder="Введите сумму"
              value={amount}
              onChange={(e) => handleAmountInput(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-[16px] mb-4 focus:outline-none focus:ring-2 focus:ring-[#C1495A]/40"
            />

            {/* Recurrent */}
            <label className="flex items-center gap-2 mb-5 cursor-pointer text-sm text-gray-700">
              <input
                type="checkbox"
                checked={recurrent}
                onChange={(e) => setRecurrent(e.target.checked)}
                className="w-4 h-4"
              />
              Сделать пожертвование ежемесячным
            </label>

            {/* Pay button */}
            <button
              type="button"
              onClick={handlePay}
              disabled={loading}
              className="w-full rounded-lg py-3.5 text-[16px] font-semibold text-white transition-colors disabled:opacity-60"
              style={{ background: "#C1495A" }}
            >
              {loading ? "Открываем форму оплаты…" : "Оплатить картой"}
            </button>

            {/* Status */}
            {status && (
              <p
                className="mt-3 text-center text-sm"
                style={{ color: status.ok ? "#2b8a3e" : "#c0392b" }}
              >
                {status.text}
              </p>
            )}

            <p className="mt-3 text-center text-[11px] text-gray-400 leading-snug">
              Оплата проходит через защищённый виджет CloudPayments.
              Мы не получаем и не храним данные вашей карты.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
