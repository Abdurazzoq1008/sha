import { Leaf, Truck, Shield, Recycle } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const features = [
  {
    icon: Leaf,
    title: 'Yangi gullar',
    description: 'Barqaror fermalardan to\'g\'ridan-to\'g\'ri olingan va 24 soat ichida yetkazilgan.',
  },
  {
    icon: Truck,
    title: 'Bepul yetkazib berish',
    description: 'Soat 14:00 gacha buyurtma qilsangiz, o\'sha kuni bepul yetkazib beramiz.',
  },
  {
    icon: Shield,
    title: '7 kunlik kafolat',
    description: 'Har bir buket yangilik kafolati bilan ta\'minlangan.',
  },
  {
    icon: Recycle,
    title: 'Ekologik toza',
    description: 'Barcha qadoqlash materiallarimiz tabiiy parchalanuvchi.',
  },
];

export default function About() {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <section id="about" className="py-24 lg:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* ── Image Side ── */}
          <div
            className={`relative transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
              <img
                src="/images/bouquet.jpg"
                alt="Gulchi ishda"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 lg:-right-10 glass rounded-2xl p-6 shadow-xl max-w-[220px]">
              <p className="font-display text-3xl font-semibold text-forest-dark">
                4+
              </p>
              <p className="text-sm text-warm-gray mt-1">
                Yillik tajriba — unutilmas buketlar yaratishda
              </p>
            </div>
          </div>

          {/* ── Text Side ── */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
              Bizning hikoyamiz
            </span>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-semibold text-forest-dark leading-tight">
              Har bir <span className="italic text-forest">gulda</span>
              <br />
              go'zallik
            </h2>
            <p className="mt-6 text-warm-gray leading-relaxed">
              Melfis Flowers Samarqand shahrida tashkil etilgan bo'lib, oddiy
              ishonch bilan boshlangan — gullar har qanday lahzani
              favqulodda narsaga aylantirish quvvatiga ega. Bugun bizning
              jamoamiz botanik san'at chegaralarini kengaytirishda davom etmoqda.
            </p>
            <p className="mt-4 text-warm-gray leading-relaxed">
              Biz yaratgan har bir buket tabiat go'zalligining bayramidir —
              niyat, g'amxo'rlik va barqarorlikka bo'lgan sodiqlik bilan
              ishlab chiqilgan.
            </p>

            {/* Features */}
            <div className="mt-10 grid grid-cols-2 gap-6">
              {features.map((f) => (
                <div key={f.title} className="flex flex-col gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest/5">
                    <f.icon className="h-5 w-5 text-forest" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-semibold text-charcoal">
                    {f.title}
                  </h3>
                  <p className="text-xs text-warm-gray leading-relaxed">
                    {f.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
