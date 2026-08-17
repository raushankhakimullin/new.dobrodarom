import { Link } from "wouter";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/Animations";
import { HeartHandshake, Shield, Sparkles, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-24 bg-primary text-white text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <FadeUp>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">О фонде</h1>
            <p className="text-xl md:text-2xl font-light text-white/90 leading-relaxed">
              Мы верим, что каждая женщина, ребёнок и семья имеют право на безопасную жизнь и шанс изменить своё будущее.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <FadeUp>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Наши ценности</h2>
              <p className="text-muted-foreground text-lg">
                Всё, что мы делаем, опирается на глубокое уважение к человеческому достоинству и профессиональный подход к помощи.
              </p>
            </FadeUp>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Shield, title: "Безопасность прежде всего", desc: "Мы создаём пространства, где люди могут выдохнуть, перестать бояться и начать восстанавливаться." },
              { icon: Sparkles, title: "Развитие вместо зависимости", desc: "Мы не поощряем иждивенчество. Наша цель — дать инструменты и знания, чтобы человек смог стоять на своих ногах." },
              { icon: HeartHandshake, title: "Безусловное уважение", desc: "Мы не судим и не читаем мораль. Мы принимаем человека в его беде и помогаем найти выход." },
              { icon: Users, title: "Прозрачность и системность", desc: "Каждый пожертвованный рубль должен работать эффективно. Мы строим систему помощи, а не просто решаем разовые проблемы." },
            ].map((val, i) => (
              <StaggerItem key={i} className="flex gap-6 p-8 bg-secondary/50 rounded-3xl border border-border">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                    <val.icon className="w-7 h-7" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">{val.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{val.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-24 bg-secondary/30 border-y border-border">
        <div className="container mx-auto px-6 max-w-4xl">
          <FadeUp>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-12 text-center">История создания</h2>
          </FadeUp>
          
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-border">
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <FadeUp delay={0.1}>
                <h3 className="text-foreground font-serif font-bold text-2xl mb-4">С чего всё началось?</h3>
                <p>
                  [Текст будет предоставлен фондом. Пример: Идея создания фонда родилась из личного опыта помощи нескольким семьям. Мы поняли, что разовой поддержки недостаточно — нужна система, которая будет вытягивать людей из кризиса.]
                </p>
              </FadeUp>
              <FadeUp delay={0.2} className="mt-8">
                <h3 className="text-foreground font-serif font-bold text-2xl mb-4">Что было самым сложным?</h3>
                <p>
                  [Текст будет предоставлен фондом. Пример: Самым сложным было научиться говорить «нет», когда человек не готов работать над собой, и сфокусироваться на тех, кому нужна удочка, а не рыба.]
                </p>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <FadeUp>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-16 text-center">Путь фонда</h2>
          </FadeUp>

          <div className="relative border-l-2 border-primary/20 ml-4 md:ml-1/2 md:translate-x-[calc(50%-1px)]">
            {[
              { year: "2014", title: "Основание", desc: "Регистрация благотворительного фонда «Добро Даром» в Казани." },
              { year: "2016", title: "Открытие «ЦентрМама»", desc: "Запуск первого кризисного центра для матерей с младенцами." },
              { year: "2019", title: "Масштабирование", desc: "Более 100 подопечных семей на регулярном попечении." },
              { year: "2022", title: "ЭкоЦентр", desc: "Старт амбициозного проекта по строительству экологичных домов." },
              { year: "2024", title: "Новый этап", desc: "Запуск системной образовательной программы." },
            ].map((event, i) => (
              <FadeUp key={i} delay={i * 0.1} className={`relative mb-12 pl-8 md:pl-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-16 md:text-right md:-ml-[50%] md:border-r-0" : "md:pl-16"}`}>
                <div className={`absolute top-0 w-4 h-4 rounded-full bg-primary -left-[9px] md:-left-[8px] ${i % 2 === 0 ? "md:left-auto md:-right-[8px]" : ""}`} />
                <div className="text-primary font-bold text-xl mb-2">{event.year}</div>
                <h3 className="text-xl font-serif font-bold mb-2">{event.title}</h3>
                <p className="text-muted-foreground">{event.desc}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <FadeUp>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-16 text-center">Наша команда</h2>
          </FadeUp>
          
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { name: "Хакимуллин Раушан Рафикович", role: "Директор фонда" },
              { name: "Имя Фамилия", role: "Куратор программ" },
              { name: "Имя Фамилия", role: "Психолог" },
              { name: "Имя Фамилия", role: "Юрист" },
            ].map((member, i) => (
              <StaggerItem key={i} className="text-center group">
                <div className="aspect-square bg-white rounded-3xl mb-4 flex items-center justify-center text-4xl text-muted-foreground/30 font-serif border border-border shadow-sm group-hover:shadow-md transition-all group-hover:-translate-y-1">
                  {member.name.split(" ").map(n => n[0]).join("")}
                </div>
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-muted-foreground text-sm">{member.role}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <FadeUp>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-16 text-center">Как всё устроено</h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeUp delay={0.1} className="p-8 rounded-3xl bg-secondary/50">
              <h3 className="text-xl font-bold mb-4">Кому мы помогаем</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Помощь оказывается на основании заявления, проверки документов и собеседования с куратором и психологом. Мы берём под опеку тех, кто готов прилагать усилия для выхода из кризиса.
              </p>
            </FadeUp>
            <FadeUp delay={0.2} className="p-8 rounded-3xl bg-secondary/50">
              <h3 className="text-xl font-bold mb-4">Куда идут деньги</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                До 80% средств направляются напрямую на программы помощи (закупка, содержание центров, оплата профильных специалистов). Оставшаяся часть идёт на административные расходы и развитие фонда.
              </p>
            </FadeUp>
            <FadeUp delay={0.3} className="p-8 rounded-3xl bg-secondary/50">
              <h3 className="text-xl font-bold mb-4">Контроль</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Деятельность фонда регулярно проверяется аудиторами и Министерством юстиции. Мы публикуем открытые отчёты о всех поступлениях и тратах на сайте.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
