import { ArrowRight, ChevronDown } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Hero() {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── Background Image ── */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/hero.jpg"
          alt="Chiroyli gul kompozitsiyasi"
          className="h-full w-full object-cover dark:brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ivory/95 via-ivory/80 to-ivory/40 dark:from-[#121A16]/95 dark:via-[#121A16]/85 dark:to-[#121A16]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-ivory/60 via-transparent to-transparent dark:from-[#121A16]/80" />
      </div>

      {/* ── Content ── */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10 w-full">
        <div className="max-w-2xl pt-32 pb-20 lg:pt-40 lg:pb-32">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 rounded-full border border-forest/10 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-sm px-4 py-1.5 mb-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold dark:bg-amber-300 animate-pulse" />
            <span className="text-xs font-medium tracking-widest uppercase text-forest dark:text-emerald-300">
              Samarqandda yetkazib berish
            </span>
          </div>

          {/* Heading */}
          <h1
            className={`font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-semibold leading-[1.08] text-forest-dark dark:text-white text-balance transition-all duration-700 delay-150 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Yurakdan
            <br />
            <span className="italic text-forest dark:text-emerald-400">gapiruvchi</span>
            <br />
            gullar.
          </h1>

          {/* Subtitle */}
          <p
            className={`mt-7 max-w-lg text-base sm:text-lg leading-relaxed text-warm-gray dark:text-neutral-300 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Hayotning eng go'zal lahzalari uchun puxta ishlab chiqilgan buketlar.
          </p>

          {/* CTA */}
          <div
            className={`mt-10 flex flex-wrap items-center gap-4 transition-all duration-700 delay-[450ms] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <a
              href="#shop"
              className="group inline-flex items-center gap-3 rounded-full bg-forest dark:bg-emerald-600 px-8 py-4 text-sm font-semibold tracking-wide text-white shadow-lg shadow-forest/20 dark:shadow-emerald-900/30 transition-all duration-300 hover:bg-forest-dark dark:hover:bg-emerald-500 hover:shadow-xl hover:gap-4"
            >
              Kolleksiyani ko'rish
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2} />
            </a>
            <a
              href="https://www.instagram.com/samarqand.melfisflowers/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 dark:border-white/20 bg-white/50 dark:bg-white/10 backdrop-blur-sm px-8 py-4 text-sm font-semibold tracking-wide text-charcoal dark:text-white transition-all duration-300 hover:bg-white dark:hover:bg-white/20 hover:border-charcoal/25"
            >
              Instagram
            </a>
          </div>

          {/* Stats */}
          <div
            className={`mt-16 flex gap-10 sm:gap-14 transition-all duration-700 delay-[600ms] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {[
              { value: '5K+', label: 'Mamnun mijozlar' },
              { value: '200+', label: 'Noyob dizaynlar' },
              { value: '4.9', label: 'Baholash' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-2xl font-semibold text-forest-dark dark:text-white">
                  {stat.value}
                </div>
                <div className="mt-0.5 text-xs tracking-wide text-warm-gray dark:text-neutral-400 uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-charcoal/50 dark:text-white/50">
          Pastga
        </span>
        <ChevronDown className="h-4 w-4 text-charcoal/40 dark:text-white/40 animate-bounce" strokeWidth={1.5} />
      </div>
    </section>
  );
}
