import { Clock3, Flower2, MapPin } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const footerLinks = {
  'Do\'kon': ['Barcha gullar', 'Buketlar', 'Atirgullar', 'To\'y', 'Mavsumiy', 'Quritilgan'],
  'Kompaniya': ['Biz haqimizda', 'Bizning hikoyamiz', 'Instagram'],
  'Yordam': ['Aloqa', 'Buyurtma berish', 'Yetkazib berish'],
};
const categoryByLink = { 'Barcha gullar': 'All', Buketlar: 'Buketlar', Atirgullar: 'Atirgullar', "To'y": "To'y", Mavsumiy: 'Mavsumiy', Quritilgan: 'Quritilgan' };

/* Simple SVG social icons */
function InstagramIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TelegramIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  );
}

function PhoneIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export default function Footer() {
  const { setCategory, setSearchQuery, setFavoritesOnly } = useShop();

  return (
    <footer className="bg-forest-dark text-white/70">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Main */}
        <div className="grid gap-12 py-16 lg:py-20 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <Flower2 className="h-7 w-7 text-gold-light" strokeWidth={1.5} />
              <span className="font-display text-2xl font-semibold tracking-wide text-white">
                Melfis Flowers
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-white/50">
              San'atkorona ishlab chiqilgan gul dizaynlari eshigingizgacha yetkaziladi.
              Samarqanddagi premium gullar — buyurtmalar 24/7 qabul qilinadi.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.instagram.com/samarqand.melfisflowers/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-all hover:bg-white/10 hover:scale-110"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-4 w-4 text-white/60" />
              </a>
              <a
                href="https://t.me/Melfis_flowers"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-all hover:bg-white/10 hover:scale-110"
                aria-label="Telegram"
              >
                <TelegramIcon className="h-4 w-4 text-white/60" />
              </a>
              <a
                href="tel:+998700390719"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-all hover:bg-white/10 hover:scale-110"
                aria-label="Telefon"
              >
                <PhoneIcon className="h-4 w-4 text-white/60" />
              </a>
            </div>
            <div className="mt-6 flex max-w-sm flex-col gap-3 text-xs leading-5 text-white/55">
              <a className="flex items-start gap-2 transition-colors hover:text-white" href="https://maps.google.com/?q=Melfis+Flowers+Samarqand+Pavarot+chorrahasi" target="_blank" rel="noopener noreferrer">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-light" /> Samarqand, Pavarot chorrahasi
              </a>
              <p className="flex items-start gap-2"><Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-gold-light" /> Buyurtmalar 24/7 qabul qilinadi</p>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold tracking-wide text-white mb-5">
                {title}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href={title === 'Do\'kon'
                        ? '#shop'
                        : title === 'Kompaniya'
                          ? link === 'Instagram' ? 'https://www.instagram.com/samarqand.melfisflowers/' : '#about'
                          : link === 'Aloqa' ? '#contact' : 'https://t.me/Melfis_flowers'}
                      onClick={title === 'Do\'kon' ? () => {
                        setCategory(categoryByLink[link] || 'All');
                        if (link === 'Barcha gullar') {
                          setSearchQuery('');
                          setFavoritesOnly(false);
                        }
                      } : undefined}
                      target={(title === 'Kompaniya' && link === 'Instagram') || (title === 'Yordam' && link !== 'Aloqa') ? '_blank' : undefined}
                      rel={(title === 'Kompaniya' && link === 'Instagram') || (title === 'Yordam' && link !== 'Aloqa') ? 'noopener noreferrer' : undefined}
                      className="text-sm text-white/40 transition-colors hover:text-white/70"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 py-8">
          <p className="text-xs text-white/30">
            © 2026 Melfis Flowers. Barcha huquqlar himoyalangan. Samarqand, O'zbekiston.
          </p>
          <div className="flex gap-6 text-xs text-white/30">
            <a href="https://www.instagram.com/samarqand.melfisflowers/" target="_blank" rel="noopener noreferrer" className="hover:text-white/50 transition-colors">Instagram</a>
            <a href="https://t.me/Melfis_flowers" target="_blank" rel="noopener noreferrer" className="hover:text-white/50 transition-colors">Telegram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
