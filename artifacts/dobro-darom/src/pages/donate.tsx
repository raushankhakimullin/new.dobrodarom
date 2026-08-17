import { useState, useEffect } from "react";
import { Link } from "wouter";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/Animations";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Copy, Check, Heart, ShieldCheck, Lock, CreditCard, Package, Handshake, Users, ArrowRight } from "lucide-react";

const HOW_TO_HELP = [
  {
    icon: CreditCard,
    title: "Финансово",
    description: "Пожертвования идут на содержание приюта, закупку продуктов и оплату специалистов.",
    linkLabel: "Реквизиты",
    linkHref: "#requisites",
    isAnchor: true,
  },
  {
    icon: Package,
    title: "Вещами",
    description: "Продукты длительного хранения, средства гигиены, детское питание и памперсы.",
    linkLabel: "Список нужд",
    linkHref: "/contacts",
    isAnchor: false,
  },
  {
    icon: Handshake,
    title: "Партнёрство",
    description: "Корпоративная социальная ответственность для бизнеса. Установка ящиков, совместные акции.",
    linkLabel: "Стать партнёром",
    linkHref: "/partners",
    isAnchor: false,
  },
  {
    icon: Users,
    title: "Волонтёрство",
    description: "Помощь руками, автоволонтёрство, фото- и видеосъёмка, юридические консультации (Pro bono).",
    linkLabel: "Анкета волонтёра",
    linkHref: "/volunteers",
    isAnchor: false,
  },
];

const CP_PUBLIC_ID = "pk_29304e270934045c05a006a4e38a0";

const REQUISITES = [
  { label: "Наименование", value: 'БЛАГОТВОРИТЕЛЬНЫЙ ФОНД "ДОБРО ДАРОМ РЕСПУБЛИКИ ТАТАРСТАН"' },
  { label: "Юридический адрес", value: "Республика Татарстан, г. Казань" },
  { label: "ИНН", value: "1657115881" },
  { label: "КПП", value: "168401001" },
  { label: "БИК", value: "044525411" },
  { label: "Банк", value: 'Филиал "Центральный" Банка ВТБ (ПАО)' },
  { label: "Кор. счёт", value: "30101810145250000411" },
  { label: "Расч. счёт", value: "40703810616837000015" },
  { label: "Директор", value: "Хакимуллин Раушан Рафикович" },
];

const REQUISITES_TEXT = REQUISITES.map(r => `${r.label}: ${r.value}`).join("\n") +
  "\nНазначение платежа: Добровольное пожертвование на уставную деятельность. НДС не облагается.";

const PRESET_AMOUNTS = [500, 1000, 3000];

const PROJECT_NAMES: Record<string, string> = {
  general: "На все проекты фонда",
  centrmama: "ЦентрМама",
  centrzaboty: "ЦентрЗаботы",
  ekocentr: "ЭкоЦентр Семья",
  ekoferma: "ЭкоФерма Страна Малиния",
  obrazovanie: "ЦентрОбразования",
};

type PayState = "form" | "success" | "error";

