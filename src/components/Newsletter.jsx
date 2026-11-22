import { ArrowRight, Check } from 'lucide-react';
import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Newsletter() {
  const [ref, isVisible] = useScrollAnimation(0.15);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    try {
      const subscribers = JSON.parse(localStorage.getItem('melfis-newsletter') || '[]');
      const saved = Array.isArray(subscribers) ? subscribers : [];
      if (!saved.includes(email.trim().toLowerCase())) {
        localStorage.setItem('melfis-newsletter', JSON.stringify([...saved, email.trim().toLowerCase()]));
      }
      setSubscribed(true);
    } catch (error) {
      console.error('Obunani saqlab bo‘lmadi.', error);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-white" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div
          className={`relative overflow-hidden rounded-[2rem] bg-forest px-8 py-16 sm:px-16 sm:py-20 lg:px-24 lg:py-28 transition-all duration-700 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Decorative circles */}
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-forest-light/30" />
          <div className="absolute -left-10 -bottom-10 h-60 w-60 rounded-full bg-forest-light/20" />

          <div className="relative max-w-xl mx-auto text-center">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold-light">
              Biz bilan bog'laning
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight">
              Birinchi buyurtmangizga
              <br />
              15% chegirma
            </h2>
            <p className="mt-5 text-white/60 leading-relaxed">
              Bizning yangiliklarimizga obuna bo'ling — maxsus takliflar,
              mavsumiy ilhom va yangi kolleksiyalarga erta kirish uchun.
            </p>

            {/* Input */}
            <form onSubmit={handleSubmit} className="mt-10 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                aria-label="Email manzilingiz"
                value={email}
                onChange={(event) => { setEmail(event.target.value); setSubscribed(false); }}
                placeholder="Email manzilingiz"
                className="flex-1 rounded-full bg-white/10 border border-white/15 px-6 py-4 text-sm text-white placeholder-white/40 outline-none transition-all focus:bg-white/15 focus:border-white/30"
              />
              <button type="submit" className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold tracking-wide text-forest shadow-lg transition-all hover:bg-cream hover:gap-3">
                {subscribed ? <><Check className="h-4 w-4" /> Obuna bo‘ldingiz</> : <>Obuna bo‘lish <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} /></>}
              </button>
            </form>

            <p className="mt-4 text-xs text-white/50" aria-live="polite">
              {subscribed ? 'Rahmat! Yangiliklarimizni yuborib boramiz.' : 'Spam yo‘q. Istalgan vaqtda bekor qilishingiz mumkin.'}
            </p>

            {/* Instagram CTA */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <a
                href="https://www.instagram.com/samarqand.melfisflowers/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                @samarqand.melfisflowers — Instagramda kuzating
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
