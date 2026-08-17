import { FadeUp, StaggerContainer, StaggerItem } from "@/components/Animations";
import { Send, Users } from "lucide-react";

/* ─── Данные из добродаром.рф/events (хроника ТГ и ВК) ─── */
const events = [
  {
    id: 1,
    date: "13 августа 2026",
    source: "Telegram",
    title: "День дружбы в ЭкоЦентре Семья",
    excerpt:
      "Первое большое мероприятие в ЭкоЦентре: спортивные эстафеты, знакомства (более 40 человек из соседних деревень), сладкая вата, конкурсы и пенная дискотека.",
    href: "https://t.me/gooddarom",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    date: "11 августа 2026",
    source: "ВКонтакте и Telegram",
    title: "Почему важно делать добро?",
    excerpt:
      "Каждый акт доброты меняет чью-то жизнь: возвращает веру, даёт время на передышку, показывает детям пример — и исцеляет самого дающего.",
    href: "https://t.me/gooddarom",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    date: "9 августа 2026",
    source: "Telegram",
    title: "Тест на треугольник Карпмана",
    excerpt:
      "Приглашаем пройти тестирование и разобраться, есть ли вы в треугольнике Карпмана — и как выйти из замкнутого круга.",
    href: "https://t.me/gooddarom",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    date: "5 августа 2026",
    source: "Telegram",
    title: "Треугольник Карпмана: какая моя роль?",
    excerpt:
      "Разбираем психологическую модель треугольника Карпмана (жертва — преследователь — спасатель) и предлагаем пройти тест, чтобы найти свою роль.",
    href: "https://t.me/gooddarom",
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    date: "29 июля 2026",
    source: "Telegram",
    title: "Новости ЭкоЦентра «Семья»",
    excerpt:
      "Семейные выезды и ретриты, групповые программы для семей из групп риска, детские мастер-классы и отдельные проекты для женщин — что уже работает и что в планах.",
    href: "https://t.me/gooddarom",
    image: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    date: "27 июля 2026",
    source: "Telegram",
    title: "12 лет фонда — что стоит за словом «добро»",
    excerpt:
      "Рассказываем, сколько стоит ежедневная работа фонда: ЦентрМама, продуктовые наборы для ЦентрЗаботы, ЭкоЦентр Семья и экоферма «Страна Малиния».",
    href: "https://t.me/gooddarom",
    image: "https://images.unsplash.com/photo-1593113616828-6f22bca04804?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 7,
    date: "26 июля 2026",
    source: "Telegram",
    title: "Как восстановиться после газлайтинга",
    excerpt:
      "Практические шаги для выхода из токсичных отношений: осознанность, психологические границы, поддержка близких и забота о теле.",
    href: "https://t.me/gooddarom",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 8,
    date: "21 июля 2026",
    source: "Telegram",
    title: "Признаки газлайтинга",
    excerpt:
      "Разбираем поведенческие маркеры газлайтинга: стирание памяти, обесценивание эмоций, внушение неполноценности и подрыв доверия в обществе.",
    href: "https://t.me/gooddarom",
    image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 9,
    date: "20 июля 2026",
    source: "Telegram",
    title: "Феномен газлайтинга",
    excerpt:
      "Психолог фонда рассказывает о газлайтинге — тонкой, но разрушительной форме психологического насилия, и почему важно распознавать её в отношениях.",
    href: "https://t.me/gooddarom",
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=800",
  },
];

function SourceBadge({ source }: { source: string }) {
  const isBoth   = source.includes("и");
  const isTg     = source.includes("Telegram");
  const isVk     = source.includes("ВКонтакте");

  if (isBoth) {
    return (
      <div className="flex items-center gap-1.5">
        <span className="bg-[#2AABEE]/15 text-[#2AABEE] px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
          <Send className="w-2.5 h-2.5" /> TG
        </span>
        <span className="bg-[#0077FF]/15 text-[#0077FF] px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
          <Users className="w-2.5 h-2.5" /> ВК
        </span>
      </div>
    );
  }
  if (isTg) return (
    <span className="bg-[#2AABEE]/15 text-[#2AABEE] px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
      <Send className="w-2.5 h-2.5" /> Telegram
    </span>
  );
  if (isVk) return (
    <span className="bg-[#0077FF]/15 text-[#0077FF] px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
      <Users className="w-2.5 h-2.5" /> ВКонтакте
    </span>
  );
  return null;
}

export default function NewsPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-secondary/30 border-b border-border">
        <div className="container mx-auto px-6 text-center">
          <FadeUp>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Новости фонда</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Хроника мероприятий и новостей фонда «Добро Даром» — из наших страниц ВКонтакте и Telegram.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Год-разделитель */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <FadeUp className="flex items-center gap-4 mb-12">
            <span className="text-4xl font-serif font-bold text-foreground/20">2026</span>
            <div className="flex-1 h-px bg-border" />
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((item) => (
              <StaggerItem key={item.id}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col h-full"
                >
                  {/* Image */}
                  <div className="rounded-3xl overflow-hidden aspect-[4/3] mb-5 relative">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Date badge */}
                    <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm text-foreground px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full">
                      {item.date}
                    </div>
                  </div>

                  {/* Source */}
                  <div className="mb-3">
                    <SourceBadge source={item.source} />
                  </div>

                  {/* Text */}
                  <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed flex-1">
                    {item.excerpt}
                  </p>
                  <span className="mt-4 text-xs font-bold text-primary group-hover:underline">
                    Смотреть публикацию →
                  </span>
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Social Media Block */}
      <section className="py-24 bg-primary text-white text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <FadeUp>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Мы в соцсетях</h2>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              Больше живых фотографий, оперативных отчётов с мероприятий и срочных сборов — в наших каналах.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://t.me/gooddarom"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-white/90 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" /> Telegram @gooddarom
              </a>
              <a
                href="https://vk.com/dobrodarom"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white/50 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <Users className="w-5 h-5" /> Группа ВКонтакте
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
