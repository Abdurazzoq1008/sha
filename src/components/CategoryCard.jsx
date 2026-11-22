import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { useShop } from '../context/ShopContext';

export default function CategoryCard({ category }) {
  const [loaded, setLoaded] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0, radius: 0, active: false });
  const { setCategory } = useShop();

  const handlePointerMove = (event) => {
    if (event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: (event.clientX - bounds.left) / bounds.width,
      y: (event.clientY - bounds.top) / bounds.height,
      radius: Math.min(bounds.width, bounds.height) * 0.42,
      active: true,
    });
  };

  return (
    <a
      href="#shop"
      onClick={() => setCategory(category.name)}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setPointer((current) => ({ ...current, active: false }))}
      className="group relative flex flex-col justify-end overflow-hidden rounded-3xl aspect-[4/5] bg-cream shadow-sm transition-[box-shadow] duration-500 hover:shadow-2xl hover:shadow-forest/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
      aria-label={`Shop ${category.name}: ${category.description}`}
      style={{
        transform: pointer.active ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'transform 450ms ease, box-shadow 500ms ease',
      }}
    >
      <img
        src={category.image}
        alt={category.name}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-[opacity,filter] duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: pointer.active
            ? 'scale(1.06)'
            : 'scale(1)',
          transition: 'transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1)',
        }}
      />

      <img
        src={category.image}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{
          clipPath: `circle(${pointer.active ? pointer.radius : 0}px at ${pointer.x * 100}% ${pointer.y * 100}%)`,
          filter: 'brightness(1.12) saturate(1.25)',
          transition: pointer.active ? 'clip-path 180ms ease-out' : 'clip-path 420ms ease-in',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent transition-colors duration-500 group-hover:from-black/70" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute z-10 rounded-full border border-white/70 opacity-0 shadow-[0_0_30px_rgba(255,255,255,0.18)] transition-[left,top,width,height,opacity] duration-200 group-hover:opacity-100"
        style={{
          left: `${pointer.x * 100}%`,
          top: `${pointer.y * 100}%`,
          width: `${pointer.radius * 2}px`,
          height: `${pointer.radius * 2}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div className="relative z-20 p-6 lg:p-8">
        <div className="flex items-end justify-between">
          <div>
            <h3 className="font-display text-2xl lg:text-3xl font-semibold text-white transition-transform duration-300 group-hover:-translate-y-1">
              {category.name}
            </h3>
            <p className="mt-1 text-xs text-white/80 transition-opacity duration-300 group-hover:text-white sm:text-sm">{category.description}</p>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-white/35">
            <ArrowUpRight className="h-5 w-5 text-white transition-transform duration-300 group-hover:rotate-45" strokeWidth={1.8} />
          </div>
        </div>
      </div>
    </a>
  );
}

