/**
 * /club — Клуб «Добро Даром»
 *
 * Аналитические data-атрибуты расставлены на кнопках пожертвований:
 *   data-donate="donate_club"          — общие кнопки
 *   data-donate="become_guardian"      — кнопки «Стать Хранителем»
 *   data-donate="level_<slug>"         — кнопки уровней клуба
 *
 * Для подключения Яндекс.Метрики/GTM — искать все data-donate="*" в этом файле.
 */
import { useState, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/Animations";
import { Lock, ShieldCheck, ChevronRight, ArrowRight } from "lucide-react";
import {
  HEART_PATH,
  HEART_CENTER,
  ECHO_SCALES,
  ECHO_STROKE_W,
  ECHO_OPACITIES,
  NUM_RAYS,
  RAY_R1,
  RAY_R2,
  RAY_SW,
} from "@/components/Logo";

/* ─────────────────────── CloudPayments ─────────────────────── */
const CP_PUBLIC_ID = "pk_29304e270934045c05a006a4e38a0";

/* ─────────────────────── Клубные уровни ─────────────────────── */
interface Level {
  slug: string;
  emoji: string;
  title: string;
  range: string;
  preset: number;       // сумма для предзаполнения формы
  rangeLabel: string;   // для отображения в карточке
  desc: string;
  monthly: boolean;
  accent: boolean;      // Хранитель — выделен особо
}

const LEVELS: Level[] = [
  {
    slug:       "seed",
    emoji:      "🌱",
    title:      "Семя добра",
    range:      "0–500 ₽",
    preset:     300,
    rangeLabel: "до 500 ₽",
    desc:       "С каждого доброго дела начинается большое.",
    monthly:    false,
    accent:     false,
  },
  {
    slug:       "sprout",
    emoji:      "🌿",
    title:      "Росток добра",
    range:      "500–1 000 ₽",
    preset:     500,
    rangeLabel: "500–1 000 ₽",
    desc:       "Ваш вклад помогает добру расти.",
    monthly:    false,
    accent:     false,
  },
  {
    slug:       "tree",
    emoji:      "🌳",
    title:      "Дерево добра",
    range:      "1 000–5 000 ₽",
    preset:     1000,
    rangeLabel: "1 000–5 000 ₽",
    desc:       "Вы становитесь опорой для тех, кому сегодня нужна помощь.",
    monthly:    false,
    accent:     false,
  },
  {
    slug:       "builder",
    emoji:      "🏡",
    title:      "Созидатель добра",
    range:      "5 000–15 000 ₽",
    preset:     5000,
    rangeLabel: "5 000–15 000 ₽",
    desc:       "Вы помогаете не только поддерживать людей, но и создавать условия для новой самостоятельной жизни.",
    monthly:    false,
    accent:     false,
  },
  {
    slug:       "guardian",
    emoji:      "❤️",
    title:      "Хранитель добра",
    range:      "от 1 000 ₽/мес",
    preset:     1000,
    rangeLabel: "от 1 000 ₽/мес",
    desc:       "Ваше добро рядом каждый месяц. Регулярная поддержка позволяет фонду планировать помощь и быть рядом с семьями тогда, когда это особенно необходимо.",
    monthly:    true,
    accent:     true,
  },
];

/* ─────────────────────── Helpers ─────────────────────── */
function getLevelByAmount(amount: number, type: "monthly" | "once"): Level {
  if (type === "monthly" && amount >= 1000) return LEVELS[4];
  if (amount < 500)  return LEVELS[0];
  if (amount < 1000) return LEVELS[1];
  if (amount < 5000) return LEVELS[2];
  return LEVELS[3];
}

const PRESET_AMOUNTS = [500, 1000, 3000, 5000, 10000];

/* ─────────────────────── Animated Hero Symbol ─────────────────────── */
/**
 * Анимированная версия фирменного знака для hero-блока страницы клуба.
 * Использует ту же геометрию, что и Logo/BrandMark — импортированные константы.
 */
function ClubHeroSymbol() {
  const cx = HEART_CENTER.x;
  const cy = HEART_CENTER.y;

  const rays = Array.from({ length: NUM_RAYS }, (_, i) => {
    const angle = (i * 2 * Math.PI) / NUM_RAYS;
    return {
      x1: 50 + RAY_R1 * Math.cos(angle),
      y1: 50 + RAY_R1 * Math.sin(angle),
      x2: 50 + RAY_R2 * Math.cos(angle),
      y2: 50 + RAY_R2 * Math.sin(angle),
    };
  });

  return (
    <div className="flex items-center justify-center w-56 h-56 md:w-72 md:h-72 mx-auto md:mx-0">
      <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
        {/* Лучи — появляются последовательно */}
        {rays.map((ray, i) => (
          <motion.line
            key={i}
            x1={ray.x1} y1={ray.y1}
            x2={ray.x2} y2={ray.y2}
            stroke="#E30016"
            strokeWidth={RAY_SW}
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 + i * 0.025, duration: 0.35 }}
          />
        ))}

        {/* Эхо-контуры — от большего к меньшему, расходятся наружу */}
        {[...ECHO_SCALES].reverse().map((scale, ri) => {
          const i = ECHO_SCALES.length - 1 - ri;
          return (
            <motion.g
              key={scale}
              transform={`translate(${cx},${cy}) scale(${scale}) translate(${-cx},${-cy})`}
              initial={{ opacity: 0 }}
              animate={{ opacity: ECHO_OPACITIES[i] }}
              transition={{ delay: 0.25 + i * 0.2, duration: 0.6, ease: "easeOut" }}
            >
              <path
                d={HEART_PATH}
                fill="none"
                stroke="#E30016"
                strokeWidth={ECHO_STROKE_W[i] / scale}
                strokeLinejoin="round"
              />
            </motion.g>
          );
        })}

        {/* Залитое сердце — появляется первым */}
        <motion.path
          d={HEART_PATH}
          fill="#E30016"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.05, duration: 0.5, ease: "backOut" }}
          style={{ originX: "50%", originY: "51%" }}
        />
      </svg>
    </div>
  );
}

