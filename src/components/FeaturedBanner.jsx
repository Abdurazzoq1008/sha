import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function FeaturedBanner() {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <section className="py-24 lg:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div
          className={`grid lg:grid-cols-2 gap-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Card 1 */}
          <div className="group relative overflow-hidden rounded-3xl bg-blush-light min-h-[400px] lg:min-h-[480px] flex items-end p-8 lg:p-12">
            <img
              src="/images/wedding.jpg"
              alt="To'y kolleksiyasi"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent" />
            <div className="relative">
              <span className="inline-block rounded-full bg-white/20 backdrop-blur-sm px-4 py-1.5 text-[10px] font-semibold tracking-widest uppercase text-white mb-4">
                To'y mavsumi
              </span>
              <h3 className="font-display text-3xl lg:text-4xl font-semibold text-white leading-tight">
                Kelin va
                <br />
                marosim gullari
              </h3>
              <a
                href="#shop"
                className="group/btn mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white transition-colors"
              >
                Kolleksiyani ko'rish
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" strokeWidth={2} />
              </a>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative overflow-hidden rounded-3xl bg-cream min-h-[400px] lg:min-h-[480px] flex items-end p-8 lg:p-12">
            <img
              src="/images/rose.jpg"
              alt="Sovg'a kolleksiyasi"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent" />
            <div className="relative">
              <span className="inline-block rounded-full bg-white/20 backdrop-blur-sm px-4 py-1.5 text-[10px] font-semibold tracking-widest uppercase text-white mb-4">
                Mukammal sovg'a
              </span>
              <h3 className="font-display text-3xl lg:text-4xl font-semibold text-white leading-tight">
                Har qanday munosabat
                <br />
                uchun atirgullar
              </h3>
              <a
                href="#shop"
                className="group/btn mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white transition-colors"
              >
                Atirgullarni ko'rish
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
