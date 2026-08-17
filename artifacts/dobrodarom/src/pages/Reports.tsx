import { motion } from "framer-motion";
import { Download, FileText, CheckCircle, Search } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Button } from "@/components/ui/button";
import { DonationsFeed } from "@/components/DonationsFeed";

const reports = [
  { year: "2023", name: "Годовой отчет фонда", size: "2.4 MB" },
  { year: "2022", name: "Годовой отчет фонда", size: "1.8 MB" },
  { year: "2021", name: "Годовой отчет фонда", size: "2.1 MB" },
  { year: "2020", name: "Годовой отчет фонда", size: "1.5 MB" },
];

const data = [
  { name: 'Программа "Центр МАМА"', value: 45, color: '#E30016' },
  { name: 'Продуктовая помощь', value: 25, color: '#f59e0b' },
  { name: 'Экоферма', value: 15, color: '#10b981' },
  { name: 'Образовательные программы', value: 10, color: '#8b5cf6' },
  { name: 'Административные расходы', value: 5, color: '#64748b' },
];

export default function Reports() {
  return (
    <div className="pt-24 pb-20 bg-background min-h-screen">
      
      {/* Header */}
      <div className="container mx-auto px-4 md:px-6 mb-16 text-center max-w-3xl">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Search className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
          Открытость и прозрачность
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Мы несем ответственность за каждое пожертвование. Доверие благотворителей — фундамент нашей работы. Здесь вы можете ознакомиться с тем, куда идут средства.
        </p>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        
        {/* Registration Info */}
        <div className="bg-white border border-border shadow-sm rounded-3xl p-8 md:p-12 mb-16 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Официальные реквизиты</h2>
            <p className="text-muted-foreground mb-6">Благотворительный фонд содействия развитию человека «Добро Даром»</p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 font-mono text-sm">
              <div>
                <span className="text-gray-400 block mb-1 font-sans">ИНН</span>
                <span className="font-medium text-lg">1655291234</span>
              </div>
              <div>
                <span className="text-gray-400 block mb-1 font-sans">КПП</span>
                <span className="font-medium text-lg">165501001</span>
              </div>
              <div>
                <span className="text-gray-400 block mb-1 font-sans">ОГРН</span>
                <span className="font-medium text-lg">1141600000000</span>
              </div>
              <div>
                <span className="text-gray-400 block mb-1 font-sans">Дата регистрации</span>
                <span className="font-medium text-lg">12.08.2014</span>
              </div>
            </div>
          </div>
          <div className="w-32 h-32 bg-primary/5 rounded-full flex flex-col items-center justify-center border-4 border-primary/10 shrink-0">
            <CheckCircle className="w-10 h-10 text-primary mb-2" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary text-center leading-tight">МинЮст<br/>РФ</span>
          </div>
        </div>

        {/* Chart Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24 max-w-6xl mx-auto">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-6">Структура расходов фонда</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Мы гордимся тем, что 95% всех пожертвований направляются напрямую на целевые программы помощи подопечным. Административные расходы сведены к минимуму благодаря волонтерам и партнерам Pro Bono.
            </p>
            <ul className="space-y-4">
              {data.map((item, idx) => (
                <li key={idx} className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="font-medium text-gray-700 flex-1">{item.name}</span>
                  <span className="font-bold text-gray-900">{item.value}%</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="h-[400px] w-full bg-white rounded-3xl border border-border shadow-sm p-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={100}
                  outerRadius={140}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Доля бюджета']}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donations feed */}
        <div className="bg-white border border-border shadow-sm rounded-3xl p-8 md:p-12 mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold mb-2">Лента пожертвований</h2>
          <p className="text-muted-foreground mb-6">
            Пожертвования, сделанные через сайт онлайн, — список обновляется автоматически.
          </p>
          <DonationsFeed />
        </div>

        {/* Downloads */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold mb-8 text-center">Архив годовых отчетов</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {reports.map((report) => (
              <div key={report.year} className="bg-white border border-border rounded-2xl p-6 flex items-center gap-4 hover:border-primary/50 transition-colors group cursor-pointer shadow-sm">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 group-hover:text-primary transition-colors">{report.name} {report.year}</h4>
                  <span className="text-sm text-gray-500">PDF • {report.size}</span>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full bg-gray-50 text-gray-500 group-hover:bg-primary group-hover:text-white transition-all">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
