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
