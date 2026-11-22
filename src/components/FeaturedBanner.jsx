import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function BannerCard({ image, alt, eyebrow, title, action }) {
  const [pointer, setPointer] = useState({ x: 0, y: 0, active: false });
  const handlePointerMove = (event) => {
    if (event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: (event.clientX - bounds.left) / bounds.width,
      y: (event.clientY - bounds.top) / bounds.height,
      active: true,
    });
  };
  return (
    <article
      className="group relative flex min-h-[400px] items-end overflow-hidden rounded-3xl bg-cream p-8 shadow-sm transition-shadow duration-500 hover:shadow-2xl hover:shadow-forest/20 lg:min-h-[480px] lg:p-12"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setPointer({ x: 0, y: 0, active: false })}
      style={{
        transform: pointer.active ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 500ms ease, box-shadow 500ms ease',
      }}
    >
      <img
        src={image}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          transform: pointer.active
            ? `scale(1.08) translate3d(${(0.5 - pointer.x) * 28}px, ${(0.5 - pointer.y) * 28}px, 0)`
            : 'scale(1.02) translate3d(0, 0, 0)',
          transition: pointer.active ? 'transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1)' : 'transform 1100ms ease',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: pointer.active
            ? `radial-gradient(circle at ${pointer.x * 100}% ${pointer.y * 100}%, rgba(232,213,168,0.28), transparent 38%), linear-gradient(110deg, transparent ${pointer.x * 100 - 12}%, rgba(255,255,255,0.14) ${pointer.x * 100}%, transparent ${pointer.x * 100 + 12}%)`
            : 'transparent',
        }}
      />
      <div
        className="relative z-10"
        style={{
          transform: pointer.active
            ? `translate3d(${(pointer.x - 0.5) * 7}px, ${(pointer.y - 0.5) * 7}px, 0)`
            : 'translate3d(0, 0, 0)',
          transition: 'transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1)',
        }}
      >
        <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm transition-colors duration-300 group-hover:bg-white/30">
          {eyebrow}
        </span>
        <h3 className="font-display text-3xl font-semibold leading-tight text-white transition-transform duration-300 group-hover:-translate-y-1 lg:text-4xl">
          {title}
        </h3>
        <a
          href="#shop"
          className="group/link mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          {action}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" strokeWidth={2} />
        </a>
      </div>
    </article>
  );
}

export default function FeaturedBanner() {
  const [ref, isVisible] = useScrollAnimation(0.1);
  const cards = [
    { image: '/images/wedding.jpg', alt: "To'y kolleksiyasi", eyebrow: "To'y mavsumi", title: <>Kelin va<br />marosim gullari</>, action: "Kolleksiyani ko'rish" },
    { image: '/images/rose.jpg', alt: "Sovg'a kolleksiyasi", eyebrow: "Mukammal sovg'a", title: <>Har qanday munosabat<br />uchun atirgullar</>, action: "Atirgullarni ko'rish" },
  ];

  return (
    <section className="py-24 lg:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div
          className={`grid gap-6 transition-all duration-700 lg:grid-cols-2 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {cards.map((card) => <BannerCard key={card.eyebrow} {...card} />)}
        </div>
      </div>
    </section>
  );
}
