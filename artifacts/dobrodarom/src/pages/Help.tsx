import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { CreditCard, Package, BriefcaseBusiness, Users, Info, Copy, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const VK_URL = "https://vk.ru/fund.dobrodarom";

const helpTypeLabels: Record<string, string> = {
  volunteer:  "Хочу стать волонтёром",
  partner:    "Корпоративное партнёрство",
  probono:    "Профессиональная помощь (Pro Bono)",
  other:      "Другое",
};

export default function Help() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);

  // Controlled form state so we can read values on submit
  const [name,    setName]    = useState("");
  const [phone,   setPhone]   = useState("");
  const [type,    setType]    = useState("volunteer");
  const [comment, setComment] = useState("");

  const bankDetails = {
    inn: "1655291234",
    kpp: "165501001",
    ogrn: "1141600000000",
    rs: "40703810000000000123",
    bank: "ПАО «БАНК»",
    bik: "044525225",
    ks: "30101810400000000225"
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: "Скопировано", description: "Реквизиты скопированы в буфер обмена" });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    // Compose the VK message from form fields
    const msg =
      `Здравствуйте! Заявка с сайта доброdarom.ru\n\n` +
      `👤 Имя / Компания: ${name}\n` +
      `📞 Телефон: ${phone}\n` +
      `🤝 Вид помощи: ${helpTypeLabels[type] ?? type}` +
      (comment.trim() ? `\n💬 Комментарий: ${comment.trim()}` : "");

    // Copy message to clipboard then open VK
    try {
      await navigator.clipboard.writeText(msg);
    } catch {
      // clipboard not available — still open VK
    }

    window.open(VK_URL, "_blank", "noopener,noreferrer");

    toast({
      title: "✅ Сообщение скопировано!",
      description: "ВКонтакте открыт. Нажмите «Написать сообщение» и вставьте текст (Ctrl+V / ⌘V).",
      duration: 7000,
    });

    // Reset form
    setName(""); setPhone(""); setType("volunteer"); setComment("");
    setSending(false);
  };

  return (
    <div className="pt-24 pb-20 bg-background min-h-screen">
      
      {/* Header */}
      <div className="container mx-auto px-4 md:px-6 mb-16 text-center max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
          Как помочь фонду
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Любая помощь имеет значение. Выберите удобный для вас способ поддержать работу фонда «Добро Даром» и изменить чью-то жизнь.
        </p>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        
        {/* Help Options Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col h-full">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-6">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Финансово</h3>
            <p className="text-muted-foreground text-sm mb-6 flex-1">
              Пожертвования идут на содержание приюта, закупку продуктов и оплату специалистов.
            </p>
            <a href="#donate" className="inline-flex items-center justify-center w-full h-10 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium transition-colors mt-auto">Реквизиты</a>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col h-full">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Вещами</h3>
            <p className="text-muted-foreground text-sm mb-6 flex-1">
              Продукты длительного хранения, средства гигиены, детское питание и памперсы.
            </p>
            <a href="#goods" className="inline-flex items-center justify-center w-full h-10 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium transition-colors mt-auto">Список нужд</a>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col h-full">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
              <BriefcaseBusiness className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Партнерство</h3>
            <p className="text-muted-foreground text-sm mb-6 flex-1">
              Корпоративная социальная ответственность для бизнеса. Установка ящиков, совместные акции.
            </p>
            <a href="#form" className="inline-flex items-center justify-center w-full h-10 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium transition-colors mt-auto">Стать партнером</a>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col h-full">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Волонтерство</h3>
            <p className="text-muted-foreground text-sm mb-6 flex-1">
              Помощь руками, автоволонтерство, фото- и видеосъемка, юридические консультации (Pro bono).
            </p>
            <a href="#form" className="inline-flex items-center justify-center w-full h-10 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium transition-colors mt-auto">Анкета волонтера</a>
          </div>

        </div>

        {/* Detailed Sections */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          
          {/* Donate Section */}
          <div id="donate" className="scroll-mt-32 bg-white rounded-3xl p-8 shadow-sm border border-border">
            <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-primary" /> Финансовая помощь
            </h2>
            
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h4 className="font-medium text-gray-900 mb-4">Банковские реквизиты:</h4>
              <div className="space-y-3 text-sm font-mono">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Получатель:</span>
                  <span className="font-medium text-right">БФ «Добро Даром»</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">ИНН / КПП:</span>
                  <span className="font-medium text-right">{bankDetails.inn} / {bankDetails.kpp}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Р/С:</span>
                  <span className="font-medium text-right break-all">{bankDetails.rs}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Банк:</span>
                  <span className="font-medium text-right">{bankDetails.bank}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">БИК:</span>
                  <span className="font-medium text-right">{bankDetails.bik}</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mt-6 flex items-center justify-center gap-2"
                onClick={() => handleCopy(JSON.stringify(bankDetails, null, 2))}
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                {copied ? "Скопировано" : "Скопировать реквизиты"}
              </Button>
            </div>
            
            <div className="flex gap-3 text-sm text-muted-foreground bg-blue-50 p-4 rounded-xl text-blue-800">
              <Info className="w-5 h-5 shrink-0 text-blue-600" />
              <p>В назначении платежа укажите: «Благотворительное пожертвование на уставную деятельность. Без НДС».</p>
            </div>
          </div>

          {/* Goods Section */}
          <div id="goods" className="scroll-mt-32 bg-white rounded-3xl p-8 shadow-sm border border-border">
            <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
              <Package className="w-6 h-6 text-amber-500" /> Передача вещей
            </h2>
            <p className="text-muted-foreground mb-6">
              Вещи можно привезти по адресу: <br/>
              <strong>г. Казань, ул. Жилякле, д. 61а</strong> <br/>
              Предварительно позвоните нам: +7 (800) 000-00-00
            </p>
            
            <h4 className="font-medium text-gray-900 mb-4">Что всегда необходимо:</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5"><Check className="w-4 h-4" /></div>
                <div>
                  <span className="font-medium block">Продукты питания (непортящиеся)</span>
                  <span className="text-sm text-gray-500">Крупы, макароны, тушенка, консервы, чай, сахар, растительное масло.</span>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5"><Check className="w-4 h-4" /></div>
                <div>
                  <span className="font-medium block">Для малышей</span>
                  <span className="text-sm text-gray-500">Памперсы (все размеры), детские смеси, пеленки, влажные салфетки, крема.</span>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5"><Check className="w-4 h-4" /></div>
                <div>
                  <span className="font-medium block">Бытовая химия</span>
                  <span className="text-sm text-gray-500">Стиральный порошок, мыло, шампуни, зубная паста.</span>
                </div>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Form Section */}
        <div id="form" className="scroll-mt-32 max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-border">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold mb-4">Свяжитесь с нами</h2>
            <p className="text-muted-foreground">Хотите стать партнером, волонтером или предложить иную помощь? Заполните форму, и мы вам перезвоним.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Ваше имя / Компания</Label>
                <Input id="name" required placeholder="Иван Иванов" className="bg-gray-50"
                  value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input id="phone" type="tel" required placeholder="+7 (999) 000-00-00" className="bg-gray-50"
                  value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Вид помощи</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="bg-gray-50">
                  <SelectValue placeholder="Выберите вариант" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="volunteer">Хочу стать волонтёром</SelectItem>
                  <SelectItem value="partner">Корпоративное партнёрство</SelectItem>
                  <SelectItem value="probono">Профессиональная помощь (Pro Bono)</SelectItem>
                  <SelectItem value="other">Другое</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment">Комментарий (необязательно)</Label>
              <Textarea id="comment" rows={4} placeholder="Расскажите подробнее, чем бы вы хотели помочь..."
                className="bg-gray-50 resize-none"
                value={comment} onChange={e => setComment(e.target.value)} />
            </div>

            {/* VK hint */}
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
              <ExternalLink className="w-4 h-4 shrink-0 mt-0.5 text-blue-500" />
              <p>После отправки откроется страница фонда ВКонтакте, а сообщение с вашими данными <strong>скопируется в буфер</strong> — просто вставьте его (Ctrl+V / ⌘V) в поле «Написать сообщение».</p>
            </div>

            <Button type="submit" size="lg" disabled={sending}
              className="w-full rounded-full font-bold text-lg bg-primary hover:bg-primary/90 text-white shadow-md flex items-center justify-center gap-2 transition-all">
              {sending ? "Открываем ВКонтакте…" : (
                <>
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.587-1.496c.598-.19 1.365 1.26 2.179 1.815.615.422 1.082.33 1.082.33l2.172-.03s1.135-.07.597-1.073c-.044-.073-.312-.658-1.606-1.862-1.354-1.259-1.173-1.056.459-3.235.997-1.328 1.394-2.139 1.269-2.486-.119-.332-.854-.244-.854-.244l-2.444.015s-.181-.025-.315.056c-.132.08-.216.267-.216.267s-.384 1.022-.895 1.89c-1.08 1.832-1.512 1.93-1.688 1.815-.41-.265-.308-1.07-.308-1.64 0-1.783.27-2.524-.527-2.715-.265-.064-.46-.106-1.137-.113-.87-.009-1.605.003-2.02.207-.277.135-.49.437-.36.454.161.021.524.098.717.36.248.34.239 1.104.239 1.104s.143 2.098-.333 2.358c-.327.176-.775-.183-1.737-1.827-.492-.85-.864-1.79-.864-1.79s-.071-.175-.201-.268c-.157-.113-.376-.148-.376-.148l-2.322.015s-.348.01-.476.161c-.113.135-.009.414-.009.414s1.818 4.255 3.878 6.399c1.888 1.97 4.03 1.84 4.03 1.84h.972z"/>
                  </svg>
                  Отправить заявку через ВКонтакте
                </>
              )}
            </Button>

            <p className="text-xs text-center text-gray-400">
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}