/* ─────────────────────── Donation Form (embedded) ─────────────────────── */
interface DonationFormProps {
  defaultAmount?: number;
  defaultType?: "monthly" | "once";
}

type PayState = "form" | "success";

function ClubDonationForm({ defaultAmount = 1000, defaultType = "monthly" }: DonationFormProps) {
  const [type, setType] = useState<"monthly" | "once">(defaultType);
  const [amount, setAmount] = useState<number | "">(defaultAmount);
  const [customAmount, setCustomAmount] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName]   = useState("");
  const [phone, setPhone] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [payState, setPayState] = useState<PayState>("form");
  const [paidAmount, setPaidAmount] = useState(0);
  const [paidType, setPaidType] = useState<"monthly" | "once">("monthly");

  const finalAmount = customAmount ? parseInt(customAmount) : (typeof amount === "number" ? amount : 0);
  const currentLevel = getLevelByAmount(finalAmount, type);

  const handleAmountClick = (val: number) => {
    setAmount(val);
    setCustomAmount("");
  };
  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    setCustomAmount(val);
    setAmount(val ? parseInt(val) : "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!finalAmount || finalAmount < 1) {
      alert("Пожалуйста, укажите сумму пожертвования.");
      return;
    }
    if (type === "monthly" && !email.trim()) {
      alert("Для оформления ежемесячного пожертвования укажите ваш email.");
      return;
    }
    if (!window.cp) {
      alert("Виджет оплаты не загружен. Пожалуйста, обновите страницу.");
      return;
    }
    setIsLoading(true);

    const widget = new window.cp.CloudPayments();
    const description = type === "monthly"
      ? `Ежемесячное пожертвование — Клуб Добро Даром`
      : `Пожертвование — Клуб Добро Даром`;

    const params: Parameters<typeof widget.pay>[1] = {
      publicId:    CP_PUBLIC_ID,
      description,
      amount:      finalAmount,
      currency:    "RUB",
      invoiceId:   `club-${Date.now()}`,
      skin:        "modern",
      ...(email.trim() ? { email: email.trim(), accountId: email.trim() } : {}),
      data: {
        donationType: type,
        clubLevel:    currentLevel.title,
        donorName:    name.trim() || undefined,
        phone:        phone.trim() || undefined,
        newsletter,
        source:       "club_page",
      },
    };
    if (type === "monthly") {
      params.recurrent = { interval: "Month", period: 1, maxPeriods: 0 };
    }

    widget.pay("charge", params, {
      onSuccess: () => {
        setIsLoading(false);
        setPaidAmount(finalAmount);
        setPaidType(type);
        setPayState("success");
        const formEl = document.getElementById("club-form-anchor");
        formEl?.scrollIntoView({ behavior: "smooth" });
      },
      onFail: () => setIsLoading(false),
      onComplete: () => setIsLoading(false),
    });
  };

  if (payState === "success") {
    return (
      <div className="bg-white rounded-3xl border border-border shadow-sm p-10 md:p-14 text-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 text-3xl">
          ❤️
        </div>
        <h3 className="text-2xl md:text-3xl font-serif font-bold mb-3">
          Спасибо за ваше добро!
        </h3>
        <p className="text-lg text-muted-foreground mb-2">
          Вы стали частью Клуба «Добро Даром».
        </p>
        {paidType === "monthly" && (
          <p className="text-sm text-muted-foreground bg-secondary/50 rounded-2xl px-6 py-3 mb-6 inline-block">
            Добро теперь будет рядом каждый месяц. Ежемесячное списание {paidAmount.toLocaleString("ru-RU")} ₽ оформлено.
          </p>
        )}
        <p className="text-muted-foreground mb-8 max-w-sm mx-auto leading-relaxed">
          Каждый человек, которому помог фонд, знает: есть люди, которым не всё равно. Вы — один из них.
        </p>
        <button
          onClick={() => { setPayState("form"); setAmount(1000); setCustomAmount(""); }}
          className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
        >
          Помочь ещё раз
        </button>
      </div>
    );
  }

  return (
    <div id="club-form-anchor" className="bg-white rounded-3xl border border-border shadow-sm p-6 md:p-10">
      <form onSubmit={handleSubmit}>
        {/* Type toggle */}
        <div className="flex p-1 bg-secondary rounded-xl mb-8">
          {(["monthly", "once"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              data-donate={t === "monthly" ? "become_guardian" : "donate_club"}
              className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
                type === t
                  ? t === "monthly" ? "bg-primary text-white shadow-sm" : "bg-white text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "monthly" ? "Ежемесячно" : "Разово"}
            </button>
          ))}
        </div>

        {/* Amount presets */}
        <div className="mb-6">
          <label className="block text-sm font-bold mb-4">Сумма пожертвования (₽)</label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-3">
            {PRESET_AMOUNTS.map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => handleAmountClick(val)}
                className={`py-3 rounded-xl text-sm font-bold transition-all border-2 ${
                  amount === val && !customAmount
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border bg-white text-foreground hover:border-primary/30"
                }`}
              >
                {val.toLocaleString("ru-RU")}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Своя сумма"
            value={customAmount}
            onChange={handleCustomChange}
            className={`w-full py-3 px-4 rounded-xl text-sm font-bold outline-none border-2 transition-all ${
              customAmount
                ? "border-primary bg-primary/5 text-primary"
                : "border-border bg-white focus:border-primary/30"
            }`}
          />
        </div>

        {/* Live status badge for monthly */}
        {type === "monthly" && finalAmount > 0 && (
          <motion.div
            key={currentLevel.slug}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-2xl px-5 py-3"
          >
            <span className="text-xl">{currentLevel.emoji}</span>
            <div className="text-sm">
              <span className="text-muted-foreground">Ваш ежемесячный вклад: </span>
              <strong className="text-foreground">{finalAmount.toLocaleString("ru-RU")} ₽/мес</strong>
              <span className="text-muted-foreground"> · Статус: </span>
              <strong className="text-primary">{currentLevel.title}</strong>
            </div>
          </motion.div>
        )}

        {/* Optional fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Ваше имя (необязательно)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3.5 rounded-xl border-2 border-border bg-white outline-none focus:border-primary/40 transition-colors text-sm"
          />
          <input
            type="tel"
            placeholder="Телефон (необязательно)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3.5 rounded-xl border-2 border-border bg-white outline-none focus:border-primary/40 transition-colors text-sm"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-bold mb-1.5">
            Email{type === "monthly" && <span className="text-primary ml-1">*</span>}
            {type === "monthly" && <span className="text-xs font-normal text-muted-foreground ml-2">— нужен для ежемесячного списания</span>}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ваш email"
            required={type === "monthly"}
            className="w-full p-3.5 rounded-xl border-2 border-border bg-white outline-none focus:border-primary/40 transition-colors text-sm"
          />
        </div>

        {/* Newsletter opt-in */}
        <label className="flex items-start gap-3 mb-8 cursor-pointer group">
          <div className="relative flex-shrink-0 mt-0.5">
            <input
              type="checkbox"
              checked={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${newsletter ? "border-primary bg-primary" : "border-border group-hover:border-primary/40"}`}>
              {newsletter && <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none"><polyline points="1,6 4,9 11,2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </div>
          </div>
          <span className="text-xs text-muted-foreground leading-relaxed">
            Хочу получать новости фонда и отчёты о том, как используется моя помощь
          </span>
        </label>

        <button
          type="submit"
          disabled={isLoading}
          data-donate="donate_club"
          className="w-full bg-primary text-white py-5 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-md active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? "Открываем форму оплаты…" : `Пожертвовать${finalAmount ? " " + finalAmount.toLocaleString("ru-RU") + " ₽" : ""}${type === "monthly" ? " в месяц" : ""}`}
        </button>

        <div className="mt-5 flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> PCI DSS</span>
          <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> CloudPayments</span>
          <span>НДС не облагается</span>
        </div>
        <p className="mt-3 text-xs text-muted-foreground text-center">
          Нажимая кнопку, вы принимаете условия{" "}
          <a href="/privacy" className="underline hover:text-foreground">оферты</a> и{" "}
          <a href="/privacy" className="underline hover:text-foreground">политики конфиденциальности</a>.
        </p>
      </form>
    </div>
  );
}

/* ─────────────────────── Levels Ladder ─────────────────────── */
function LevelsSection() {
  const [active, setActive] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = (level: Level) => {
    const anchor = document.getElementById("club-form-anchor");
    anchor?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 md:py-28 bg-white border-t border-border">
      <div className="container mx-auto px-6 max-w-6xl">
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Пять ступеней добра</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Выберите свой уровень участия. Нажмите на ступень, чтобы узнать подробнее.
            </p>
          </div>
        </FadeUp>

        {/* Horizontal ladder — desktop */}
        <div className="hidden md:flex items-end justify-center gap-0 mb-16">
          {LEVELS.map((level, i) => {
            const heights = [56, 72, 88, 104, 128];
            const h = heights[i];
            const isActive = active === level.slug;
            return (
              <div key={level.slug} className="flex flex-col items-center flex-1 max-w-[200px]">
                {/* Connector line */}
                {i > 0 && (
                  <div className="w-full flex items-end justify-start" style={{ marginBottom: 0 }}>
                    <div className="h-0.5 w-full bg-border -mb-0.5 translate-y-0" />
                  </div>
                )}
                <button
                  onClick={() => setActive(isActive ? null : level.slug)}
                  aria-expanded={isActive}
                  className={`w-full flex flex-col items-center justify-end rounded-t-2xl border-2 transition-all cursor-pointer group focus:outline-none
                    ${isActive
                      ? level.accent
                        ? "border-primary bg-primary text-white"
                        : "border-primary bg-primary/5"
                      : "border-border bg-secondary/30 hover:border-primary/40 hover:bg-secondary/60"
                    }`}
                  style={{ height: `${h}px` }}
                >
                  <span className="text-2xl mb-2">{level.emoji}</span>
                  <span className={`text-[11px] font-bold uppercase tracking-wide mb-2 px-1 text-center leading-tight ${isActive && level.accent ? "text-white" : isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}>
                    {level.title}
                  </span>
                </button>
                <div className={`w-full text-center text-[10px] font-medium pt-2 ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                  {level.range}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile: vertical ladder */}
        <div className="flex md:hidden flex-col gap-2 mb-12">
          {LEVELS.map((level, i) => {
            const isActive = active === level.slug;
            return (
              <div key={level.slug} className="flex gap-3 items-stretch">
                {/* Step indicator */}
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${level.accent ? "bg-primary text-white" : "bg-secondary border border-border"}`}>
                    {i + 1}
                  </div>
                  {i < LEVELS.length - 1 && <div className="w-0.5 flex-1 bg-border mt-1" />}
                </div>
                <button
                  onClick={() => setActive(isActive ? null : level.slug)}
                  className={`flex-1 text-left p-4 rounded-2xl border-2 transition-all mb-2 focus:outline-none ${isActive ? (level.accent ? "border-primary bg-primary text-white" : "border-primary bg-primary/5") : "border-border bg-white hover:border-primary/30"}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{level.emoji}</span>
                    <div>
                      <div className={`font-bold text-sm ${isActive && level.accent ? "text-white" : isActive ? "text-primary" : ""}`}>{level.title}</div>
                      <div className={`text-xs ${isActive && level.accent ? "text-white/80" : "text-muted-foreground"}`}>{level.range}</div>
                    </div>
                    <ChevronRight className={`ml-auto w-4 h-4 transition-transform ${isActive ? "rotate-90" : ""} ${isActive && level.accent ? "text-white/70" : "text-muted-foreground"}`} />
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Expanded card */}
        {active && (() => {
          const level = LEVELS.find(l => l.slug === active)!;
          return (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.28 }}
              className={`rounded-3xl border-2 p-8 md:p-10 max-w-2xl mx-auto ${level.accent ? "border-primary bg-primary/[0.03]" : "border-border bg-secondary/20"}`}
            >
              <div className="flex items-start gap-5">
                <span className="text-4xl">{level.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <h3 className="font-serif font-bold text-xl">{level.title}</h3>
                    {level.accent && (
                      <span className="text-[10px] uppercase tracking-wide bg-primary text-white px-2.5 py-1 rounded-full font-bold">
                        ↻ ключевой статус
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{level.rangeLabel}{level.monthly ? " · ежемесячно" : ""}</p>
                  <p className="text-foreground mt-3 leading-relaxed">{level.desc}</p>
                </div>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => scrollToForm(level)}
                  data-donate={`level_${level.slug}`}
                  className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors text-sm"
                >
                  Стать участником
                </button>
                <button
                  onClick={() => setActive(null)}
                  className="px-8 py-3 rounded-full font-medium border border-border hover:border-primary/30 transition-colors text-sm"
                >
                  Закрыть
                </button>
              </div>
            </motion.div>
          );
        })()}
      </div>
    </section>
  );
}

/* ─────────────────────── Projects ─────────────────────── */
const PROJECTS = [
  {
    emoji: "❤️",
    title: "ЦентрМама",
    desc: "Помогаем мамам, оказавшимся в трудной жизненной ситуации, сохранить семью и начать новую жизнь. Юридическая, психологическая и материальная поддержка.",
    stat: "150+ семей",
  },
  {
    emoji: "🏡",
    title: "ЭкоЦентр Семья",
    desc: "Создаём условия для самостоятельной жизни — жилье, огород, профессиональные навыки. Женщины с детьми находят здесь дорогу к новой жизни.",
    stat: "10+ направлений",
  },
  {
    emoji: "🛒",
    title: "ЦентрЗаботы",
    desc: "Продуктовые наборы и вещевая помощь семьям с детьми в трудной жизненной ситуации. Помогаем регулярно и адресно.",
    stat: "200+ наборов в месяц",
  },
  {
    emoji: "📚",
    title: "ЦентрОбразования",
    desc: "Обучение и профессиональная подготовка для мам: курсы, мастерские, наставники. Знания — путь к независимости.",
    stat: "10+ курсов",
  },
];

/* ─────────────────────── Stories ─────────────────────── */
const STORIES = [
  {
    initial: "А.",
    situation: "Мама двоих детей оказалась в трудной ситуации после потери работы. Без жилья и источника дохода.",
    result: "Благодаря поддержке клуба получила временное жильё, юридическую помощь и прошла профессиональные курсы. Сейчас работает и воспитывает детей самостоятельно.",
  },
  {
    initial: "Н.",
    situation: "Многодетная семья из трёх детей осталась без средств к существованию в сложный период.",
    result: "Семья получала продуктовые наборы в течение полугода. Дети не пропустили учёбу. Мама нашла работу при поддержке ЦентрОбразования.",
  },
  {
    initial: "Е.",
    situation: "Молодая мама с ребёнком до года — без родственников и поддержки в новом городе.",
    result: "Психологическая поддержка, помощь с детскими вещами и знакомство с другими мамами — клуб помог найти точку опоры.",
  },
];

/* ─────────────────────── Main page ─────────────────────── */
export default function ClubPage() {
  const guardianRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    const el = document.getElementById("club-form-anchor");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* SEO */}
      <title>Клуб «Добро Даром» — помогайте вместе с нами</title>
      <meta
        name="description"
        content="Присоединяйтесь к Клубу «Добро Даром». Поддерживайте мам, детей и семьи, оказавшиеся в трудной жизненной ситуации. Разовые и регулярные пожертвования."
      />

      {/* ── 1. HERO ── */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-white border-b border-border overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <FadeUp className="order-2 md:order-1 text-center md:text-left">
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Клуб «Добро Даром»</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-[1.1] mb-6">
                Объединяем людей, которые помогают менять жизни
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg mx-auto md:mx-0">
                Ваше добро помогает мамам, детям, семьям и людям, оказавшимся в трудной жизненной ситуации, начать новую жизнь.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button
                  onClick={scrollToForm}
                  data-donate="donate_club"
                  className="bg-primary text-white px-8 py-4 rounded-full font-bold text-base hover:bg-primary/90 transition-all shadow-sm active:scale-[0.98]"
                >
                  Вступить в клуб
                </button>
                <Link href="/donate">
                  <span className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base border-2 border-border hover:border-primary/40 transition-all cursor-pointer">
                    Сделать пожертвование
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </FadeUp>

            <div className="order-1 md:order-2 flex justify-center">
              <ClubHeroSymbol />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. КАЖДЫЙ ВКЛАД ── */}
      <section className="py-16 md:py-20 bg-secondary/30 border-b border-border">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <FadeUp>
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
              Каждый вклад имеет значение
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Не существует маленького добра. Каждое пожертвование становится частью большой помощи — для конкретной мамы, конкретного ребёнка, конкретной семьи.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── 3. УРОВНИ ── */}
      <LevelsSection />

      {/* ── 4. СТАТЬ ХРАНИТЕЛЕМ ── */}
      <section ref={guardianRef} className="py-20 md:py-28 bg-primary text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <FadeUp>
            <span className="text-4xl block mb-6">❤️</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Станьте Хранителем Добра
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
              Разовая помощь решает проблему сегодня. Регулярная поддержка позволяет фонду планировать помощь и быть рядом с семьями тогда, когда это особенно необходимо.
            </p>
            <button
              onClick={scrollToForm}
              data-donate="become_guardian"
              className="bg-white text-primary px-10 py-4 rounded-full font-bold text-base hover:bg-white/90 transition-all shadow-md active:scale-[0.98]"
            >
              Стать Хранителем Добра
            </button>
            <p className="text-white/60 text-sm mt-4">От 1 000 ₽ в месяц</p>
          </FadeUp>
        </div>
      </section>

      {/* ── 5. ФОРМА ПОЖЕРТВОВАНИЯ ── */}
      <section className="py-20 md:py-28 bg-secondary/20 border-t border-border">
        <div className="container mx-auto px-6 max-w-2xl">
          <FadeUp>
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">Поддержать фонд</h2>
              <p className="text-muted-foreground">
                Путь до оплаты — минимальный. Без обязательной регистрации.
              </p>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <ClubDonationForm defaultAmount={1000} defaultType="monthly" />
          </FadeUp>
        </div>
      </section>

      {/* ── 6. ЛИЧНЫЙ КАБИНЕТ (демо) ── */}
      <section className="py-20 md:py-28 bg-white border-t border-border">
        <div className="container mx-auto px-6 max-w-5xl">
          <FadeUp>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">Личный кабинет участника</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Мы работаем над личным кабинетом, чтобы вы могли видеть историю своей помощи.
              </p>
              <span className="inline-block mt-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground border border-border rounded-full px-3 py-1">
                Демо-макет · функция скоро
              </span>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Status card */}
            <FadeUp className="md:col-span-1">
              <div className="rounded-3xl border-2 border-primary bg-primary/[0.03] p-8">
                <div className="text-3xl mb-3">❤️</div>
                <div className="text-xs font-bold uppercase tracking-widest text-primary mb-1">Ваш статус</div>
                <h3 className="font-serif font-bold text-xl mb-4">Хранитель Добра</h3>
                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Вклад</span>
                    <span className="font-bold">1 000 ₽ / месяц</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">За период</span>
                    <span className="font-bold">12 000 ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Вы помогаете</span>
                    <span className="font-bold">12 месяцев</span>
                  </div>
                </div>
                <div className="mt-5 pt-5 border-t border-border">
                  <div className="text-xs text-muted-foreground">Прогресс этого года</div>
                  <div className="w-full h-2 bg-secondary rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "75%" }} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">9 000 ₽ из 12 000 ₽</div>
                </div>
              </div>
            </FadeUp>

            {/* Future features */}
            <FadeUp delay={0.1} className="md:col-span-2">
              <div className="bg-secondary/30 rounded-3xl border border-border p-8">
                <h4 className="font-bold mb-6">Что будет доступно в личном кабинете</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "История платежей",
                    "Изменение суммы",
                    "Отмена подписки",
                    "Личные благодарности",
                    "Новости фонда",
                    "Ежеквартальные отчёты",
                    "Прямая связь с командой",
                    "Приглашения на события",
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="w-5 h-5 rounded-full border border-border flex items-center justify-center flex-shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-border" />
                      </div>
                      {feat}
                      <span className="text-[10px] font-bold text-muted-foreground/60 ml-auto">скоро</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── 7. ПРОЕКТЫ ── */}
      <section className="py-20 md:py-28 bg-secondary/30 border-t border-border">
        <div className="container mx-auto px-6 max-w-6xl">
          <FadeUp>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Ваше добро становится помощью</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Пожертвования клуба поддерживают четыре направления работы фонда.
              </p>
            </div>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROJECTS.map((p) => (
              <StaggerItem key={p.title}>
                <div className="bg-white rounded-3xl border border-border p-7 h-full flex flex-col">
                  <span className="text-3xl mb-4">{p.emoji}</span>
                  <h3 className="font-bold text-base mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">{p.desc}</p>
                  <div className="text-xs font-bold text-primary">{p.stat}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── 8. ПРОЗРАЧНОСТЬ ── */}
      <section className="py-16 bg-white border-t border-border">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <FadeUp>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-center md:text-left">
                Вы должны знать, что делает ваше добро
              </h2>
              <p className="text-muted-foreground mt-3 max-w-lg text-center md:text-left">
                Мы публикуем годовые отчёты о расходах и результатах, потому что доверие важнее красивых слов.
              </p>
            </FadeUp>
            <FadeUp delay={0.1} className="flex-shrink-0">
              <Link href="/reports">
                <span className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition-colors cursor-pointer">
                  Смотреть отчёты
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── 9. ИСТОРИИ ── */}
      <section className="py-20 md:py-28 bg-secondary/20 border-t border-border">
        <div className="container mx-auto px-6 max-w-6xl">
          <FadeUp>
            <div className="text-center mb-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">За каждым пожертвованием — человек</h2>
              <p className="text-xs text-muted-foreground">
                * Истории публикуются с согласия героев. Имена изменены для сохранения конфиденциальности (152-ФЗ).
              </p>
            </div>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {STORIES.map((s, i) => (
              <StaggerItem key={i}>
                <div className="bg-white rounded-3xl border border-border overflow-hidden h-full flex flex-col">
                  {/* Photo placeholder */}
                  <div className="h-40 bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-border/50 flex items-center justify-center font-serif font-bold text-xl text-muted-foreground">
                      {s.initial}
                    </div>
                  </div>
                  <div className="p-7 flex-1 flex flex-col">
                    <p className="text-sm text-muted-foreground italic leading-relaxed mb-5 flex-1">
                      «{s.situation}»
                    </p>
                    <div className="border-t border-border pt-5">
                      <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Результат</div>
                      <p className="text-sm leading-relaxed">{s.result}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── 10. СОЦИАЛЬНОЕ ДОКАЗАТЕЛЬСТВО ── */}
      <section className="py-20 md:py-24 bg-white border-t border-border">
        <div className="container mx-auto px-6 max-w-5xl">
          <FadeUp>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-14">
              Нас уже объединяет добро
            </h2>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "—",    label: "участников клуба",    note: "демо · скоро" },
              { value: "150+", label: "семей получают помощь", note: null },
              { value: "200+", label: "наборов помощи в месяц", note: null },
              { value: "10+",  label: "направлений работы",   note: null },
            ].map((s) => (
              <StaggerItem key={s.label}>
                <div className="bg-secondary/30 rounded-3xl p-7 text-center border border-border">
                  <div className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">{s.value}</div>
                  <div className="text-sm text-muted-foreground leading-snug">{s.label}</div>
                  {s.note && (
                    <div className="text-[10px] text-muted-foreground/60 font-medium mt-2 uppercase tracking-wide">{s.note}</div>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── 11. ФИНАЛЬНЫЙ CTA ── */}
      <section className="py-24 md:py-32 bg-secondary/30 border-t border-border">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <FadeUp>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
              Присоединяйтесь к Клубу «Добро Даром»
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mb-12">
              Иногда человеку нужна не большая сумма.<br />
              Ему нужен кто-то, кто не пройдёт мимо.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToForm}
                data-donate="donate_club"
                className="bg-primary text-white px-10 py-4 rounded-full font-bold text-base hover:bg-primary/90 transition-all shadow-sm active:scale-[0.98]"
              >
                Сделать пожертвование
              </button>
              <button
                onClick={() => {
                  // scroll to guardian block or form with monthly default
                  guardianRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
                data-donate="become_guardian"
                className="border-2 border-primary text-primary px-10 py-4 rounded-full font-bold text-base hover:bg-primary/5 transition-all active:scale-[0.98]"
              >
                Стать Хранителем Добра
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Floating CTA (mobile only) ── */}
      <div className="fixed bottom-5 left-4 right-4 z-50 md:hidden">
        <button
          onClick={scrollToForm}
          data-donate="donate_club_float"
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-base shadow-lg hover:bg-primary/90 transition-colors active:scale-[0.98]"
        >
          Помочь сейчас
        </button>
      </div>
    </>
  );
}
