import { Link } from "wouter";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/Animations";
import { DonationTicker } from "@/components/DonationTicker";
import { Heart, Home, Leaf, Sprout, BookOpen, ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex items-center justify-center bg-primary overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10 z-0"></div>
        
        {/* Abstract pattern / noise overlay could go here */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0"></div>

        <div className="container relative z-10 mx-auto px-6 text-center text-white">
          <FadeUp>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 tracking-tight leading-[1.1] max-w-4xl mx-auto">
              Рядом с теми,<br />кому нужна поддержка
            </h1>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Помогаем женщинам с детьми, многодетным семьям и тем, кто оказался в сложной жизненной ситуации.
            </p>
          </FadeUp>
          <FadeUp delay={0.2} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/donate" 
              className="w-full sm:w-auto bg-white text-primary px-8 py-4 rounded-full font-medium text-lg hover:bg-white/90 transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              Стань Хранителем добра
            </Link>
            <Link 
              href="/reports" 
              className="w-full sm:w-auto border-2 border-white/50 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-white/10 transition-all active:scale-95 backdrop-blur-sm"
            >
              Смотреть отчёты
            </Link>
          </FadeUp>

          <FadeUp delay={0.4} className="mt-24 md:mt-32 pt-8 border-t border-white/20 flex flex-wrap justify-center gap-x-12 gap-y-6 text-sm md:text-base font-medium opacity-90">
            <span>10+ лет работы</span>
            <span>150+ подопечных</span>
            <span>200+ наборов в месяц</span>
          </FadeUp>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-secondary/50 relative">
        <div className="container mx-auto px-6">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            <StaggerItem>
              <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">10+</div>
              <div className="text-sm md:text-base text-muted-foreground font-medium">лет работы<br/>в Казани</div>
            </StaggerItem>
            <StaggerItem>
              <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">150+</div>
              <div className="text-sm md:text-base text-muted-foreground font-medium">подопечных<br/>на попечении</div>
            </StaggerItem>
            <StaggerItem>
              <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">60+</div>
              <div className="text-sm md:text-base text-muted-foreground font-medium">семей<br/>регулярно</div>
            </StaggerItem>
            <StaggerItem>
              <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">200+</div>
              <div className="text-sm md:text-base text-muted-foreground font-medium">наборов<br/>в месяц</div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Donation Ticker */}
      <DonationTicker />

      {/* Philosophy Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <FadeUp>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-16 text-center">Наша философия</h2>
          </FadeUp>
          <div className="max-w-4xl mx-auto">
            <FadeUp delay={0.1}>
              <p className="text-xl md:text-2xl text-center text-muted-foreground mb-16 leading-relaxed">
                Мы не просто даём рыбу, мы учим рыбачить. Наш подход основан на четырёх ступенях возвращения к самостоятельной жизни.
              </p>
            </FadeUp>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 relative">
              {/* Desktop connecting line */}
              <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-[2px] bg-secondary z-0"></div>
              
              {[
                { step: "01", title: "Безопасность", desc: "Убежище и защита в критической ситуации" },
                { step: "02", title: "Базовая поддержка", desc: "Продукты, одежда, предметы первой необходимости" },
                { step: "03", title: "Реабилитация", desc: "Психологическая и юридическая помощь" },
                { step: "04", title: "Развитие", desc: "Обучение, профессия, самостоятельность" },
              ].map((item, i) => (
                <FadeUp key={item.step} delay={0.1 + i * 0.1} className="relative z-10">
                  <div className="bg-white border-2 border-primary/10 rounded-2xl p-6 h-full text-center hover:border-primary/30 transition-colors shadow-sm hover:shadow-md">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
            
            <FadeUp delay={0.5} className="mt-16 text-center">
              <Link href="/about" className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors">
                Узнать больше о фонде <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <FadeUp>
              <h2 className="text-4xl md:text-5xl font-serif font-bold">Наши программы</h2>
              <p className="text-xl text-muted-foreground mt-4 max-w-2xl">
                Пять направлений помощи, которые охватывают путь от экстренного спасения до создания собственного будущего.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <Link href="/projects" className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full hover:bg-secondary transition-colors font-medium">
                Все проекты <ArrowRight className="w-4 h-4" />
              </Link>
            </FadeUp>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: "centrmama", icon: Home, title: "ЦентрМама", desc: "Убежище для матерей с новорождёнными и женщин в ситуации насилия.", progress: 65, goal: "800 000 ₽ / мес" },
              { id: "centrzaboty", icon: Heart, title: "ЦентрЗаботы", desc: "Регулярная продуктовая и вещевая помощь нуждающимся семьям.", progress: 85, goal: "450 000 ₽ / мес" },
              { id: "ekocentr", icon: Leaf, title: "ЭкоЦентр «Семья»", desc: "Экологичные дома для самостоятельной жизни подопечных.", progress: 30, goal: "5 000 000 ₽" },
              { id: "ekoferma", icon: Sprout, title: "ЭкоФерма", desc: "Обучение профессиям и финансовая независимость на собственной ферме.", progress: 45, goal: "2 000 000 ₽" },
              { id: "obrazovanie", icon: BookOpen, title: "ЦентрОбразования", desc: "Развивающие и образовательные программы для детей и взрослых.", progress: 70, goal: "300 000 ₽ / мес" },
            ].map((prog) => (
              <StaggerItem key={prog.id} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-border/50 group flex flex-col h-full">
                <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/10 transition-all">
                  <prog.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-3">{prog.title}</h3>
                <p className="text-muted-foreground mb-8 flex-1 leading-relaxed">
                  {prog.desc}
                </p>
                
                <div className="mb-6">
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span className="text-muted-foreground">Собрано</span>
                    <span className="text-foreground">Цель: {prog.goal}</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${prog.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
                
                <Link 
                  href={`/donate?project=${prog.id}`}
                  className="w-full block text-center py-3.5 rounded-xl border border-primary text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Поддержать
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Subscription CTA */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <FadeUp>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Регулярная поддержка важнее разовой</h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="text-xl text-white/80 mb-12 leading-relaxed">
                Подписка на пожертвование — это уверенность фонда в завтрашнем дне. Даже 500 рублей каждый месяц позволяют нам планировать помощь и не отказывать тем, кому она жизненно необходима.
              </p>
            </FadeUp>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-left">
              <FadeUp delay={0.2} className="flex gap-4">
                <CheckCircle2 className="w-8 h-8 flex-shrink-0 text-white/90" />
                <div>
                  <h4 className="font-bold text-lg mb-2">Стабильность</h4>
                  <p className="text-white/70 text-sm">Фонд может уверенно планировать долгосрочные программы помощи.</p>
                </div>
              </FadeUp>
              <FadeUp delay={0.3} className="flex gap-4">
                <CheckCircle2 className="w-8 h-8 flex-shrink-0 text-white/90" />
                <div>
                  <h4 className="font-bold text-lg mb-2">Удобство</h4>
                  <p className="text-white/70 text-sm">Средства списываются автоматически, вы помогаете без лишних усилий.</p>
                </div>
              </FadeUp>
              <FadeUp delay={0.4} className="flex gap-4">
                <CheckCircle2 className="w-8 h-8 flex-shrink-0 text-white/90" />
                <div>
                  <h4 className="font-bold text-lg mb-2">Свобода</h4>
                  <p className="text-white/70 text-sm">Подписку можно изменить или отменить в любой момент в личном кабинете банка.</p>
                </div>
              </FadeUp>
            </div>
            
            <FadeUp delay={0.5}>
              <Link 
                href="/donate" 
                className="inline-block bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-white/90 transition-transform hover:scale-105 shadow-xl"
              >
                Стань Хранителем добра
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <FadeUp>
            <h2 className="text-4xl font-serif font-bold mb-16">Нам доверяют</h2>
          </FadeUp>
          
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <StaggerItem key={i} className="aspect-[3/1] bg-secondary rounded-lg flex items-center justify-center border border-border">
                <span className="text-muted-foreground font-medium text-sm">Логотип партнёра</span>
              </StaggerItem>
            ))}
          </StaggerContainer>
          
          <p className="mt-8 text-sm text-muted-foreground">Здесь будут логотипы партнёров и СМИ</p>
        </div>
      </section>
    </>
  );
}
