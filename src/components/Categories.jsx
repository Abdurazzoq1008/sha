import CategoryCard from './CategoryCard';
import { categories } from '../data/products';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Categories() {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <section id="collections" className="py-24 lg:py-32 bg-white dark:bg-[#16201B] transition-colors duration-400" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div
          className={`text-center max-w-xl mx-auto mb-14 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold dark:text-amber-300">
            Uslub bo'yicha tanlang
          </span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-semibold text-forest-dark dark:text-white leading-tight">
            Kolleksiyalar
          </h2>
          <p className="mt-4 text-warm-gray dark:text-neutral-400 leading-relaxed">
            Har qanday munosabat uchun mukammal buket toping — romantik
            atirgullardan zamonaviy minimalist dizaynlargacha.
          </p>
        </div>

        <div
          className={`grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}
