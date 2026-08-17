import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Сообщение отправлено",
      description: "Мы получили ваше письмо и ответим в рабочее время.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="pt-24 pb-20 bg-background min-h-screen">
      
      {/* Header */}
      <div className="container mx-auto px-4 md:px-6 mb-16">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Контакты
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Мы всегда на связи. Пишите, звоните или приходите в гости — наши двери открыты для тех, кому нужна помощь, и для тех, кто готов её оказать.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Info Side */}
          <div className="flex flex-col gap-10">
            
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Наш адрес</h3>
                <p className="text-muted-foreground text-lg mb-2">Республика Татарстан, г. Казань, <br/>ул. Жилякле, д. 61а</p>
                <a href="#" className="text-primary font-medium text-sm hover:underline">Показать на карте Google</a>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Телефон горячей линии</h3>
                <a href="tel:+78000000000" className="text-muted-foreground text-lg hover:text-primary transition-colors block">+7 (800) 000-00-00</a>
                <span className="text-xs text-gray-500">Звонок бесплатный</span>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Email</h3>
                <a href="mailto:info@dobrodarom.ru" className="text-muted-foreground text-lg hover:text-primary transition-colors block">info@dobrodarom.ru</a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Режим работы</h3>
                <p className="text-muted-foreground">Пн-Пт: 9:00 – 18:00<br/>Сб-Вс: выходной</p>
                <p className="text-sm text-amber-600 mt-2 font-medium bg-amber-50 inline-block px-3 py-1 rounded-md">Прием подопечных круглосуточно (по экстренной линии)</p>
              </div>
            </div>
            
          </div>

          {/* Form Side */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-border">
            <h2 className="text-2xl font-serif font-bold mb-6">Написать нам</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-2">
                <Label htmlFor="name">Ваше имя</Label>
                <Input id="name" required placeholder="Иван Иванов" className="bg-gray-50" />
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input id="phone" type="tel" placeholder="+7 (999) 000-00-00" className="bg-gray-50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required placeholder="ivan@example.com" className="bg-gray-50" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Сообщение</Label>
                <Textarea id="message" required rows={5} placeholder="Ваш вопрос или предложение..." className="bg-gray-50 resize-none" />
              </div>
              
              <Button type="submit" size="lg" className="w-full rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-lg">
                Отправить сообщение
              </Button>
            </form>
          </div>
          
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="w-full h-[400px] mt-24 bg-gray-200 relative flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=55.796391,49.108891&zoom=13&size=2000x400&sensor=false&style=feature:all|element:labels.text.fill|color:0x8e8e8e&style=feature:all|element:labels.text.stroke|color:0xffffff&style=feature:all|element:labels.icon|visibility:off&style=feature:administrative|element:geometry.fill|color:0xfefefe&style=feature:administrative|element:geometry.stroke|color:0xfefefe&style=feature:landscape|element:geometry|color:0xf5f5f5&style=feature:poi|element:geometry|color:0xf5f5f5&style=feature:road.highway|element:geometry.fill|color:0xffffff&style=feature:road.highway|element:geometry.stroke|color:0x808080&style=feature:road.arterial|element:geometry.fill|color:0xffffff&style=feature:road.arterial|element:geometry.stroke|color:0x808080&style=feature:road.local|element:geometry.fill|color:0xffffff&style=feature:road.local|element:geometry.stroke|color:0x808080&style=feature:transit|element:geometry|color:0xf2f2f2&style=feature:water|element:geometry|color:0xd3e5ec')] bg-cover bg-center grayscale opacity-60"></div>
        <div className="z-10 bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 text-center max-w-sm mx-4">
          <div className="w-12 h-12 bg-primary rounded-full flex flex-col items-center justify-center text-white shrink-0">
            <span className="font-serif font-bold">ДД</span>
          </div>
          <div className="text-left">
            <h4 className="font-bold">Фонд «Добро Даром»</h4>
            <p className="text-sm text-gray-500">г. Казань, ул. Жилякле, д. 61а</p>
          </div>
        </div>
      </div>

    </div>
  );
}
