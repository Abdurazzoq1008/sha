import { useState, useEffect } from 'react';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Flower2,
  Sun,
  Moon,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useShop } from '../context/ShopContext';

const navLinks = [
  { name: 'Bosh sahifa', href: '#home' },
  { name: 'Do\'kon', href: '#shop' },
  { name: 'Kolleksiyalar', href: '#collections' },
  { name: 'Biz haqimizda', href: '#about' },
  { name: 'Aloqa', href: '#contact' },
];

function BrandLogo({ className = '', onClick }) {
  return (
    <a
      href="#home"
      aria-label="Melfis Flowers — bosh sahifa"
      onClick={onClick}
      className={`brand-link group relative flex h-12 w-[170px] shrink-0 items-center rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest sm:w-[210px] ${className}`}
    >
      <span className="brand-default inline-flex items-center gap-2">
        <Flower2
          className="brand-mark h-7 w-7 text-forest transition-colors duration-300 group-hover:text-rose-dark dark:text-emerald-400"
          strokeWidth={1.5}
        />
        <span className="brand-name font-display text-xl font-semibold tracking-wide sm:text-2xl">
          Melfis Flowers
        </span>
      </span>
      <img
        src="/images/melfis-logo.png"
        alt=""
        aria-hidden="true"
        className="brand-logo-image pointer-events-none absolute left-0 top-1/2 h-[72px] w-[150px] object-cover sm:w-[180px]"
      />
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const { favoritesOnly, setFavoritesOnly, setSearchQuery } = useShop();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileOpen]);

  const focusSearch = () => {
    setSearchQuery('');
    setMobileOpen(false);
    document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' });
    window.setTimeout(() => document.querySelector('#product-search')?.focus(), 450);
  };

  const toggleFavorites = () => {
    setFavoritesOnly((current) => !current);
    setMobileOpen(false);
    document.querySelector('#shop')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass shadow-sm dark:border-b dark:border-white/5 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
          {/* ── Logo ── */}
          <BrandLogo />

          {/* ── Desktop Links ── */}
          <ul className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="relative text-sm font-medium tracking-wide text-charcoal/80 dark:text-white/80 transition-colors hover:text-forest dark:hover:text-gold-light
                    after:absolute after:bottom-[-4px] after:left-0 after:h-[1.5px] after:w-0 after:bg-forest dark:after:bg-gold-light after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* ── Right Icons ── */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Tungi rejimni o'zgartirish"
              className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:bg-forest/5 dark:hover:bg-white/10 active:scale-90"
              title={isDark ? "Kunduzgi rejim" : "Tungi rejim"}
            >
              {isDark ? (
                <Sun className="h-[19px] w-[19px] text-amber-300 hover:rotate-45 transition-transform" strokeWidth={1.8} />
              ) : (
                <Moon className="h-[19px] w-[19px] text-charcoal/70 hover:-rotate-12 transition-transform" strokeWidth={1.8} />
              )}
            </button>

            <button
              aria-label="Qidirish"
              onClick={focusSearch}
              className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-forest/5 dark:hover:bg-white/10"
            >
              <Search className="h-[18px] w-[18px] text-charcoal/70 dark:text-white/70" strokeWidth={1.8} />
            </button>

            <button
              aria-label={favoritesOnly ? 'Barcha gullarni ko‘rish' : 'Sevimlilarni ko‘rish'}
              aria-pressed={favoritesOnly}
              onClick={toggleFavorites}
              className={`hidden sm:flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-forest/5 dark:hover:bg-white/10 ${favoritesOnly ? 'text-rose-dark dark:text-rose-300' : ''}`}
            >
              <Heart className="h-[18px] w-[18px] text-charcoal/70 dark:text-white/70" strokeWidth={1.8} />
            </button>

            <button
              aria-label="Savat"
              className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-forest/5 dark:hover:bg-white/10"
              onClick={() => setIsOpen(true)}
            >
              <ShoppingBag className="h-[18px] w-[18px] text-charcoal/70 dark:text-white/70" strokeWidth={1.8} />
              {totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-forest dark:bg-emerald-600 text-[10px] font-semibold text-white">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              aria-label="Menyu"
              className="flex lg:hidden h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-forest/5 dark:hover:bg-white/10"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5 text-charcoal/80 dark:text-white/80" strokeWidth={1.8} />
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile Menu Overlay ── */}
      <div
        className={`fixed inset-0 z-[60] bg-ivory dark:bg-[#121A16] transition-all duration-500 flex flex-col ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <BrandLogo onClick={() => setMobileOpen(false)} />
          <button
            aria-label="Yopish"
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-forest/5 dark:hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            <X className="h-5 w-5 text-charcoal/80 dark:text-white/80" strokeWidth={1.8} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col items-center justify-center gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-display text-4xl font-medium text-forest-dark dark:text-white transition-all duration-300 hover:text-gold dark:hover:text-gold-light"
              style={{
                transitionDelay: mobileOpen ? `${i * 60}ms` : '0ms',
                transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: mobileOpen ? 1 : 0,
              }}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-center gap-5 pb-10">
          <button
            onClick={toggleTheme}
            aria-label="Tungi rejim"
            className="h-12 w-12 flex items-center justify-center rounded-full bg-forest/5 dark:bg-white/10 text-forest dark:text-amber-300"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button type="button" aria-label="Qidirish" onClick={focusSearch} className="h-12 w-12 flex items-center justify-center rounded-full bg-forest/5 dark:bg-white/10 text-forest dark:text-white">
            <Search className="h-5 w-5" strokeWidth={1.8} />
          </button>
          <button type="button" aria-label="Sevimlilar" onClick={toggleFavorites} className="h-12 w-12 flex items-center justify-center rounded-full bg-forest/5 dark:bg-white/10 text-forest dark:text-white">
            <Heart className="h-5 w-5" strokeWidth={1.8} />
          </button>
          <button
            aria-label="Savat"
            className="h-12 w-12 flex items-center justify-center rounded-full bg-forest/5 dark:bg-white/10 text-forest dark:text-white relative"
            onClick={() => { setIsOpen(true); setMobileOpen(false); }}
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.8} />
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-forest text-[10px] font-semibold text-white">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