export default function DonatePage() {
  const [type, setType] = useState<"monthly" | "once">("monthly");
  const [amount, setAmount] = useState<number | string>(1000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [project, setProject] = useState<string>("general");
  const [email, setEmail] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [payState, setPayState] = useState<PayState>("form");
  const [paidAmount, setPaidAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(REQUISITES_TEXT).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const projectParam = searchParams.get("project");
    if (projectParam && PROJECT_NAMES[projectParam]) {
      setProject(projectParam);
    }
  }, []);

  const handleAmountClick = (val: number) => {
    setAmount(val);
    setCustomAmount("");
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    setCustomAmount(val);
    setAmount(val ? parseInt(val) : "");
  };

  const finalAmount = customAmount ? parseInt(customAmount) : (typeof amount === "number" ? amount : 0);
  const projectName = PROJECT_NAMES[project] ?? "На все проекты фонда";
  const description = type === "monthly"
    ? `Ежемесячное пожертвование фонду Добро Даром — ${projectName}`
    : `Пожертвование фонду Добро Даром — ${projectName}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!finalAmount || finalAmount < 1) {
      alert("Пожалуйста, укажите сумму пожертвования.");
      return;
    }

    if (type === "monthly" && !email.trim()) {
      alert("Для оформления ежемесячного пожертвования укажите ваш email.");
      return;
    }

    if (!window.cp) {
      alert("Виджет оплаты не загружен. Пожалуйста, обновите страницу и попробуйте снова.");
      return;
    }

    setIsLoading(true);

    const widget = new window.cp.CloudPayments();

    const params: Parameters<typeof widget.pay>[1] = {
      publicId: CP_PUBLIC_ID,
      description,
      amount: finalAmount,
      currency: "RUB",
      invoiceId: `dobro-${Date.now()}`,
      skin: "modern",
      ...(email.trim() ? { email: email.trim(), accountId: email.trim() } : {}),
      data: {
        project: projectName,
        donationType: type,
      },
    };

    if (type === "monthly") {
      params.recurrent = {
        interval: "Month",
        period: 1,
        maxPeriods: 0, // unlimited
      };
    }

    widget.pay(
      "charge",
      params,
      {
        onSuccess: () => {
          setIsLoading(false);
          setPaidAmount(finalAmount);
          setPayState("success");
          window.scrollTo({ top: 0, behavior: "smooth" });
        },
        onFail: (_reason) => {
          setIsLoading(false);
          // Widget shows its own error UI; don't override with alert
        },
        onComplete: (_result) => {
          setIsLoading(false);
        },
      }
    );
  };

  // --- Thank-you screen ---
  if (payState === "success") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6 py-32 bg-white">
        <FadeUp className="max-w-lg text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
            <Heart className="w-10 h-10 text-primary fill-primary/30" />
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Спасибо от всего сердца!</h1>
          <p className="text-xl text-muted-foreground mb-3 leading-relaxed">
            Ваш перевод <strong className="text-foreground">{paidAmount.toLocaleString("ru-RU")} ₽</strong> уже работает — он поможет{" "}
            {project === "centrmama" ? "маме сохранить семью" :
             project === "centrzaboty" ? "семье с продуктовым набором" :
             project === "ekocentr" ? "построить новый дом" :
             project === "ekoferma" ? "женщине обрести профессию" :
             project === "obrazovanie" ? "ребёнку получить знания" :
             "тем, кто в этом нуждается больше всего"}.
          </p>
          {type === "monthly" && (
            <p className="text-sm text-muted-foreground mb-8 bg-secondary/50 rounded-2xl px-5 py-3">
              Ежемесячное пожертвование оформлено. Каждый месяц вы автоматически будете помогать фонду — это ценнее разовой поддержки. Отменить можно в любой момент.
            </p>
          )}
          <p className="text-muted-foreground mb-10 leading-relaxed">
            Мы не можем назвать вас поимённо здесь, но каждый человек, которому помог фонд, знает: есть люди, которым не всё равно.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => { setPayState("form"); setAmount(1000); setCustomAmount(""); }}
              className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
            >
              Помочь ещё раз
            </button>
            <a href="/" className="border-2 border-border px-8 py-3 rounded-full font-medium hover:border-primary/50 transition-colors text-foreground">
              На главную
            </a>
          </div>
        </FadeUp>
      </div>
    );
  }

  return (
    <>
      <section className="pt-32 pb-16 bg-secondary/30 border-b border-border">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <FadeUp>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Ваша помощь меняет жизни</h1>
            <p className="text-lg text-muted-foreground">
              Каждое пожертвование даёт надежду тем, кто оказался в беде. Оформите регулярный платёж, чтобы помогать системно.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Как помочь фонду ── */}
      <section className="py-16 md:py-20 bg-white border-b border-border">
        <div className="container mx-auto px-6 max-w-5xl">
          <FadeUp className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Как помочь фонду</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Любая помощь имеет значение. Выберите удобный для вас способ поддержать работу фонда «Добро Даром» и изменить чью-то жизнь.
            </p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_TO_HELP.map((item) => (
              <StaggerItem key={item.title}>
                <div className="flex flex-col h-full bg-secondary/30 rounded-3xl p-7 border border-border hover:border-primary/30 hover:shadow-md transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-colors">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-lg mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">{item.description}</p>
                  {item.isAnchor ? (
                    <a
                      href={item.linkHref}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:gap-3 transition-all"
                    >
                      {item.linkLabel} <ArrowRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <Link
                      href={item.linkHref}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:gap-3 transition-all"
                    >
                      {item.linkLabel} <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Форма пожертвования ── */}
      <section className="py-16 md:py-24 bg-white relative z-10" id="requisites">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">

            {/* Donation Form */}
            <div className="lg:col-span-3 order-2 lg:order-1">
              <FadeUp>
                <div className="bg-white p-6 md:p-10 rounded-3xl border border-border shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <form onSubmit={handleSubmit}>

                    {/* Type toggle */}
                    <div className="flex p-1 bg-secondary rounded-xl mb-8">
                      <button
                        type="button"
                        onClick={() => setType("monthly")}
                        data-testid="button-type-monthly"
                        className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
                          type === "monthly"
                            ? "bg-white text-primary shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Ежемесячно
                      </button>
                      <button
                        type="button"
                        onClick={() => setType("once")}
                        data-testid="button-type-once"
                        className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
                          type === "once"
                            ? "bg-white text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Разово
                      </button>
                    </div>

                    {/* Amount presets */}
                    <div className="mb-8">
                      <label className="block text-sm font-bold mb-4">Сумма пожертвования (₽)</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {PRESET_AMOUNTS.map(val => (
                          <button
                            key={val}
                            type="button"
                            data-testid={`button-amount-${val}`}
                            onClick={() => handleAmountClick(val)}
                            className={`py-4 rounded-xl text-lg font-bold transition-all border-2 ${
                              amount === val && !customAmount
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-border bg-white text-foreground hover:border-primary/30"
                            }`}
                          >
                            {val}
                          </button>
                        ))}
                        <div className="relative col-span-2 sm:col-span-1">
                          <input
                            type="text"
                            placeholder="Своя сумма"
                            value={customAmount}
                            onChange={handleCustomChange}
                            data-testid="input-custom-amount"
                            className={`w-full py-4 px-4 rounded-xl text-lg font-bold outline-none border-2 transition-all ${
                              customAmount
                                ? "border-primary bg-primary/5 text-primary"
                                : "border-border bg-white text-foreground focus:border-primary/30"
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Project */}
                    <div className="mb-8">
                      <label className="block text-sm font-bold mb-4">Назначение платежа</label>
                      <select
                        value={project}
                        onChange={(e) => setProject(e.target.value)}
                        data-testid="select-project"
                        className="w-full p-4 rounded-xl border-2 border-border bg-white outline-none focus:border-primary transition-colors text-foreground font-medium appearance-none"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239C9E9F'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 1rem center',
                          backgroundSize: '1.2em',
                        }}
                      >
                        <option value="general">На все проекты фонда (самые срочные нужды)</option>
                        <option value="centrmama">Программа «ЦентрМама»</option>
                        <option value="centrzaboty">Программа «ЦентрЗаботы»</option>
                        <option value="ekocentr">Проект «ЭкоЦентр Семья»</option>
                        <option value="ekoferma">Проект «ЭкоФерма Страна Малиния»</option>
                        <option value="obrazovanie">Программа «ЦентрОбразования»</option>
                      </select>
                    </div>

                    {/* Email — required for monthly, optional for once */}
                    <div className="mb-8">
                      <label className="block text-sm font-bold mb-2">
                        Email{type === "monthly" && <span className="text-primary ml-1">*</span>}
                        {type === "monthly" && <span className="text-xs font-normal text-muted-foreground ml-2">— нужен для ежемесячного списания</span>}
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        data-testid="input-email"
                        placeholder="Ваш email"
                        required={type === "monthly"}
                        className="w-full p-4 rounded-xl border-2 border-border bg-white outline-none focus:border-primary transition-colors text-foreground"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      data-testid="button-pay"
                      className="w-full bg-primary text-white py-5 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-md active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Открываем форму оплаты…" : `Оплатить ${finalAmount ? finalAmount.toLocaleString("ru-RU") + " ₽" : ""}`}
                    </button>

                    <div className="mt-5 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> PCI DSS</span>
                      <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> CloudPayments</span>
                      <span>НДС не облагается</span>
                    </div>

                    <div className="mt-4 text-xs text-muted-foreground text-center">
                      Нажимая кнопку, вы принимаете условия <a href="/privacy" className="underline hover:text-foreground">оферты</a> и <a href="/privacy" className="underline hover:text-foreground">политики конфиденциальности</a>.
                    </div>
                  </form>
                </div>
              </FadeUp>
            </div>

            {/* Sidebar Info */}
            <div className="lg:col-span-2 order-1 lg:order-2 flex flex-col gap-8">
              <FadeUp delay={0.1}>
                <div className="bg-secondary/50 p-8 rounded-3xl border border-border">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-serif font-bold text-xl">Реквизиты для юрлиц</h3>
                    <button
                      onClick={handleCopy}
                      data-testid="button-copy-requisites"
                      className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-border bg-white hover:border-primary hover:text-primary transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? "Скопировано" : "Скопировать"}
                    </button>
                  </div>
                  <div className="text-sm flex flex-col gap-2.5">
                    {REQUISITES.map((r) => (
                      <div key={r.label} className="flex flex-col gap-0.5">
                        <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">{r.label}</span>
                        <span className="font-mono text-foreground text-sm leading-snug">{r.value}</span>
                      </div>
                    ))}
                    <p className="text-xs text-muted-foreground italic mt-2 pt-2 border-t border-border">
                      Назначение платежа: Добровольное пожертвование на уставную деятельность. НДС не облагается.
                    </p>
                  </div>
                </div>
              </FadeUp>
              
              <FadeUp delay={0.2}>
                <h3 className="font-serif font-bold text-xl mb-4 px-2">Частые вопросы</h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="border-border">
                    <AccordionTrigger className="text-left font-bold text-sm hover:text-primary">Можно ли отменить подписку?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Да, вы можете отменить ежемесячное списание в любой момент в личном кабинете вашего банка или написав нам на почту dobro-darom@mail.ru.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2" className="border-border">
                    <AccordionTrigger className="text-left font-bold text-sm hover:text-primary">Безопасно ли оставлять данные карты?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Фонд не хранит и не обрабатывает данные ваших карт. Все платежи проходят через защищенный шлюз CloudPayments с сертификацией PCI DSS.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3" className="border-border">
                    <AccordionTrigger className="text-left font-bold text-sm hover:text-primary">Как получить налоговый вычет?</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Сохраняйте квитанции об оплате, которые приходят на email. В начале следующего года вы можете подать декларацию 3-НДФЛ, приложив квитанции и копию нашего договора-оферты.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
