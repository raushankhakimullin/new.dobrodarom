import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Home, Heart, Sprout, BookOpen, Utensils, PhoneCall, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const programs = [
  {
    id: "mama",
    title: "Центр МАМА",
    subtitle: "Флагманский проект помощи мамам",
    image: null,
    bgPhoto: "/mama-center-bg.jpg",
    icon: Home,
    color: "bg-primary",
    textColor: "text-primary",
    lightBg: "bg-primary/5",
    desc: "Безопасное жилье, психологическая и юридическая помощь мамам с новорожденными на грани отказа от ребенка, а также женщинам, бегущим от домашнего насилия.",
    features: [
      "Проживание (безопасное убежище, питание, предметы первой необходимости)",
      "Реабилитация (социальная адаптация, восстановление документов)",
      "Специалисты (ежедневная работа психологов, юристов, педагогов)"
    ]
  },
  {
    id: "eco-farm",
    title: "Экоферма «Страна Малиния»",
    subtitle: "Путь к финансовой независимости",
    image: null,
    icon: Sprout,
    color: "bg-emerald-600",
    textColor: "text-emerald-700",
    lightBg: "bg-emerald-50",
    desc: "Сельскохозяйственный проект, где подопечные женщины осваивают новые профессии, учатся труду и получают возможность самостоятельно обеспечивать свои семьи.",
    features: [
      "Обучение фермерскому делу и уходу за животными",
      "Официальное трудоустройство для подопечных",
      "Реализация экологически чистых продуктов"
    ]
  },
  {
    id: "eco-home",
    title: "ЭкоЦентрСемья",
    subtitle: "Строительство нового будущего",
    image: null,
    icon: ShieldCheck,
    color: "bg-blue-600",
    textColor: "text-blue-700",
    lightBg: "bg-blue-50",
    desc: "Масштабный проект по строительству экологичного жилья в пригороде Казани для выпускников наших центров. Это следующий шаг после реабилитации к самостоятельной жизни.",
    features: [
      "Собственное жилье для окрепших семей",
      "Развитие комьюнити и взаимопомощи",
      "Экологичные технологии строительства"
    ]
  },
  {
    id: "care",
    title: "ЦентрЗаботы",
    subtitle: "Продуктовая помощь",
    image: null,
    icon: Utensils,
    color: "bg-amber-500",
    textColor: "text-amber-600",
    lightBg: "bg-amber-50",
    desc: "Ежемесячная выдача более 200 продуктовых наборов для малоимущих семей, одиноких пенсионеров и инвалидов, находящихся за чертой бедности.",
    features: [
      "Формирование сбалансированных наборов",
      "Адресная доставка для маломобильных",
      "Пункт выдачи вещей первой необходимости"
    ]
  },
  {
    id: "edu",
    title: "ЦентрОбразования",
    subtitle: "Развитие и досуг",
    image: null,
    icon: BookOpen,
    color: "bg-purple-600",
    textColor: "text-purple-700",
    lightBg: "bg-purple-50",
    desc: "Более 10 направлений развивающих занятий для детей подопечных, а также курсы повышения квалификации и личностного роста для взрослых.",
    features: [
      "Подготовка к школе и репетиторство",
      "Творческие мастерские и арт-терапия",
      "Компьютерная грамотность для взрослых"
    ]
  }
];

export default function Programs() {
  return (
    <div className="pt-24 pb-20 bg-background min-h-screen">
      
      {/* Header */}
      <div className="container mx-auto px-4 md:px-6 mb-16">
        <div className="max-w-3xl">
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">Наша деятельность</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Комплексные программы помощи
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Мы выстроили систему из 5 центров, которые закрывают все этапы помощи: от экстренного спасения до полного возвращения к самостоятельной жизни.
          </p>
        </div>
      </div>

      {/* Programs List */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-16 md:gap-24">
          
          {programs.map((prog, idx) => {
            const isEven = idx % 2 !== 0;
            return (
              <motion.div 
                key={prog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                id={prog.id}
                className="scroll-mt-32"
              >
                <div className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center`}>
                  
                  {/* Image Side */}
                  <div className="w-full lg:w-1/2">
                    {(prog as any).bgPhoto ? (
                      /* ── Full-bleed photo background card ── */
                      <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative">
                        {/* Photo */}
                        <img
                          src={(prog as any).bgPhoto}
                          alt={prog.title}
                          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
                          style={{ filter: "brightness(0.82)" }}
                        />
                        {/* Gradient overlay — dark at bottom for readability */}
                        <div className="absolute inset-0"
                          style={{ background: "linear-gradient(160deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.55) 100%)" }} />

                        {/* Icon badge */}
                        <div className={`absolute top-6 left-6 ${prog.color} text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg`}>
                          <prog.icon className="w-7 h-7" />
                        </div>

                      </div>
                    ) : (
                      /* ── Icon placeholder ── */
                      <div className={`aspect-[4/3] rounded-3xl overflow-hidden shadow-lg relative bg-gray-100 flex items-center justify-center`}>
                        <div className={`w-full h-full flex items-center justify-center ${prog.lightBg}`}>
                          <prog.icon className={`w-32 h-32 opacity-20 ${prog.textColor}`} />
                        </div>
                        <div className={`absolute top-6 left-6 ${prog.color} text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg`}>
                          <prog.icon className="w-7 h-7" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content Side */}
                  <div className="w-full lg:w-1/2 flex flex-col">
                    <span className={`${prog.textColor} font-bold text-sm tracking-wide uppercase mb-2 block`}>
                      {prog.subtitle}
                    </span>
                    <h2 className="text-3xl font-serif font-bold text-foreground mb-6">{prog.title}</h2>
                    <div className="w-16 h-1 bg-gray-200 rounded-full mb-6"></div>
                    
                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                      {prog.desc}
                    </p>

                    <div className="bg-white border border-border rounded-2xl p-6 shadow-sm mb-8">
                      <h4 className="font-bold mb-4">Основные направления:</h4>
                      <ul className="flex flex-col gap-3">
                        {prog.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <Heart className={`w-5 h-5 shrink-0 mt-0.5 ${prog.textColor}`} />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <Link href="/help" className="inline-flex items-center justify-center h-10 px-6 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow bg-primary text-primary-foreground font-medium text-sm">
                        Поддержать проект
                      </Link>
                    </div>
                  </div>
                  
                </div>
              </motion.div>
            )
          })}
          
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-foreground mt-24 py-20 text-white text-center px-4">
        <h2 className="text-3xl font-serif font-bold mb-6">Нужна помощь прямо сейчас?</h2>
        <p className="text-gray-300 mb-8 max-w-xl mx-auto">
          Если вы или ваши близкие оказались в кризисной ситуации, не бойтесь просить о помощи. Свяжитесь с нами, и мы постараемся найти решение.
        </p>
        <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-lg px-8 py-4 transition-colors">
          <PhoneCall className="w-5 h-5 mr-2" />
          Связаться с фондом
        </Link>
      </div>
      
    </div>
  );
}
