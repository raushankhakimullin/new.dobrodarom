import { Link } from "wouter";
import { Heart, MapPin, Phone, Mail, ArrowRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand & Mission */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-serif font-bold text-xl tracking-tighter">ДД</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg leading-tight tracking-wide text-white">Добро Даром</span>
                <span className="text-xs text-gray-400">Благотворительный фонд</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Мы не даём рыбу — мы учим рыбачить и даём удочку. Комплексная реабилитация и помощь тем, кто оказался в трудной жизненной ситуации.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://t.me/gooddarom" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6 text-white">О фонде</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/about">
                  <span className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 text-sm cursor-pointer">
                    <ArrowRight className="w-3 h-3 text-primary" /> История фонда
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/programs">
                  <span className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 text-sm cursor-pointer">
                    <ArrowRight className="w-3 h-3 text-primary" /> Наши программы
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/reports">
                  <span className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 text-sm cursor-pointer">
                    <ArrowRight className="w-3 h-3 text-primary" /> Отчетность
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 text-sm cursor-pointer">
                    <ArrowRight className="w-3 h-3 text-primary" /> Контакты
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6 text-white">Контакты</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>г. Казань,<br/>ул. Жилякле, д. 61а</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+78000000000" className="hover:text-white transition-colors">+7 (800) 000-00-00</a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:info@dobrodarom.ru" className="hover:text-white transition-colors">info@dobrodarom.ru</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Donate CTA */}
          <div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 flex flex-col items-start gap-4">
              <Heart className="w-8 h-8 text-primary" />
              <h4 className="font-serif font-bold text-lg text-white">Нужна ваша поддержка</h4>
              <p className="text-gray-400 text-sm">Каждое пожертвование помогает нам спасать жизни и дарить надежду семьям в беде.</p>
              <Link href="/help" className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-3 text-sm font-medium transition-colors mt-2 inline-flex items-center justify-center">
                Поддержать фонд
              </Link>
            </div>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © {currentYear} Благотворительный фонд «Добро Даром». Все права защищены.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white transition-colors">Пользовательское соглашение</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
