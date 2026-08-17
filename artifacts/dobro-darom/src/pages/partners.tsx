import { FadeUp, StaggerContainer, StaggerItem } from "@/components/Animations";
import { Building2, Box, Users, Megaphone } from "lucide-react";

export default function PartnersPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Форма отправлена (визуальная заглушка)");
  };

  return (
    <>
      <section className="pt-32 pb-24 bg-primary text-white text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <FadeUp>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Бизнесу и компаниям</h1>
            <p className="text-xl font-light text-white/90 leading-relaxed max-w-2xl mx-auto">
              Развивайте корпоративную социальную ответственность вместе с надёжным партнёром.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <FadeUp>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Почему с нами стоит работать?</h2>
              <div className="flex flex-col gap-6">
                <div>
                  <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div> Абсолютная прозрачность
                  </h4>
                  <p className="text-muted-foreground">Предоставляем подробные финансовые и содержательные отчёты по каждому поддержанному проекту. Мы проходим независимый аудит.</p>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div> PR и лояльность
                  </h4>
                  <p className="text-muted-foreground">Позитивное освещение вашей поддержки в наших соцсетях, СМИ-партнёрах и на сайте. Укрепление HR-бренда внутри вашей компании.</p>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div> Налоговые льготы
                  </h4>
                  <p className="text-muted-foreground">Пожертвования в благотворительные фонды позволяют юридическим лицам уменьшить налогооблагаемую базу.</p>
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={0.2} className="bg-secondary p-12 rounded-3xl text-center">
              <div className="text-6xl font-serif font-bold text-primary mb-4">12</div>
              <p className="text-xl font-bold mb-2">Компаний-партнёров</p>
              <p className="text-muted-foreground">уже доверяют фонду «Добро Даром» свои социальные инвестиции.</p>
            </FadeUp>
          </div>

          <FadeUp>
            <h2 className="text-3xl font-serif font-bold mb-12 text-center">Форматы участия</h2>
          </FadeUp>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
            {[
              { icon: Building2, title: "Финансовое спонсорство", desc: "Разовые или регулярные пожертвования от компании на уставную деятельность или конкретную программу (например, строительство ЭкоЦентра)." },
              { icon: Box, title: "Натуральная помощь (in-kind)", desc: "Передача фонду вашей продукции (продукты питания, стройматериалы, канцелярия) или оказание бесплатных услуг для нужд фонда." },
              { icon: Users, title: "Корпоративное волонтёрство", desc: "Вовлечение сотрудников вашей компании в помощь фонду. Мы можем организовать совместный субботник на ЭкоФерме или сбор подарков к Новому году." },
              { icon: Megaphone, title: "Информационная поддержка", desc: "Размещение информации о фонде на ваших ресурсах, совместные маркетинговые акции, отчисления процента с продаж определённых товаров." }
            ].map((format, i) => (
              <StaggerItem key={i} className="flex gap-6 p-8 border border-border rounded-3xl hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <format.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-3">{format.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{format.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-24 bg-secondary/30 border-t border-border" id="contact-form">
        <div className="container mx-auto px-6 max-w-3xl">
          <FadeUp>
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-border">
              <h2 className="text-3xl font-serif font-bold mb-4 text-center">Связаться для сотрудничества</h2>
              <p className="text-muted-foreground text-center mb-8">Оставьте контакты, и наш менеджер по работе с партнёрами свяжется с вами для обсуждения вариантов.</p>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Название компании *</label>
                  <input required type="text" className="w-full p-4 rounded-xl border border-border bg-secondary/20 focus:bg-white focus:border-primary outline-none transition-colors" placeholder="ООО «Ромашка»" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">Контактное лицо *</label>
                    <input required type="text" className="w-full p-4 rounded-xl border border-border bg-secondary/20 focus:bg-white focus:border-primary outline-none transition-colors" placeholder="Имя Фамилия" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Телефон *</label>
                    <input required type="tel" className="w-full p-4 rounded-xl border border-border bg-secondary/20 focus:bg-white focus:border-primary outline-none transition-colors" placeholder="+7 (999) 000-00-00" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Email *</label>
                  <input required type="email" className="w-full p-4 rounded-xl border border-border bg-secondary/20 focus:bg-white focus:border-primary outline-none transition-colors" placeholder="mail@company.ru" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Интересующий формат</label>
                  <select className="w-full p-4 rounded-xl border border-border bg-secondary/20 focus:bg-white focus:border-primary outline-none transition-colors appearance-none">
                    <option>Финансовая поддержка</option>
                    <option>Корпоративное волонтёрство</option>
                    <option>Предоставление товаров/услуг</option>
                    <option>Совместная акция</option>
                    <option>Другое / Пока не знаю, хочу обсудить</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-transform active:scale-[0.98] mt-2">
                  Оставить заявку
                </button>
                <p className="text-center text-xs font-mono text-muted-foreground">// TODO: подключить бэкенд</p>
              </form>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
