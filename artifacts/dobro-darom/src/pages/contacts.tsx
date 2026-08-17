import { useState } from "react";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/Animations";
import { MapPin, Phone, Mail, Send, Copy, Check } from "lucide-react";

const REQUISITES = [
  { label: "Наименование", value: 'БЛАГОТВОРИТЕЛЬНЫЙ ФОНД "ДОБРО ДАРОМ РЕСПУБЛИКИ ТАТАРСТАН"' },
  { label: "Юридический адрес", value: "Республика Татарстан, г. Казань" },
  { label: "ИНН", value: "1657115881" },
  { label: "КПП", value: "168401001" },
  { label: "БИК", value: "044525411" },
  { label: "Банк", value: 'Филиал "Центральный" Банка ВТБ (ПАО)' },
  { label: "Кор. счёт", value: "30101810145250000411" },
  { label: "Расч. счёт", value: "40703810616837000015" },
  { label: "Телефон", value: "+7 (937) 009-09-60" },
  { label: "Директор", value: "Хакимуллин Раушан Рафикович" },
];

const REQUISITES_TEXT = REQUISITES.map(r => `${r.label}: ${r.value}`).join("\n");

export default function ContactsPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(REQUISITES_TEXT).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Форма отправлена (визуальная заглушка)");
  };

  return (
    <>
      <section className="pt-32 pb-16 bg-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <FadeUp>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Контакты</h1>
            <p className="text-lg text-white/80">Мы всегда на связи и открыты к диалогу.</p>
          </FadeUp>
        </div>
      </section>

      <section className="py-24 bg-white relative -mt-6 rounded-t-3xl border-t border-border z-10">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Info */}
            <div>
              <FadeUp>
                <h2 className="text-3xl font-serif font-bold mb-8">Связаться с нами</h2>
                
                <StaggerContainer className="flex flex-col gap-6 mb-12">
                  <StaggerItem className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Адрес</h4>
                      <p className="text-muted-foreground">г. Казань, ул. Жилякле, д. 61а</p>
                      <p className="text-sm text-muted-foreground mt-1">Режим работы: Пн-Пт, 10:00 - 18:00 (по предварительному звонку)</p>
                    </div>
                  </StaggerItem>
                  
                  <StaggerItem className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Телефон</h4>
                      <a href="tel:+79370090960" className="text-muted-foreground hover:text-primary transition-colors text-lg">
                        8 (937) 009-09-60
                      </a>
                    </div>
                  </StaggerItem>
                  
                  <StaggerItem className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Email</h4>
                      <a href="mailto:dobro-darom@mail.ru" className="text-muted-foreground hover:text-primary transition-colors text-lg">
                        dobro-darom@mail.ru
                      </a>
                    </div>
                  </StaggerItem>
                </StaggerContainer>
                
                <div className="flex gap-4">
                  <a href="#" className="flex-1 bg-[#0088cc] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                    <Send className="w-5 h-5" /> Telegram
                  </a>
                  <a href="#" className="flex-1 bg-[#0077FF] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                    ВКонтакте
                  </a>
                </div>
              </FadeUp>
            </div>

            {/* Form */}
            <div>
              <FadeUp delay={0.2} className="bg-secondary/30 p-8 md:p-10 rounded-3xl border border-border">
                <h3 className="font-bold text-2xl mb-6">Написать нам</h3>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <label className="block text-sm font-bold mb-2">Имя</label>
                    <input required type="text" className="w-full p-4 rounded-xl border border-border bg-white focus:border-primary outline-none transition-colors" placeholder="Как к вам обращаться?" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold mb-2">Email или телефон</label>
                    <input required type="text" className="w-full p-4 rounded-xl border border-border bg-white focus:border-primary outline-none transition-colors" placeholder="Для обратной связи" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold mb-2">Тема обращения</label>
                    <select className="w-full p-4 rounded-xl border border-border bg-white focus:border-primary outline-none transition-colors appearance-none">
                      <option>Хочу помочь как донор</option>
                      <option>Хочу стать волонтёром</option>
                      <option>Предложение о партнёрстве</option>
                      <option>Мне нужна помощь</option>
                      <option>Другой вопрос</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold mb-2">Сообщение</label>
                    <textarea required rows={4} className="w-full p-4 rounded-xl border border-border bg-white focus:border-primary outline-none transition-colors resize-none" placeholder="Текст вашего сообщения..."></textarea>
                  </div>
                  
                  <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-transform active:scale-[0.98] mt-2">
                    Отправить
                  </button>
                  <p className="text-center text-xs font-mono text-muted-foreground">// TODO: подключить бэкенд</p>
                </form>
              </FadeUp>
            </div>

          </div>
        </div>
      </section>

      {/* Legal Info */}
      <section className="py-16 bg-secondary/30 border-t border-border">
        <div className="container mx-auto px-6 max-w-3xl">
          <FadeUp>
            <div className="bg-white rounded-3xl border border-border shadow-sm p-8 md:p-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-serif font-bold">Юридическая информация</h2>
                <button
                  onClick={handleCopy}
                  data-testid="button-copy-legal"
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-border bg-white hover:border-primary hover:text-primary transition-colors flex-shrink-0"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Скопировано" : "Скопировать реквизиты"}
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
                {REQUISITES.map((r) => (
                  <div key={r.label} className="flex flex-col gap-0.5">
                    <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">{r.label}</span>
                    <span className="font-mono text-sm text-foreground leading-snug break-all">{r.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[400px] w-full bg-secondary border-t border-border flex items-center justify-center relative">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C9E9F' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-md border border-border text-center z-10">
          <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
          <h4 className="font-bold mb-1">Наш офис</h4>
          <p className="text-sm text-muted-foreground mb-4">г. Казань, ул. Жилякле, д. 61а</p>
          <p className="text-xs font-mono text-muted-foreground">* Интерактивная карта подключается отдельно</p>
        </div>
      </section>
    </>
  );
}
