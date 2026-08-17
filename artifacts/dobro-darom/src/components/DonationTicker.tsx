/**
 * DonationTicker — бегущая строка последних пожертвований.
 *
 * Показывает только дату и сумму — без имени и любых персональных данных
 * (152-ФЗ о защите персональных данных).
 *
 * Приоритет данных:
 * 1. Реальные транзакции из БД (webhook) через useListDonations.
 * 2. STATIC_DONATIONS — реальные данные из выгрузки CloudPayments как фоллбек.
 */
import { useListDonations } from "@workspace/api-client-react";
import { STATIC_DONATIONS, formatDateRu, formatDateFromDate } from "@/lib/static-donations";

interface TickerItem {
  text: string;
  monthly: boolean;
}

function makeStaticItems(): TickerItem[] {
  return STATIC_DONATIONS.map((d) => ({
    text: `${d.amount.toLocaleString("ru-RU")} ₽ · ${formatDateRu(d.date)}`,
    monthly: d.type === "monthly",
  }));
}

function makeLiveItems(
  data: { amount: number; type: string; createdAt: Date | string }[],
): TickerItem[] {
  return data.map((d) => {
    const date = d.createdAt instanceof Date ? d.createdAt : new Date(d.createdAt);
    const dateStr = isNaN(date.getTime()) ? "" : formatDateFromDate(date);
    return {
      text: `${d.amount.toLocaleString("ru-RU")} ₽${dateStr ? ` · ${dateStr}` : ""}`,
      monthly: d.type === "monthly",
    };
  });
}

export function DonationTicker() {
  const { data } = useListDonations({ limit: 10 });

  const items: TickerItem[] =
    data && data.length > 0 ? makeLiveItems(data) : makeStaticItems();

  const isLiveData = data && data.length > 0;
  const loop = [...items, ...items];

  return (
    <section className="py-8 bg-white border-y border-border overflow-hidden">
      <div className="container mx-auto px-6 mb-4 flex items-center justify-between">
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
          Помогли недавно
        </p>
        {isLiveData && (
          <span className="inline-flex items-center gap-1.5 text-[10px] text-green-600 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Обновляется в реальном времени
          </span>
        )}
      </div>

      <div className="flex gap-3 px-6 overflow-hidden relative w-full group">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex animate-[ticker_40s_linear_infinite] gap-3 group-hover:[animation-play-state:paused] w-max">
          {loop.map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center gap-2 bg-secondary/50 rounded-full px-5 py-2.5 text-sm font-medium whitespace-nowrap"
            >
              {item.monthly && (
                <span
                  title="Ежемесячный донор"
                  className="text-primary text-[11px] font-bold leading-none"
                >
                  ↻
                </span>
              )}
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        <style>{`
          @keyframes ticker {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </section>
  );
}
