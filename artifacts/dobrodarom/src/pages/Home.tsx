import { Link } from "wouter";
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { Heart, Home as HomeIcon, Sprout, BookOpen, Utensils, ArrowRight, ShieldCheck, Users, Baby, HandHeart, CheckCircle2, Volume2, VolumeX, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";

// Animated counter: starts fast, then dramatically decelerates to a near-stop
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (!inView) return;
    // Phase 1: rush to ~75% of target in 0.25s
    const phase1 = animate(count, Math.round(target * 0.75), {
      duration: 0.25,
      ease: "easeIn",
      onComplete: () => {
        // Phase 2: creep from 75% → 100% over 0.75s, dramatically slowing
        animate(count, target, {
          duration: 0.75,
          ease: [0.02, 0.98, 0.01, 1], // extremely steep deceleration
        });
      },
    });
    return phase1.stop;
  }, [inView, target, count]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>{suffix}
    </span>
  );
}

import heroBg from "@/assets/hero.jpg";
import programFarm from "@/assets/program-farm.jpg";

const stats = [
  { value: "10+", label: "Лет работы" },
  { value: "150+", label: "Подопечных сейчас" },
  { value: "60+", label: "Семьям оказана помощь" },
  { value: "200+", label: "Продуктовых наборов в месяц" },
];

