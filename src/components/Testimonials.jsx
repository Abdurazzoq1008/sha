import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { testimonials } from '../data/products';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [ref, isVisible] = useScrollAnimation(0.1);
  const testimonial = testimonials[active];
  const previous = () => setActive((current) => (current - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((current) => (current + 1) % testimonials.length);

  return (
    <section className="py-24 lg:py-32 bg-cream/50 dark:bg-[#151F1A] transition-colors duration-400" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div
          className={`text-center max-w-xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold dark:text-amber-300">
            Fikrlar
          </span>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-semibold text-forest-dark dark:text-white leading-tight">
            Minglab mamnun mijozlar
          </h2>
        </div>

        <div
          className={`mx-auto max-w-3xl transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          aria-live="polite"
        >
          <article key={testimonial.id} className="relative rounded-3xl border border-transparent bg-white p-8 text-center shadow-xl shadow-forest/5 transition-all duration-500 dark:border-white/5 dark:bg-[#1E2B24] dark:shadow-black/20 sm:p-10">
              <Quote className="mx-auto mb-6 h-8 w-8 text-gold/30 dark:text-amber-300/30" strokeWidth={1.5} />

              <div className="mb-5 flex justify-center gap-1" aria-label="5 yulduzdan 5">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-gold text-gold dark:fill-amber-400 dark:text-amber-400"
                    strokeWidth={0}
                  />
                ))}
              </div>

              <blockquote className="mb-8 font-display text-lg leading-relaxed text-charcoal/80 dark:text-neutral-200 sm:text-xl">“{testimonial.text}”</blockquote>

              <div className="flex items-center justify-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt=""
                  className="h-11 w-11 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="text-left text-sm font-semibold text-charcoal dark:text-white">{testimonial.name}</p>
                  <p className="text-left text-xs text-warm-gray dark:text-neutral-400">{testimonial.role}</p>
                </div>
              </div>
          </article>
          <div className="mt-6 flex items-center justify-center gap-4">
            <button type="button" aria-label="Oldingi fikr" onClick={previous} className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/10 text-charcoal transition-colors hover:bg-white dark:border-white/10 dark:text-white dark:hover:bg-white/10"><ChevronLeft className="h-4 w-4" /></button>
            <div className="flex gap-2">
              {testimonials.map((item, index) => <button key={item.id} type="button" aria-label={`${index + 1}-fikrni ko‘rish`} aria-pressed={active === index} onClick={() => setActive(index)} className={`h-1.5 rounded-full transition-all ${active === index ? 'w-6 bg-forest dark:bg-emerald-400' : 'w-1.5 bg-forest/25 dark:bg-white/25'}`} />)}
            </div>
            <button type="button" aria-label="Keyingi fikr" onClick={next} className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/10 text-charcoal transition-colors hover:bg-white dark:border-white/10 dark:text-white dark:hover:bg-white/10"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
