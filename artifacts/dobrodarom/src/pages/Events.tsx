import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Loader2, Rss } from "lucide-react";

interface FeedItem {
  id?: string | number;
  title: string;
  text: string;
  date: string;
  url?: string;
  source?: "vk" | "telegram" | string;
  photo?: string;
}

const MONTHS = [
  "января","февраля","марта","апреля","мая","июня",
  "июля","августа","сентября","октября","ноября","декабря",
];

function formatDateRu(iso: string): string {
  try {
    const d = new Date(iso);
    return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  } catch {
    return iso;
  }
}

function getYear(iso: string): number {
  try { return new Date(iso).getFullYear(); }
  catch { return 0; }
}

function SourceBadge({ source }: { source?: string }) {
  if (!source) return null;
  const label =
    source === "vk" ? "ВКонтакте" :
    source === "telegram" ? "Telegram" :
    "ВКонтакте и Telegram";
  const color =
    source === "vk" ? "#0077FF" :
    source === "telegram" ? "#2AABEE" : "#6b7280";
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold"
      style={{ background: color + "18", color }}
    >
      {source === "telegram" && (
        <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161l-2.027 9.559c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.28 13.84l-2.94-.92c-.64-.203-.653-.64.136-.95l11.486-4.428c.532-.194.997.13.6 1.62z"/></svg>
      )}
      {source === "vk" && (
        <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.714-1.033-1.01-1.49-.707-1.49.315v1.566c0 .447-.143.591-1.33.591-1.973 0-4.162-1.19-5.693-3.416C5.235 11.861 4.688 9.696 4.688 9.38c0-.26.095-.503.379-.503h1.745c.282 0 .38.143.49.463.537 1.555 1.44 2.918 1.81 2.918.141 0 .205-.065.205-.42V9.38c-.033-.787-.461-.855-.461-1.134 0-.164.13-.33.344-.33h2.744c.232 0 .316.12.316.377v3.053c0 .232.103.313.168.313.141 0 .26-.08.518-.34 1.603-1.794 2.746-4.559 2.746-4.559.08-.167.26-.317.506-.317h1.745c.523 0 .636.269.506.636-.252.583-2.67 4.574-2.67 4.574-.141.236-.19.34 0 .604.143.19.603.586 1.112 1.128.69.74 1.218 1.363 1.36 1.794.158.428-.079.644-.535.644z"/></svg>
      )}
      {label}
    </span>
  );
}

function EventCard({ item, index }: { item: FeedItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 md:p-8 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="text-sm font-semibold" style={{ color: "#b91c3c" }}>
          {formatDateRu(item.date)}
        </span>
        {item.source && (
          <>
            <span className="text-xs text-gray-300">•</span>
            <SourceBadge source={item.source} />
          </>
        )}
      </div>

      {item.photo && (
        <div className="mb-4 rounded-xl overflow-hidden aspect-[16/9] bg-gray-100">
          <img
            src={item.photo}
            alt={item.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}

      <h4 className="text-lg font-serif font-bold mb-2 text-gray-900 leading-snug">
        {item.title}
      </h4>
      <p className="text-gray-600 leading-relaxed text-[15px] whitespace-pre-line">
        {item.text.length > 400 ? item.text.slice(0, 400) + "…" : item.text}
      </p>

      {item.url && (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 mt-4 text-sm font-semibold hover:underline"
          style={{ color: "#b91c3c" }}
        >
          Смотреть публикацию
          <ArrowUpRight className="w-4 h-4" />
        </a>
      )}
    </motion.div>
  );
}

// Group by year
function groupByYear(items: FeedItem[]): [number, FeedItem[]][] {
  const map = new Map<number, FeedItem[]>();
  for (const item of items) {
    const y = getYear(item.date);
    if (!map.has(y)) map.set(y, []);
    map.get(y)!.push(item);
  }
  return Array.from(map.entries()).sort(([a], [b]) => b - a);
}

// Fallback: show live Telegram + VK links when feed is empty
function EmptyState() {
  return (
    <div className="text-center py-20">
      <Rss className="w-12 h-12 text-gray-300 mx-auto mb-4" />
      <p className="text-gray-500 mb-6 text-lg">Лента временно недоступна.</p>
      <p className="text-gray-400 mb-8">Следите за нашими обновлениями напрямую:</p>
      <div className="flex justify-center gap-4 flex-wrap">
        <a
          href="https://t.me/gooddarom"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: "#2AABEE" }}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161l-2.027 9.559c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.28 13.84l-2.94-.92c-.64-.203-.653-.64.136-.95l11.486-4.428c.532-.194.997.13.6 1.62z"/></svg>
          Telegram @gooddarom
        </a>
        <a
          href="https://vk.ru/fund.dobrodarom"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: "#0077FF" }}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.714-1.033-1.01-1.49-.707-1.49.315v1.566c0 .447-.143.591-1.33.591-1.973 0-4.162-1.19-5.693-3.416C5.235 11.861 4.688 9.696 4.688 9.38c0-.26.095-.503.379-.503h1.745c.282 0 .38.143.49.463.537 1.555 1.44 2.918 1.81 2.918.141 0 .205-.065.205-.42V9.38c-.033-.787-.461-.855-.461-1.134 0-.164.13-.33.344-.33h2.744c.232 0 .316.12.316.377v3.053c0 .232.103.313.168.313.141 0 .26-.08.518-.34 1.603-1.794 2.746-4.559 2.746-4.559.08-.167.26-.317.506-.317h1.745c.523 0 .636.269.506.636-.252.583-2.67 4.574-2.67 4.574-.141.236-.19.34 0 .604.143.19.603.586 1.112 1.128.69.74 1.218 1.363 1.36 1.794.158.428-.079.644-.535.644z"/></svg>
          ВКонтакте
        </a>
      </div>
    </div>
  );
}

export default function Events() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Fetch events feed — proxied from live site via Vite dev proxy
    fetch("/leyka/events_public.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: FeedItem[]) => {
        const sorted = [...data].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setItems(sorted);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const grouped = groupByYear(items);
  let cardIndex = 0;

  return (
    <div className="pt-28 pb-20 bg-background min-h-screen">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3 text-gray-900">
            Что у нас происходило
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            Хроника мероприятий и новостей фонда «Добро Даром» — из наших страниц{" "}
            <a
              href="https://vk.ru/fund.dobrodarom"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
              style={{ color: "#0077FF" }}
            >
              ВКонтакте
            </a>{" "}
            и{" "}
            <a
              href="https://t.me/gooddarom"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
              style={{ color: "#2AABEE" }}
            >
              Telegram
            </a>
            .
          </p>
        </motion.div>

        {/* States */}
        {loading && (
          <div className="flex items-center justify-center py-24 text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin mr-3" />
            <span>Загрузка новостей…</span>
          </div>
        )}

        {!loading && (error || items.length === 0) && <EmptyState />}

        {/* Feed grouped by year */}
        {!loading && !error && grouped.map(([year, yearItems]) => (
          <div key={year} className="mb-14">
            <h3 className="text-2xl font-serif font-bold mb-6 text-gray-900 flex items-center gap-3">
              {year}
              <span className="text-sm font-sans font-normal text-gray-400 bg-gray-100 rounded-full px-3 py-1">
                {yearItems.length} публикаций
              </span>
            </h3>
            <div className="flex flex-col gap-6">
              {yearItems.map((item) => (
                <EventCard
                  key={item.id ?? item.date + item.title}
                  item={item}
                  index={cardIndex++}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
