import { useEffect, useState } from "react";
import { Heart, Loader2 } from "lucide-react";

interface Donation {
  amount: number | string;
  currency?: string;
  date: string;
  recurrent?: boolean;
  name?: string;
}

const MONTHS = [
  "января","февраля","марта","апреля","мая","июня",
  "июля","августа","сентября","октября","ноября","декабря",
];

function formatDateRu(iso: string): string {
  try {
    const d = new Date(iso);
    return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  } catch { return iso; }
}

function formatAmount(d: Donation): string {
  const n = Math.round(Number(d.amount) || 0);
  const currency = d.currency === "RUB" || !d.currency ? "₽" : d.currency;
  return n.toLocaleString("ru-RU") + " " + currency;
}

export function DonationsFeed() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFeed = () => {
    fetch("/leyka/donations_public.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : []))
      .then((data: Donation[]) => {
        const sorted = [...data].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setDonations(sorted.slice(0, 20));
        setLoading(false);
      })
      .catch(() => { setDonations([]); setLoading(false); });
  };

  useEffect(() => {
    loadFeed();
    // Refresh every minute
    const id = setInterval(loadFeed, 60_000);
    return () => clearInterval(id);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10 text-gray-400">
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
        <span className="text-sm">Загрузка…</span>
      </div>
    );
  }

  if (!donations.length) {
    return (
      <p className="text-sm text-gray-400 text-center py-8">
        Пока нет пожертвований через сайт. Станьте первым, кто поддержит фонд онлайн!
      </p>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {donations.map((d, i) => (
        <div key={i} className="flex justify-between items-center py-4">
          <div>
            <div className="font-semibold text-gray-900 text-[15px] flex items-center gap-2">
              Пожертвование {formatAmount(d)}
              {d.recurrent && (
                <span className="inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                  style={{ background: "#FBF3F4", color: "#C1495A" }}>
                  ежемесячно
                </span>
              )}
            </div>
            <div className="text-xs text-gray-400 mt-0.5">{formatDateRu(d.date)}</div>
          </div>
          <Heart className="w-5 h-5 shrink-0" style={{ color: "#C1495A" }} fill="#C1495A" />
        </div>
      ))}
    </div>
  );
}
