import { FadeUp, StaggerContainer, StaggerItem } from "@/components/Animations";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FileText, Download } from "lucide-react";
import { useListDonations } from "@workspace/api-client-react";
import { STATIC_DONATIONS, formatDateRu, formatDateFromDate } from "@/lib/static-donations";

const pieData = [
  { name: 'Программная деятельность', value: 70, color: '#E30016' },
  { name: 'Административные расходы', value: 15, color: '#1B1918' },
  { name: 'Фандрайзинг и PR', value: 15, color: '#9C9E9F' },
];

const barData = [
  { year: '2019', amount: 4.2 },
  { year: '2020', amount: 5.8 },
  { year: '2021', amount: 8.4 },
  { year: '2022', amount: 12.1 },
  { year: '2023', amount: 18.5 },
];

const reportsArchive = [
  { year: "2023", size: "2.4 MB" },
  { year: "2022", size: "1.8 MB" },
  { year: "2021", size: "2.1 MB" },
  { year: "2020", size: "1.5 MB" },
  { year: "2019", size: "1.2 MB" },
];

/** Единый тип строки для ленты (и статика, и live-данные из БД) */
interface FeedRow {
  key: string;
  dateStr: string;
  amount: number;
  monthly: boolean;
}

function staticRows(): FeedRow[] {
  return STATIC_DONATIONS.map((d, i) => ({
    key: `static-${i}`,
    dateStr: formatDateRu(d.date),
    amount: d.amount,
    monthly: d.type === "monthly",
  }));
}

function liveRows(data: { id: number; amount: number; type: string; createdAt: Date | string }[]): FeedRow[] {
  return data.map((d) => {
    const date = d.createdAt instanceof Date ? d.createdAt : new Date(d.createdAt);
    return {
      key: `live-${d.id}`,
      dateStr: isNaN(date.getTime()) ? "" : formatDateFromDate(date),
      amount: d.amount,
      monthly: d.type === "monthly",
    };
  });
}

export default function ReportsPage() {
  const { data: donations } = useListDonations({ limit: 10 });
  const isLiveData = !!(donations && donations.length > 0);
  const feedRows: FeedRow[] = isLiveData ? liveRows(donations!) : staticRows();

  return (
    <>
      <section className="pt-32 pb-24 bg-primary text-white">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <FadeUp>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Мы открыты</h1>
            <p className="text-xl md:text-2xl font-light text-white/90 leading-relaxed">
              Доверие — основа благотворительности. Мы отчитываемся за каждый пожертвованный рубль.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="py-24 bg-white relative -mt-10 rounded-t-3xl border-t border-border z-10">
        <div className="container mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif font-bold mb-4">Предварительные итоги 2023 года</h2>
              <p className="text-muted-foreground text-sm uppercase tracking-wider font-semibold">* Данные уточняются фондом</p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24 max-w-6xl mx-auto">
            <StaggerItem className="bg-secondary/50 p-8 rounded-3xl border border-border text-center">
              <div className="text-4xl font-serif font-bold text-primary mb-2">18.5 млн ₽</div>
              <div className="text-muted-foreground font-medium">Собрано средств</div>
            </StaggerItem>
            <StaggerItem className="bg-secondary/50 p-8 rounded-3xl border border-border text-center">
              <div className="text-4xl font-serif font-bold text-primary mb-2">17.9 млн ₽</div>
              <div className="text-muted-foreground font-medium">Направлено на программы</div>
            </StaggerItem>
            <StaggerItem className="bg-secondary/50 p-8 rounded-3xl border border-border text-center">
              <div className="text-4xl font-serif font-bold text-primary mb-2">3 450</div>
              <div className="text-muted-foreground font-medium">Частных пожертвований</div>
            </StaggerItem>
            <StaggerItem className="bg-secondary/50 p-8 rounded-3xl border border-border text-center">
              <div className="text-4xl font-serif font-bold text-primary mb-2">12</div>
              <div className="text-muted-foreground font-medium">Корпоративных партнёров</div>
            </StaggerItem>
          </StaggerContainer>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            <FadeUp>
              <h3 className="text-2xl font-serif font-bold mb-8 text-center">Структура расходов (2023)</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => `${value}%`}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col gap-3 mt-6">
                {pieData.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <span className="font-bold text-sm">{item.value}%</span>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <h3 className="text-2xl font-serif font-bold mb-8 text-center">Динамика поступлений (млн ₽)</h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                    <XAxis 
                      dataKey="year" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9C9E9F', fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9C9E9F', fontSize: 12 }}
                    />
                    <Tooltip 
                      cursor={{ fill: '#f5f5f5' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      formatter={(value) => [`${value} млн ₽`, 'Сумма']}
                    />
                    <Bar 
                      dataKey="amount" 
                      fill="#E30016" 
                      radius={[6, 6, 0, 0]} 
                      barSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Donation feed */}
      <section className="py-24 bg-white border-t border-border">
        <div className="container mx-auto px-6 max-w-4xl">
          <FadeUp>
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-serif font-bold">Лента пожертвований</h2>
              {isLiveData && (
                <span className="inline-flex items-center gap-1.5 text-xs text-green-600 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Живые данные
                </span>
              )}
            </div>
          </FadeUp>

          <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
            {feedRows.map((row, i) => (
              <div
                key={row.key}
                className={`flex items-center gap-4 px-6 md:px-10 py-4 ${
                  i !== feedRows.length - 1 ? "border-b border-border" : ""
                }`}
              >
                {/* Date */}
                <div className="flex-1 min-w-0 text-sm text-muted-foreground">
                  {row.dateStr}
                </div>

                {/* Monthly badge */}
                {row.monthly && (
                  <span className="text-[10px] uppercase tracking-wide bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold leading-none whitespace-nowrap">
                    ↻ ежемесячное
                  </span>
                )}

                {/* Amount */}
                <div className="font-bold text-primary text-sm flex-shrink-0">
                  {row.amount.toLocaleString("ru-RU")} ₽
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary/30 border-t border-border">
        <div className="container mx-auto px-6 max-w-4xl">
          <FadeUp>
            <h2 className="text-3xl font-serif font-bold mb-12 text-center">Архив отчётов</h2>
          </FadeUp>

          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-border">
            <div className="flex flex-col">
              {reportsArchive.map((report, i) => (
                <div key={i} className={`flex items-center justify-between py-6 ${i !== reportsArchive.length - 1 ? 'border-b border-border' : ''}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-muted-foreground">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Годовой отчёт {report.year}</h4>
                      <p className="text-sm text-muted-foreground">PDF, {report.size}</p>
                    </div>
                  </div>
                  <button className="p-3 text-primary hover:bg-primary/5 rounded-full transition-colors flex items-center gap-2 group">
                    <span className="text-sm font-medium hidden sm:inline group-hover:underline">Скачать</span>
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-muted-foreground mt-8">
              * PDF файлы будут загружены фондом
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
