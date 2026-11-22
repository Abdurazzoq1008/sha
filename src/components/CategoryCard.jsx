import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { useShop } from '../context/ShopContext';

export default function CategoryCard({ category }) {
  const [loaded, setLoaded] = useState(false);
  const { setCategory } = useShop();

  return (
    <a
      href="#shop"
      onClick={() => setCategory(category.name)}
      className="group relative flex flex-col justify-end overflow-hidden rounded-3xl aspect-[4/5] bg-cream"
      aria-label={`Shop ${category.name}: ${category.description}`}
    >
      {/* Image */}
      <img
        src={category.image}
        alt={category.name}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-110 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      {/* Content */}
      <div className="relative p-6 lg:p-8">
        <div className="flex items-end justify-between">
          <div>
            <h3 className="font-display text-2xl lg:text-3xl font-semibold text-white">
              {category.name}
            </h3>
            <p className="mt-1 text-xs text-white/80 sm:text-sm">{category.description}</p>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110">
            <ArrowUpRight className="h-5 w-5 text-white" strokeWidth={1.8} />
          </div>
        </div>
      </div>
    </a>
  );
}

