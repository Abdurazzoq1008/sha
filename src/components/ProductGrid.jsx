import { useMemo, useState } from 'react';
import { ArrowRight, Search, SlidersHorizontal } from 'lucide-react';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import { useShop } from '../context/ShopContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const filters = ['Barchasi', 'Buketlar', 'Atirgullar', 'To\'y', 'Mavsumiy', 'Quritilgan', 'Zamonaviy'];

export default function ProductGrid() {
  const [maxPrice, setMaxPrice] = useState(320000);
  const [sortBy, setSortBy] = useState('featured');
  const [ref, isVisible] = useScrollAnimation(0.05);
  const { favorites, searchQuery, setSearchQuery, category, setCategory, favoritesOnly } = useShop();

  const filtered = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();
    const result = products.filter((product) =>
      (category === 'All' || product.category === category)
      && product.price <= maxPrice
      && (!query || `${product.name} ${product.category} ${product.description}`.toLocaleLowerCase().includes(query))
      && (!favoritesOnly || favorites.includes(product.id)),
    );
    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'name') result.sort((a, b) => a.name.localeCompare(b.name, 'uz'));
    return result;
  }, [category, favorites, favoritesOnly, maxPrice, searchQuery, sortBy]);

  const clearFilters = () => {
    setCategory('All');
    setSearchQuery('');
    setFavoritesOnly(false);
    setMaxPrice(320000);
    setSortBy('featured');
  };

  return (
    <section id="shop" className="py-24 lg:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* ── Header ── */}
        <div
          className={`flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold dark:text-amber-300">
              Siz uchun tanlangan
            </span>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-semibold text-forest-dark dark:text-white leading-tight">
              Bizning kolleksiya
            </h2>
            <p className="mt-3 max-w-md text-warm-gray dark:text-neutral-400 leading-relaxed">
              Har bir buket eng yangi mavsumiy gullardan qo'lda yasalgan,
              har qanday maydonga quvonch va nafislik olib kelish uchun mo'ljallangan.
            </p>
          </div>

          <a
            href="#shop"
            onClick={clearFilters}
            className="group flex items-center gap-2 text-sm font-semibold text-forest dark:text-emerald-400 hover:text-forest-dark dark:hover:text-emerald-300 transition-colors shrink-0"
          >
            Barchasini ko'rish
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
          </a>
        </div>

        {/* ── Filters ── */}
        <div
          className={`flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-10 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {filters.map((f) => {
            const value = f === 'Barchasi' ? 'All' : f;
            return (
            <button
              key={f}
              type="button"
              aria-pressed={category === value}
              onClick={() => setCategory(value)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 ${
              category === value
                  ? 'bg-forest dark:bg-emerald-600 text-white shadow-md shadow-forest/15'
                  : 'bg-white/70 dark:bg-white/5 text-charcoal/60 dark:text-white/70 hover:bg-white dark:hover:bg-white/10 hover:text-charcoal dark:hover:text-white border border-charcoal/5 dark:border-white/10'
              }`}
            >
              {f}
            </button>
            );
          })}
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:flex lg:items-center">
          <label className="relative col-span-2 sm:col-span-1">
          <span className="sr-only">Gullarni qidirish</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-warm-gray" />
          <input id="product-search" type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Gul qidirish" className="control-input pl-9 dark:border-white/15 dark:bg-white/5 dark:text-white" />
          </label>
          <label className="relative">
          <span className="sr-only">Saralash</span>
          <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-warm-gray" />
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="control-input pl-9 dark:border-white/15 dark:bg-[#1A251F] dark:text-white">
            <option value="featured">Tavsiya etilgan</option>
            <option value="price-low">Narx: arzonidan</option>
            <option value="price-high">Narx: qimmatidan</option>
            <option value="name">Nomi: A dan Z gacha</option>
          </select>
          </label>
          <label className="flex items-center gap-2 text-xs text-charcoal/70 dark:text-white/70 sm:col-span-1">
          <span className="whitespace-nowrap">{maxPrice.toLocaleString('uz-UZ')} so‘mgacha</span>
          <input type="range" min="120000" max="320000" step="10000" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} aria-label="Eng yuqori narx" className="w-full accent-forest lg:w-24" />
          </label>
        </div>

        <p className="mb-5 text-xs text-warm-gray dark:text-neutral-400" aria-live="polite">{filtered.length} ta buket{favoritesOnly ? ' sevimlilarda' : ''}</p>
        {filtered.length ? <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-7">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div> : <div className="rounded-3xl bg-white/70 px-6 py-16 text-center dark:bg-[#1A251F]">
          <p className="font-display text-2xl text-forest-dark dark:text-white">{favoritesOnly && favorites.length === 0 ? 'Sevimlilar ro‘yxatingiz hozircha bo‘sh.' : 'Mos gullar topilmadi.'}</p>
          <p className="mt-2 text-sm text-warm-gray dark:text-neutral-400">Qidiruv so‘zini yoki filtrlarni o‘zgartirib ko‘ring.</p>
          <button type="button" onClick={clearFilters} className="mt-5 text-sm font-semibold text-forest underline underline-offset-4 dark:text-emerald-300">Filtrlarni tozalash</button>
        </div>}
      </div>
    </section>
  );
}
