import { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Categories from './components/Categories';
import FeaturedBanner from './components/FeaturedBanner';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import Cart from './components/Cart';
import BackgroundDecor from './components/BackgroundDecor';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { ShopProvider } from './context/ShopContext';

export default function App() {
  const activeButton = useRef(null);

  useEffect(() => {
    const resetButton = (button) => {
      button.style.removeProperty('--button-cursor-x');
      button.style.removeProperty('--button-cursor-y');
      button.style.removeProperty('--button-magnetic-x');
      button.style.removeProperty('--button-magnetic-y');
    };

    const handlePointerMove = (event) => {
      if (event.pointerType !== 'mouse') return;
      const button = event.target instanceof Element
        ? event.target.closest('button:not(:disabled)')
        : null;

      if (activeButton.current && activeButton.current !== button) {
        resetButton(activeButton.current);
      }
      activeButton.current = button;
      if (!button) return;

      const bounds = button.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      button.style.setProperty('--button-cursor-x', `${x * 100}%`);
      button.style.setProperty('--button-cursor-y', `${y * 100}%`);
      button.style.setProperty('--button-magnetic-x', `${(x - 0.5) * 5}px`);
      button.style.setProperty('--button-magnetic-y', `${(y - 0.5) * 5}px`);
    };

    document.addEventListener('pointermove', handlePointerMove);
    return () => document.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return (
    <ThemeProvider>
      <ShopProvider>
        <CartProvider>
          <div className="relative isolate min-h-screen transition-colors duration-400 selection:bg-rose selection:text-white">
            <BackgroundDecor />
            <Navbar />
            <main className="relative z-10">
              <Hero />
              <Categories />
              <ProductGrid />
              <FeaturedBanner />
              <About />
              <Testimonials />
              <Newsletter />
            </main>
            <div className="relative z-10"><Footer /></div>
            <Cart />
          </div>
        </CartProvider>
      </ShopProvider>
    </ThemeProvider>
  );
}
