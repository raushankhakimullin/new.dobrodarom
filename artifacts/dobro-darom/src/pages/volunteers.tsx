import { FadeUp, StaggerContainer, StaggerItem } from "@/components/Animations";
import { HandHeart, Truck, BookCheck, Share2, ArrowRight } from "lucide-react";

export default function VolunteersPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: подключить бэкенд
    alert("Форма отправлена (визуальная заглушка)");
  };

  return (
    <>
      <section className="pt-32 pb-24 bg-primary text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <FadeUp>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Стать волонтёром</h1>
            <p className="text-xl md:text-2xl font-light text-white/90 leading-relaxed">
              Время и навыки — такой же ценный ресурс, как и деньги. Присоединяйтесь к команде неравнодушных.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <FadeUp>
            <h2 className="text-3xl font-serif font-bold mb-16 text-center">Как присоединиться</h2>
          </FadeUp>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 relative">
            <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-0.5 bg-secondary z-0"></div>
            
            {[
              { step: "1", title: "Заполните форму", desc: "Расскажите о себе и о том, чем бы вы хотели помочь фонду." },
              { step: "2", title: "Встреча-знакомство", desc: "Мы свяжемся с вами и пригласим на онлайн или офлайн встречу." },
              { step: "3", title: "Первое задание", desc: "Вы пройдете небольшой инструктаж и приступите к делу в паре с опытным волонтёром." }
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 0.1} className="relative z-10 text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 shadow-md border-4 border-white">
                  {item.step}
                </div>
                <h3 className="font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </FadeUp>
            ))}
          </div>

          <FadeUp>
            <h2 className="text-3xl font-serif font-bold mb-10 text-center">Форматы участия</h2>
          </FadeUp>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
            {[
              { icon: HandHeart, title: "Помощь на мероприятиях", desc: "Сопровождение семей, анимация для детей, регистрация гостей, помощь в организации праздников." },
              { icon: Truck, title: "Автоволонтёрство", desc: "Доставка продуктовых наборов подопечным (ЦентрЗаботы), перевозка вещей на склад." },
              { icon: BookCheck, title: "Про-боно (навыками)", desc: "Бесплатная помощь профессионалов: юристы, психологи, бухгалтеры, дизайнеры, IT-специалисты." },
              { icon: Share2, title: "Информационная помощь", desc: "Ведение соцсетей, фото и видеосъёмка, написание текстов, помощь с распространением информации." }
            ].map((format, i) => (
              <StaggerItem key={i} className="flex gap-6 p-8 border border-border rounded-3xl bg-secondary/30 hover:bg-white hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <format.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">{format.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{format.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-24 bg-secondary/50 border-t border-border">
        <div className="container mx-auto px-6 max-w-3xl">
          <FadeUp>
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-border">
              <h2 className="text-3xl font-serif font-bold mb-8 text-center">Анкета волонтёра</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">Имя Фамилия *</label>
                    <input required type="text" className="w-full p-4 rounded-xl border border-border bg-secondary/20 focus:bg-white focus:border-primary outline-none transition-colors" placeholder="Иван Иванов" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Телефон *</label>
                    <input required type="tel" className="w-full p-4 rounded-xl border border-border bg-secondary/20 focus:bg-white focus:border-primary outline-none transition-colors" placeholder="+7 (999) 000-00-00" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-2">Email *</label>
                  <input required type="email" className="w-full p-4 rounded-xl border border-border bg-secondary/20 focus:bg-white focus:border-primary outline-none transition-colors" placeholder="ivan@example.com" />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Чем вы хотите помогать?</label>
                  <select className="w-full p-4 rounded-xl border border-border bg-secondary/20 focus:bg-white focus:border-primary outline-none transition-colors appearance-none">
                    <option>Помощь на мероприятиях</option>
                    <option>Автоволонтёрство</option>
                    <option>Профессиональная помощь (pro-bono)</option>
                    <option>Фото/видео, соцсети</option>
                    <option>Готов(а) помогать всем понемногу</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Расскажите немного о себе</label>
                  <textarea rows={4} className="w-full p-4 rounded-xl border border-border bg-secondary/20 focus:bg-white focus:border-primary outline-none transition-colors resize-none" placeholder="Ваши навыки, сколько времени готовы уделять..."></textarea>
                </div>

                <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-transform active:scale-[0.98] mt-2">
                  Отправить заявку
                </button>
                <p className="text-center text-xs font-mono text-muted-foreground">// TODO: форма пока не подключена к бэкенду</p>
              </form>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
