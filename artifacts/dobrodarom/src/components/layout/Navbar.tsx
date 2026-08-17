import { Link, useLocation } from "wouter";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { LogoMark } from "./Logo";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/about", label: "О фонде" },
  { href: "/programs", label: "Программы" },
  { href: "/help", label: "Как помочь" },
  { href: "/reports", label: "Отчётность" },
  { href: "/events", label: "Что у нас происходило", highlight: true },
  { href: "/contact", label: "Контакты" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHome = location === "/";
  const isLight = isScrolled || !isHome; // white bg state

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isLight
          ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-[72px]">

          {/* ── Logo ── */}
          <Link href="/">
            <div className="flex items-center gap-2.5 cursor-pointer group shrink-0 select-none">
              {/* Real circular emblem — switches between white-on-red and red-on-white */}
              <div className="transition-transform duration-300 group-hover:scale-105">
                <LogoMark
                  variant={isLight ? "red-on-white" : "white-on-red"}
                  size={42}
                />
              </div>

              {/* Wordmark */}
              <div className="flex flex-col leading-none gap-[3px]">
                {/* Main brand name — letters animate in on mount */}
                <motion.span
                  className={cn(
                    "font-serif font-bold whitespace-nowrap transition-colors duration-300 relative",
                    "text-[18px] md:text-[19px] tracking-[0.01em]",
                    isLight ? "text-gray-900" : "text-white"
                  )}
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.045 } },
                  }}
                >
                  {/* Gradient shimmer highlight */}
                  <motion.span
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.2, delay: 0.7, ease: "easeInOut" }}
                    style={{
                      background: isLight
                        ? "linear-gradient(90deg, transparent 0%, #D0394A 40%, transparent 70%)"
                        : "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 40%, transparent 70%)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Добро Даром
                  </motion.span>

                  {/* Actual letter-by-letter reveal */}
                  {"Добро Даром".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      variants={{
                        hidden: { opacity: 0, y: 6 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.35, ease: "easeOut" },
                        },
                      }}
                      className="inline-block"
                      style={{ whiteSpace: char === " " ? "pre" : undefined }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </motion.span>

                {/* Subtitle — slides up with a slight delay */}
                <motion.span
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.65, ease: "easeOut" }}
                  className={cn(
                    "text-[9.5px] tracking-[0.18em] uppercase whitespace-nowrap transition-colors duration-300 font-medium",
                    isLight ? "text-primary/80" : "text-white/60"
                  )}
                >
                  Благотворительный&nbsp;фонд
                </motion.span>
              </div>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <div className="hidden lg:flex items-center gap-7 xl:gap-8">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location === link.href;
                return (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <span
                        className={cn(
                          "relative px-3 py-1.5 rounded-md text-[13.5px] font-medium whitespace-nowrap transition-colors duration-200",
                          isActive
                            ? "text-primary"
                            : link.highlight && isLight
                            ? "text-primary/80 hover:text-primary hover:bg-primary/5 font-semibold"
                            : link.highlight && !isLight
                            ? "text-primary-foreground/90 hover:text-white font-semibold"
                            : isLight
                            ? "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                            : "text-white/85 hover:text-white hover:bg-white/10"
                        )}
                      >
                        {link.label}
                        {isActive && (
                          <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full" />
                        )}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Link
              href="/help"
              className={cn(
                "shrink-0 inline-flex items-center justify-center rounded-full px-5 py-2 text-[13.5px] font-semibold whitespace-nowrap transition-all duration-200",
                "bg-primary text-white hover:bg-primary/90 shadow-sm hover:shadow-md hover:-translate-y-px"
              )}
            >
              Помочь сейчас
            </Link>
          </div>

          {/* ── Mobile toggle ── */}
          <button
            className={cn(
              "lg:hidden p-2 -mr-1 rounded-md transition-colors",
              isLight ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Открыть меню"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="lg:hidden bg-white border-b border-gray-100 shadow-lg overflow-hidden"
          >
            <div className="container mx-auto px-4 py-5 flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = location === link.href;
                return (
                  <Link key={link.href} href={link.href}>
                    <span
                      className={cn(
                        "block px-3 py-2.5 rounded-lg text-base font-medium transition-colors",
                        isActive
                          ? "text-primary bg-primary/5 font-semibold"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      )}
                    >
                      {link.label}
                    </span>
                  </Link>
                );
              })}

              <Link
                href="/help"
                className="mt-3 w-full bg-primary hover:bg-primary/90 text-white rounded-full py-3 text-base font-semibold inline-flex items-center justify-center transition-colors shadow-sm"
              >
                Помочь сейчас
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
