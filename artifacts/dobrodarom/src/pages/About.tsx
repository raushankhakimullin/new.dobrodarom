import { motion } from "framer-motion";
import { Link } from "wouter";
import { CheckCircle2, History, Users2, ShieldCheck, HeartHandshake } from "lucide-react";
import aboutImg from "@/assets/about.jpg";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="pt-24 pb-20 bg-background min-h-screen">
      
      {/* Header */}
      <div className="container mx-auto px-4 md:px-6 mb-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            О фонде «Добро Даром»
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            С 2014 года мы меняем жизни людей в Республике Татарстан, предоставляя комплексную поддержку тем, кто оказался в тупике.
          </p>
        </div>
      </div>

      {/* Main Image & Story */}
      <div className="container mx-auto px-4 md:px-6 mb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden shadow-2xl relative aspect-[4/3] bg-gray-100"
          >
            <img src={aboutImg} alt="Команда фонда" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="font-medium text-lg">Наша команда и волонтеры</p>
              <p className="text-white/80 text-sm">Казань, Татарстан</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-3xl font-serif font-bold text-foreground">Как всё начиналось</h2>
            <div className="w-16 h-1 bg-primary rounded-full"></div>
            
            <div className="prose prose-lg text-muted-foreground">
              <p>
                Благотворительный фонд «Добро Даром» был основан в 2014 году группой единомышленников, которые не могли оставаться в стороне от чужой беды. Мы начинали с малого — сбора вещей и продуктов для нуждающихся семей.
              </p>
              <p>
                Но очень скоро мы поняли: <strong>разовая помощь не решает проблему</strong>. Человек, получивший пакет продуктов, завтра снова останется голодным, если не изменить его жизненную ситуацию в корне.
              </p>
              <p>
                Так родилась наша философия комплексного подхода. Мы стали создавать центры и программы, которые берут человека за руку и проводят через все этапы реабилитации: от предоставления безопасного жилья до обучения новой профессии.
              </p>
            </div>

            <div className="bg-accent/50 p-6 rounded-2xl border border-primary/10 mt-4">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-foreground">
                <ShieldCheck className="w-5 h-5 text-primary" /> 
                Наша миссия
              </h3>
              <p className="text-muted-foreground">
                Создать в обществе систему, при которой каждый человек, оказавшийся в кризисе, имеет реальный шанс на восстановление, возвращение достоинства и самостоятельности.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-white py-24 border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Наши ценности</h2>
            <p className="text-muted-foreground text-lg">Принципы, на которых строится каждый день нашей работы.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-background border border-border shadow-sm flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
                <HeartHandshake className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Человечность</h3>
              <p className="text-muted-foreground">
                Мы видим в каждом подопечном личность. Никакого осуждения, только поддержка, уважение к достоинству и безусловное принятие.
              </p>
            </div>
            
            <div className="p-8 rounded-2xl bg-background border border-border shadow-sm flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
                <History className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Системность</h3>
              <p className="text-muted-foreground">
                Мы решаем причины, а не только следствия проблем. Комплексный подход дает устойчивый результат, меняя жизнь на годы вперед.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-background border border-border shadow-sm flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
                <Users2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Открытость</h3>
              <p className="text-muted-foreground">
                Абсолютная прозрачность нашей деятельности. Мы регулярно публикуем отчеты и открыты для любых проверок со стороны общества и партнеров.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-4 md:px-6 mt-24 text-center">
        <div className="max-w-2xl mx-auto bg-primary text-white rounded-3xl p-10 md:p-14 shadow-2xl">
          <h2 className="text-3xl font-serif font-bold mb-6">Прозрачность — наш приоритет</h2>
          <p className="text-primary-foreground/90 mb-8 text-lg">
            Мы дорожим доверием наших благотворителей. Все средства расходуются строго по назначению, а отчеты доступны публично.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/reports" className="inline-flex items-center justify-center w-full sm:w-auto h-11 px-8 py-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 font-bold transition-colors">
              Смотреть отчетность
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center w-full sm:w-auto h-11 px-8 py-2 rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors font-medium">
              Связаться с нами
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
