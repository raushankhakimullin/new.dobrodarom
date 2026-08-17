import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Logo } from "./Logo";
import { Menu, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/about", label: "О фонде" },
  { href: "/projects", label: "Проекты" },
  { href: "/news", label: "Новости" },
  { href: "/reports", label: "Отчёты" },
  { href: "/club", label: "Клуб" },
  { href: "/contacts", label: "Контакты" },
];

export function Header() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Only known pages with a full-bleed red hero get a transparent header at the top.
  // Unknown paths (404, etc.) and pages with light heroes stay opaque white.
  // Only pages whose hero section has bg-primary (full red bleed).
  // Pages with bg-white, bg-secondary, or bg-secondary/30 heroes use an opaque white header.
  const RED_HERO_PAGES = [
    "/", "/about", "/contacts",
    "/partners", "/reports", "/volunteers",
  ];
  const canBeTransparent = RED_HERO_PAGES.includes(location);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const transparent = canBeTransparent && !isScrolled;
  const headerBg = transparent ? "bg-transparent" : "bg-white shadow-sm";
  const logoVariant = transparent ? "dark" : "light";
  const linkColor = transparent ? "text-white hover:text-white/80" : "text-foreground hover:text-primary";

  // Close mobile menu on navigate
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/">
          <Logo variant={logoVariant} className="cursor-pointer" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${linkColor}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/donate"
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-medium text-sm hover:bg-primary/90 transition-colors shadow-sm hover:shadow active:scale-95"
          >
            Помочь
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden p-2 -mr-2 ${transparent ? "text-white" : "text-foreground"}`}
          onClick={() => setMobileMenuOpen(true)}
          data-testid="button-mobile-menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-white flex flex-col px-6 pt-6 pb-8"
          >
            <div className="flex justify-between items-center mb-8">
              <Logo variant="light" />
              <button
                className="p-2 -mr-2 text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6 text-xl font-serif">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-foreground hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
            
            <div className="mt-auto pt-8 flex flex-col gap-4">
              <Link
                href="/donate"
                className="bg-primary text-primary-foreground px-6 py-4 rounded-xl font-medium text-center hover:bg-primary/90 transition-colors"
              >
                Помочь фонду
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ─── Плавающая кнопка «Стань Хранителем добра» ─────────────────── */
export function FloatingCTA() {
  const [location] = useLocation();
  const [visible, setVisible] = useState(false);

  // Показываем после 300px прокрутки; скрываем на самой странице /donate
  useEffect(() => {
    if (location === "/donate") { setVisible(false); return; }
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [location]);

  if (location === "/donate") return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-40"
        >
          <Link
            href="/donate"
            className="flex items-center gap-2 bg-primary text-white px-5 py-3.5 rounded-full font-bold text-sm shadow-xl hover:bg-primary/90 hover:shadow-2xl active:scale-95 transition-all"
          >
            <Heart className="w-4 h-4 fill-white/40" />
            Стань Хранителем добра
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#1B1918] text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Logo variant="dark" className="mb-6" />
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Мы верим, что каждый человек заслуживает поддержку. Не даём рыбу, а учим рыбачить.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                Telegram
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                ВКонтакте
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-6">Фонд</h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">О нас</Link></li>
              <li><Link href="/reports" className="hover:text-white transition-colors">Отчёты</Link></li>
              <li><Link href="/news" className="hover:text-white transition-colors">Новости</Link></li>
              <li><Link href="/volunteers" className="hover:text-white transition-colors">Волонтёрам</Link></li>
              <li><Link href="/partners" className="hover:text-white transition-colors">Партнёрам</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-6">Программы</h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-400">
              <li><Link href="/projects" className="hover:text-white transition-colors">ЦентрМама</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">ЦентрЗаботы</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">ЭкоЦентр «Семья»</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">ЭкоФерма «Страна Малиния»</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">ЦентрОбразования</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-6">Контакты</h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-400">
              <li>г. Казань, ул. Жилякле, д. 61а</li>
              <li>8 (937) 009-09-60</li>
              <li>dobro-darom@mail.ru</li>
            </ul>
            
            <div className="mt-8">
              <h4 className="text-sm font-medium mb-3">Подписка на новости</h4>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Ваш email" 
                  className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-white/40 flex-1 min-w-0"
                />
                <button className="bg-primary hover:bg-primary/90 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors">
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Благотворительный фонд «Добро Даром»</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Политика конфиденциальности</Link>
            <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
