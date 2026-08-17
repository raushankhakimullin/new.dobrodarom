import { useState } from "react";
import { Link } from "wouter";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/Animations";
import { Home, Heart, Leaf, Sprout, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import farm1 from "@/assets/farm-1.jpg";
import farm2 from "@/assets/farm-2.jpg";

const programs = [
  {
    id: "centrmama",
    title: "ЦентрМама",
    icon: Home,
    description: "Кризисный центр для матерей с новорождёнными на грани отказа от ребёнка и женщин с детьми в ситуации домашнего насилия.",
    features: [
      { title: "Проживание", desc: "Безопасное жильё со всеми условиями на период острой фазы кризиса." },
      { title: "Реабилитация", desc: "Психологическая помощь для проработки травм и восстановления ресурса." },
      { title: "Специалисты", desc: "Сопровождение юристов, педагогов и социальных работников." }
    ],
    mission: "Сохранять семьи, предотвращать отказы от детей и возвращать женщинам веру в свои силы.",
    progress: 65,
    images: null as string[] | null,
    imagePlaceholder: "Фотография уютной комнаты или мамы с ребёнком"
  },
  {
    id: "centrzaboty",
    title: "ЦентрЗаботы",
    icon: Heart,
    description: "Служба регулярной продуктовой и вещевой поддержки для малообеспеченных и многодетных семей, одиноких пенсионеров.",
    features: [
      { title: "Продуктовые наборы", desc: "Ежемесячная выдача базовых продуктов питания." },
      { title: "Вещевая помощь", desc: "Сбор и распределение одежды по сезону для детей и взрослых." },
      { title: "Адресная помощь", desc: "Закупка необходимых лекарств и предметов быта по запросу." }
    ],
    mission: "Закрыть базовые потребности, чтобы у людей появились силы на решение системных проблем.",
    progress: 85,
    images: null as string[] | null,
    imagePlaceholder: "Фотография волонтёров, собирающих продуктовые наборы"
  },
  {
    id: "ekocentr",
    title: "ЭкоЦентр «Семья»",
    icon: Leaf,
    description: "Уникальный проект строительства экологических домов для семей, вышедших из кризиса, но не имеющих собственного жилья.",
    features: [
      { title: "Своё жильё", desc: "Предоставление домов на льготных условиях длительной аренды с правом выкупа." },
      { title: "Сообщество", desc: "Формирование поддерживающей среды соседей-единомышленников." },
      { title: "Экология", desc: "Использование эко-технологий и бережное отношение к природе." }
    ],
    mission: "Дать фундамент — свой дом — для окончательного закрепления в самостоятельной жизни.",
    progress: 30,
    images: null as string[] | null,
    imagePlaceholder: "Рендер или фото строительства деревянных эко-домов"
  },
  {
    id: "ekoferma",
    title: "ЭкоФерма «Страна Малиния»",
    icon: Sprout,
    description: "Проект по обучению женщин профессиям и навыкам работы на земле для достижения финансовой независимости.",
    features: [
      { title: "Обучение", desc: "Практические курсы по выращиванию ягод, овощей и зелени." },
      { title: "Трудоустройство", desc: "Возможность работать на ферме фонда и получать стабильный доход." },
      { title: "Предпринимательство", desc: "Помощь в организации собственного микро-бизнеса." }
    ],
    mission: "Обеспечить женщин удочкой — стабильным ремеслом, которое будет кормить их семьи.",
    progress: 45,
    images: [farm1, farm2] as string[],
    imagePlaceholder: "Фотография теплиц или женщин за работой на ферме"
  },
  {
    id: "obrazovanie",
    title: "ЦентрОбразования",
    icon: BookOpen,
    description: "Образовательные и развивающие программы для детей из кризисных семей и обучающие курсы для их родителей.",
    features: [
      { title: "Для детей", desc: "Подготовка к школе, репетиторство, творческие кружки." },
      { title: "Для родителей", desc: "Курсы финансовой грамотности, компьютерные курсы, профориентация." },
      { title: "Досуг", desc: "Организация совместных семейных праздников и выездов." }
    ],
    mission: "Развивать потенциал каждого члена семьи и открывать новые горизонты возможностей.",
    progress: 70,
    images: null as string[] | null,
    imagePlaceholder: "Фотография детей на занятиях с педагогом"
  }
];

/* ─── Карусель ──────────────────────────────────────────────────── */
function ImageCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <div className="relative w-full h-full select-none group">
      {/* Slides */}
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`${alt} — фото ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            i === current ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          draggable={false}
        />
      ))}

      {/* Prev */}
      <button
        onClick={prev}
        aria-label="Предыдущее фото"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Next */}
      <button
        onClick={next}
        aria-label="Следующее фото"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Фото ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Страница программ ─────────────────────────────────────────── */
export default function ProjectsPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-secondary/30">
        <div className="container mx-auto px-6 text-center">
          <FadeUp>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Наши программы</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Мы разработали комплексную систему из 5 направлений, чтобы помогать на каждом этапе выхода из жизненного тупика.
            </p>
          </FadeUp>
        </div>
      </section>

      {programs.map((prog, index) => {
        const isEven = index % 2 === 0;
        return (
          <section key={prog.id} className={`py-24 ${isEven ? "bg-white" : "bg-secondary/30"}`} id={prog.id}>
            <div className="container mx-auto px-6">
              <div className={`flex flex-col gap-12 lg:gap-20 ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center`}>

                {/* Image / Carousel */}
                <FadeUp className="w-full lg:w-1/2 aspect-[4/3] bg-secondary rounded-3xl overflow-hidden border border-border relative">
                  {prog.images ? (
                    <ImageCarousel images={prog.images} alt={prog.title} />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-primary/5" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-muted-foreground font-medium p-6 text-center">
                          [{prog.imagePlaceholder}]
                        </span>
                      </div>
                    </>
                  )}
                </FadeUp>

                {/* Content */}
                <div className="w-full lg:w-1/2">
                  <FadeUp>
                    <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                      <prog.icon className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">{prog.title}</h2>
                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                      {prog.description}
                    </p>

                    <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 mb-8 text-primary-900 italic font-serif">
                      "{prog.mission}"
                    </div>
                  </FadeUp>

                  <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                    {prog.features.map((feat, i) => (
                      <StaggerItem key={i}>
                        <h4 className="font-bold mb-2 text-foreground">{feat.title}</h4>
                        <p className="text-sm text-muted-foreground">{feat.desc}</p>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>

                  <FadeUp className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                    <div className="flex justify-between text-sm font-medium mb-3">
                      <span className="text-muted-foreground">Сбор средств</span>
                      <span className="text-primary font-bold">{prog.progress}% собрано</span>
                    </div>
                    <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden mb-6">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${prog.progress}%` }}
                      />
                    </div>

                    <Link
                      href={`/donate?project=${prog.id}`}
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-primary text-white px-8 py-3.5 rounded-xl font-medium hover:bg-primary/90 transition-all active:scale-95 shadow-sm"
                    >
                      Поддержать {prog.title}
                    </Link>
                  </FadeUp>
                </div>

              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
