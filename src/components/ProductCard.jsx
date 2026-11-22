import { Heart, ShoppingBag, Sparkles, Star } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useShop } from '../context/ShopContext';

export default function ProductCard({ product, index = 0 }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { addItem } = useCart();
  const { favorites, toggleFavorite } = useShop();
  const liked = favorites.includes(product.id);

  const tagColors = {
    'Eng ko\'p sotilgan': 'bg-forest dark:bg-emerald-700 text-white',
    Yangi: 'bg-gold dark:bg-amber-600 text-white',
    Mashhur: 'bg-rose dark:bg-rose-700 text-white',
    Cheklangan: 'bg-charcoal dark:bg-neutral-700 text-white',
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      className="group relative flex flex-col"
      style={{
        animationDelay: `${index * 80}ms`,
        transform: isHovered
          ? `perspective(800px) rotateY(${mousePos.x * 0.3}deg) rotateX(${-mousePos.y * 0.3}deg) translateY(-8px) scale(1.02)`
          : 'perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0px) scale(1)',
        transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Glow effect behind card ── */}
      <div
        className="absolute -inset-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
        style={{
          background: 'radial-gradient(circle at center, rgba(45,74,62,0.15) 0%, transparent 70%)',
        }}
      />

      {/* ── Image Container ── */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-cream dark:bg-[#1A2620]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-700 ease-out ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            transform: isHovered
              ? `scale(1.08) translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)`
              : 'scale(1) translate(0px, 0px)',
            transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
          }}
        />

        {/* Shimmer overlay on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: isHovered
              ? `radial-gradient(circle at ${50 + mousePos.x * 2}% ${50 + mousePos.y * 2}%, rgba(255,255,255,0.2) 0%, transparent 60%)`
              : 'none',
          }}
        />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Tag */}
        {product.tag && (
          <span
            className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-semibold tracking-wider uppercase transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg ${
              tagColors[product.tag] || 'bg-forest text-white'
            }`}
          >
            {product.tag}
          </span>
        )}

        {/* Favourite Button */}
        <button
          type="button"
          aria-label={liked ? `${product.name}ni sevimlilardan olib tashlash` : `${product.name}ni sevimlilarga qo‘shish`}
          aria-pressed={liked}
          onClick={() => toggleFavorite(product.id)}
          className={`absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-sm shadow-sm transition-all duration-300 hover:bg-white dark:hover:bg-black/90 ${
            liked ? 'scale-110 ring-2 ring-rose/30' : 'hover:scale-110'
          }`}
        >
          <Heart
            className={`h-4 w-4 transition-all duration-300 ${
              liked ? 'fill-rose text-rose scale-110' : 'text-charcoal/70 dark:text-white/80'
            }`}
            strokeWidth={1.8}
          />
        </button>

        {/* Quick actions on hover */}
        <div className="absolute bottom-4 left-4 right-4 flex translate-y-0 gap-2 opacity-100 transition-all duration-500 ease-out sm:translate-y-6 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
          <button
            type="button"
            onClick={() => addItem(product)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/95 dark:bg-[#1E2C24]/95 backdrop-blur-sm py-3 text-xs font-semibold tracking-wide text-charcoal dark:text-white transition-all hover:bg-white dark:hover:bg-[#25372D] shadow-lg hover:shadow-xl active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest"
          >
            <ShoppingBag className="h-3.5 w-3.5" strokeWidth={2} />
            Savatga
          </button>
        </div>

        {/* Sparkle indicator on hover */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
          <Sparkles className="h-4 w-4 text-gold dark:text-amber-300 animate-pulse" strokeWidth={1.5} />
        </div>
      </div>

      {/* ── Info ── */}
      <div className="mt-4 flex flex-col gap-1 transition-all duration-300 group-hover:translate-x-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-charcoal dark:text-white group-hover:text-forest dark:group-hover:text-emerald-400 transition-colors duration-300">
              {product.name}
            </h3>
            <p className="text-xs text-warm-gray dark:text-neutral-400 mt-0.5">{product.category}</p>
          </div>
          <div className="shrink-0 text-right">
            <span className="text-sm font-semibold text-forest-dark dark:text-emerald-300 group-hover:text-forest transition-colors duration-300">
              {product.price.toLocaleString()} so'm
            </span>
            {product.originalPrice && (
              <span className="text-xs text-warm-gray dark:text-neutral-500 line-through">
                {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
        <div className="mt-2 flex items-center gap-1 text-[11px] text-warm-gray dark:text-neutral-400" aria-label="5 yulduzdan 4.9">
          <Star className="h-3 w-3 fill-gold text-gold" strokeWidth={0} />
          <span>{product.rating || '4.9'}</span>
        </div>
      </div>
    </div>
  );
}