const beneficiaries = [
  { icon: Baby, title: "Мамы с детьми", desc: "Оказавшиеся в кризисной ситуации или пострадавшие от домашнего насилия.", photo: "/mama-bg.jpg" },
  { icon: Users, title: "Малоимущие семьи", desc: "Многодетные и семьи, находящиеся за чертой бедности.", photo: "/family-bg.jpg" },
  { icon: HandHeart, title: "Одинокие пенсионеры", desc: "Пожилые люди старше 65 лет и люди с инвалидностью.", photo: "/pensioner-bg.webp" },
  { icon: ShieldCheck, title: "Беременные женщины", desc: "Женщины без поддержки семьи и близких, нуждающиеся в помощи.", photo: "/pregnant-bg.webp" },
];

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">

        {/* ── Video background ── */}
        <video
          ref={videoRef}
          src="/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          poster={heroBg}
        />

        {/* ── Layered overlay for readability ── */}
        {/* Deep vignette + centre darkening so text always pops */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/65 via-black/45 to-black/75" />
        <div className="absolute inset-0 z-10"
          style={{ background: "radial-gradient(ellipse 70% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.45) 100%)" }} />

        {/* ── Hero content ── */}
        <div className="container mx-auto px-4 md:px-6 relative z-20 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-black/30 border border-white/20 text-white backdrop-blur-md mb-6 text-sm font-medium tracking-wide">
              Официальный благотворительный фонд в Казани
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
              Мы рядом —<br className="hidden md:block"/>
              <span className="text-primary drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">в самые важные моменты</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
              Поддерживаем семьи с теплом, уважением и реальной помощью. Потому что каждый человек заслуживает заботы и достойной жизни.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/help" className="w-full sm:w-auto text-lg px-8 py-4 rounded-full bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/30 inline-flex items-center justify-center font-medium transition-colors">
                Помочь фонду
                <Heart className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/programs" className="w-full sm:w-auto text-lg px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-sm inline-flex items-center justify-center font-medium transition-colors">
                Наши программы
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ── Video controls ── */}
        <motion.div
          className="absolute bottom-20 right-6 z-40 flex items-center gap-3"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* ── Play / Pause ── */}
          <div className="relative flex items-center justify-center">
            {/* Blinking ring — pulses while playing */}
            {playing && (
              <>
                <motion.span className="absolute inset-0 rounded-full border-2 border-white/70"
                  animate={{ scale: [1, 1.55], opacity: [0.7, 0] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: "easeOut" }}
                />
                <motion.span className="absolute inset-0 rounded-full border border-white/40"
                  animate={{ scale: [1, 1.9], opacity: [0.4, 0] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
                />
              </>
            )}
            <motion.button
              onClick={togglePlay}
              aria-label={playing ? "Пауза" : "Воспроизвести"}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.88 }}
              transition={{ type: "spring", stiffness: 380, damping: 18 }}
              className="relative flex items-center justify-center w-11 h-11 rounded-full text-white shadow-lg"
              style={{
                background: "rgba(255,255,255,0.20)",
                backdropFilter: "blur(14px)",
                border: "1.5px solid rgba(255,255,255,0.55)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.3)",
              }}
            >
              <AnimatePresence mode="wait">
                {playing
                  ? <motion.span key="pause" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.14 }}>
                      <Pause className="w-4 h-4" />
                    </motion.span>
                  : <motion.span key="play" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.14 }}>
                      <Play className="w-4 h-4 translate-x-0.5" />
                    </motion.span>
                }
              </AnimatePresence>
            </motion.button>
          </div>

          {/* ── Mute / Unmute ── */}
          <div className="relative">
            {/* Blinking glow when muted — draws attention */}
            {muted && (
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ background: "rgba(208,57,74,0.6)" }}
                animate={{ opacity: [0.6, 0.15, 0.6] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            <motion.button
              onClick={toggleMute}
              aria-label={muted ? "Включить звук" : "Выключить звук"}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 380, damping: 18 }}
              className="relative flex items-center justify-center gap-2 w-11 sm:w-auto px-0 sm:px-4 h-11 rounded-full text-white text-[13px] font-semibold overflow-hidden shadow-lg"
              style={{
                background: muted ? "rgba(208,57,74,0.85)" : "rgba(255,255,255,0.18)",
                backdropFilter: "blur(14px)",
                border: muted ? "1.5px solid rgba(255,100,100,0.6)" : "1.5px solid rgba(255,255,255,0.55)",
                boxShadow: muted
                  ? "0 4px 20px rgba(208,57,74,0.5), inset 0 1px 0 rgba(255,255,255,0.2)"
                  : "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
            >
              {/* Shimmer sweep */}
              <motion.span
                key={String(muted)}
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(100deg,transparent 30%,rgba(255,255,255,0.25) 50%,transparent 70%)" }}
                initial={{ x: "-120%" }} animate={{ x: "220%" }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              />
              <AnimatePresence mode="wait">
                {muted ? (
                  <motion.span key="off" className="relative flex items-center gap-2"
                    initial={{ opacity: 0, x: 5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -5 }}
                    transition={{ duration: 0.16 }}
                  >
                    {/* Blinking icon when muted */}
                    <motion.span
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.0, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <VolumeX className="w-4 h-4 shrink-0" />
                    </motion.span>
                    <span className="hidden sm:inline">Включить звук</span>
                  </motion.span>
                ) : (
                  <motion.span key="on" className="relative flex items-center gap-2"
                    initial={{ opacity: 0, x: 5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -5 }}
                    transition={{ duration: 0.16 }}
                  >
                    {/* Animated equaliser bars */}
                    <span className="flex items-end gap-[2.5px] h-4 shrink-0">
                      {[0.55, 1, 0.7, 0.9].map((h, i) => (
                        <motion.span key={i}
                          className="w-[3px] rounded-full bg-white inline-block"
                          style={{ height: `${h * 13}px` }}
                          animate={{ scaleY: [1, 0.3, 1] }}
                          transition={{ duration: 0.65, repeat: Infinity, delay: i * 0.11, ease: "easeInOut" }}
                        />
                      ))}
                    </span>
                    <span className="hidden sm:inline">Звук включён</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Stats — individual vibrant cards */}
      <div className="relative z-30 -mt-6 px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto">
          {stats.map((stat, idx) => {
            const num = parseInt(stat.value);
            const suffix = stat.value.replace(String(num), "");
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="relative flex flex-col items-center text-center py-6 px-4 rounded-2xl overflow-hidden cursor-default"
                style={{
                  background: "rgba(255,255,255,0.97)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",
                  border: "1px solid rgba(208,57,74,0.10)",
                }}
              >
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-primary" />

                {/* Subtle red glow in background */}
                <div className="absolute inset-0 opacity-[0.04]"
                  style={{ background: "radial-gradient(circle at 50% 0%, #D0394A 0%, transparent 70%)" }} />

                <span className="relative text-3xl md:text-5xl font-serif font-bold text-primary mb-1.5 leading-none">
                  <CountUp target={num} suffix={suffix} />
                </span>
                <span className="relative text-xs md:text-sm text-gray-500 leading-snug font-medium">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Who We Help */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-foreground">Кому мы помогаем?</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6"></div>
            <p className="text-muted-foreground text-lg">
              Мы оказываем поддержку самым уязвимым категориям граждан, тем, кто по разным причинам остался один на один с бедой.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {beneficiaries.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className={`relative rounded-2xl shadow-sm border border-border overflow-hidden group transition-shadow hover:shadow-lg
                  ${item.photo ? "min-h-[280px] flex flex-col justify-end" : "bg-white p-8"}`}
              >
                {item.photo ? (
                  <>
                    {/* Photo background */}
                    <img
                      src={item.photo}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Gradient overlay — bottom dark for text, top subtle */}
                    <div className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.08) 100%)" }}
                    />
                    {/* Icon badge top-left */}
                    <div className="absolute top-5 left-5 w-11 h-11 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg">
                      <item.icon className="w-5 h-5" />
                    </div>
                    {/* Text over photo */}
                    <div className="relative z-10 p-6 pt-0">
                      <h3 className="text-xl font-bold mb-2 text-white drop-shadow">{item.title}</h3>
                      <p className="text-white/80 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-14 h-14 bg-accent text-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <item.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-foreground">Комплексные программы</h2>
              <div className="w-20 h-1 bg-primary rounded-full mb-6"></div>
              <p className="text-muted-foreground text-lg">
                Пять направлений работы, которые создают замкнутый цикл реабилитации и поддержки.
              </p>
            </div>
            <Link href="/programs" className="inline-flex items-center justify-center h-10 px-6 py-2 rounded-full border border-border bg-white text-foreground hover:bg-gray-50 transition-colors font-medium text-sm">
              Все программы <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Program 1 */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border flex flex-col">
              <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                <img src="/mama-center-bg.jpg" alt="Центр МАМА" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary flex items-center gap-2">
                  <HomeIcon className="w-3 h-3" /> Флагман
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-serif font-bold mb-3">Центр МАМА</h3>
                <p className="text-muted-foreground mb-6 flex-1">
                  Безопасное жилье, психологическая и юридическая помощь мамам с новорожденными и жертвам домашнего насилия.
                </p>
                <Link href="/programs">
                  <span className="text-primary font-medium flex items-center gap-2 group-hover:gap-3 transition-all cursor-pointer">
                    Подробнее <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Program 2 */}
            <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border flex flex-col">
              <div className="h-64 overflow-hidden relative bg-gray-100 flex items-center justify-center">
                <img src={programFarm} alt="Экоферма" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10" />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-serif font-bold mb-3">Экоферма «Страна Малиния»</h3>
                <p className="text-muted-foreground mb-6 flex-1">
                  Обучение женщин профессиям на базе эко-фермы. Путь к финансовой независимости и стабильности.
                </p>
                <Link href="/programs">
                  <span className="text-primary font-medium flex items-center gap-2 group-hover:gap-3 transition-all cursor-pointer">
                    Подробнее <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Other 3 compact */}
            <div className="flex flex-col gap-4">
              <Link href="/programs">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-border hover:border-primary/50 transition-colors cursor-pointer group h-full">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 bg-accent text-primary rounded-lg flex items-center justify-center">
                      <Sprout className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold">ЭкоЦентрСемья</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Строительство экологичного жилья для подопечных. Новый старт.</p>
                </div>
              </Link>
              <Link href="/programs">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-border hover:border-primary/50 transition-colors cursor-pointer group h-full">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 bg-accent text-primary rounded-lg flex items-center justify-center">
                      <Utensils className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold">ЦентрЗаботы</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Выдача более 200 продуктовых наборов в месяц нуждающимся.</p>
                </div>
              </Link>
              <Link href="/programs">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-border hover:border-primary/50 transition-colors cursor-pointer group h-full">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 bg-accent text-primary rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold">ЦентрОбразования</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Образовательные программы для детей и родителей по 10+ направлениям.</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-foreground text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                Философия<br/>нашего фонда
              </h2>
              <p className="text-xl text-gray-300 mb-8 font-light italic border-l-4 border-primary pl-6">
                «Мы верим, что каждый человек способен изменить свою жизнь — если рядом есть те, кто искренне верит в него»
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                  <p className="text-gray-300">Мы не просто закрываем базовые потребности в еде и крыше над головой, мы помогаем человеку вернуть контроль над своей жизнью.</p>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                  <p className="text-gray-300">Работа с психологами, юристами, обучение новым профессиям — это фундамент, на котором строится независимое будущее.</p>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                  <p className="text-gray-300">Каждая спасенная семья — это вклад в здоровое общество и будущее наших детей.</p>
                </div>
              </div>
              <div className="mt-10">
                <Link href="/about" className="inline-flex items-center justify-center h-10 px-6 py-2 rounded-full bg-white text-foreground hover:bg-gray-100 transition-colors font-medium text-sm">
                  Подробнее о фонде
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-full border border-white/10 flex items-center justify-center p-8">
                <div className="w-full h-full rounded-full border border-white/20 flex items-center justify-center p-8">
                  <div className="w-full h-full rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center flex-col text-center p-10 shadow-2xl shadow-primary/20 border border-primary/30">
                    <span className="text-5xl font-serif font-bold text-white mb-2">2014</span>
                    <span className="text-sm uppercase tracking-widest text-primary-foreground/80">Год основания</span>
                    <div className="w-12 h-px bg-white/30 my-6"></div>
                    <span className="text-white text-lg italic">Надежность, проверенная временем</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Partners */}
      <section className="py-20 bg-white border-t border-border">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h3 className="text-xl font-medium text-muted-foreground mb-12">Официально зарегистрированная организация, нам доверяют:</h3>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Logo placeholders */}
            <div className="flex items-center gap-2 font-serif font-bold text-xl"><div className="w-8 h-8 bg-gray-300 rounded-sm"></div> Партнер 1</div>
            <div className="flex items-center gap-2 font-serif font-bold text-xl"><div className="w-8 h-8 bg-gray-300 rounded-full"></div> Партнер 2</div>
            <div className="flex items-center gap-2 font-serif font-bold text-xl"><div className="w-8 h-8 bg-gray-300 rotate-45"></div> Партнер 3</div>
            <div className="flex items-center gap-2 font-serif font-bold text-xl"><div className="w-8 h-8 border-2 border-gray-300 rounded-lg"></div> МинТруд РТ</div>
          </div>
        </div>
      </section>

    </div>
  );
}
