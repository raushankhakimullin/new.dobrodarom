import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { BrandMark } from "@/components/Logo";
import { FadeUp } from "@/components/Animations";

export default function NotFound() {
  return (
    <Layout>
      <section className="flex-1 flex items-center justify-center bg-white min-h-[80vh] px-6 py-32">
        <FadeUp className="text-center max-w-md">
          {/* Красный знак */}
          <div className="flex justify-center mb-8">
            <BrandMark color="#E30016" size={80} />
          </div>

          {/* Код ошибки */}
          <p className="text-8xl font-serif font-bold text-primary/10 leading-none mb-4 select-none">
            404
          </p>

          <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
            Страница не найдена
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-10">
            Возможно, адрес изменился или страница была удалена.
            Попробуйте вернуться на главную и найти нужное там.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
            >
              На главную
            </Link>
            <Link
              href="/contacts"
              className="border-2 border-border px-8 py-3 rounded-full font-medium hover:border-primary/50 transition-colors text-foreground"
            >
              Написать нам
            </Link>
          </div>
        </FadeUp>
      </section>
    </Layout>
  );
}
