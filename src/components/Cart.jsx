import { useEffect, useState } from 'react';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const [checkoutNotice, setCheckoutNotice] = useState(false);
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalItems, totalPrice } =
    useCart();

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [setIsOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm transition-opacity duration-400 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`fixed right-0 top-0 z-[80] h-full w-full max-w-md bg-ivory dark:bg-[#141E19] text-charcoal dark:text-white shadow-2xl transition-transform duration-500 ease-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Savat"
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-charcoal/5 dark:border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-forest dark:text-emerald-400" strokeWidth={1.8} />
            <h2 className="font-display text-xl font-semibold text-forest-dark dark:text-white">
              Savatingiz
            </h2>
            <span className="rounded-full bg-forest/10 dark:bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-forest dark:text-emerald-300">
              {totalItems}
            </span>
          </div>
          <button
            type="button"
            aria-label="Savatni yopish"
            onClick={() => setIsOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-forest/5 dark:hover:bg-white/10"
          >
            <X className="h-5 w-5 text-charcoal/60 dark:text-white/60" strokeWidth={1.8} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cream dark:bg-white/5">
                <ShoppingBag className="h-8 w-8 text-warm-gray dark:text-neutral-400" strokeWidth={1.5} />
              </div>
              <p className="font-display text-lg font-medium text-charcoal/60 dark:text-neutral-300">
                Savatingiz bo'sh
              </p>
              <p className="text-sm text-warm-gray dark:text-neutral-400">
                Go'zal gullardan qo'shib boshlang.
              </p>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="mt-2 inline-flex items-center gap-2 rounded-full bg-forest dark:bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-forest-dark dark:hover:bg-emerald-500"
              >
                Xarid qilishni davom ettirish
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-5">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-4 rounded-2xl bg-white dark:bg-[#1E2B24] p-4 shadow-sm border border-transparent dark:border-white/5"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-20 shrink-0 rounded-xl object-cover"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-charcoal dark:text-white">
                        {item.name}
                      </h3>
                      <p className="text-xs text-warm-gray dark:text-neutral-400">{item.category}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          aria-label={`${item.name} miqdorini kamaytirish`}
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-charcoal/10 dark:border-white/10 transition-colors hover:bg-cream dark:hover:bg-white/10"
                        >
                          <Minus className="h-3 w-3" strokeWidth={2} />
                        </button>
                        <span className="w-6 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`${item.name} miqdorini oshirish`}
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-charcoal/10 dark:border-white/10 transition-colors hover:bg-cream dark:hover:bg-white/10"
                        >
                          <Plus className="h-3 w-3" strokeWidth={2} />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-forest-dark dark:text-emerald-300">
                          {(item.price * item.quantity).toLocaleString()} so'm
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label={`${item.name}ni savatdan olib tashlash`}
                          className="text-warm-gray hover:text-rose-dark transition-colors"
                        >
                          <X className="h-4 w-4" strokeWidth={1.8} />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-charcoal/5 dark:border-white/10 px-6 py-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-warm-gray dark:text-neutral-400">Jami</span>
              <span className="text-sm font-semibold text-charcoal dark:text-white">
                {totalPrice.toLocaleString()} so'm
              </span>
            </div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-warm-gray dark:text-neutral-400">Yetkazib berish</span>
              <span className="text-sm font-medium text-forest dark:text-emerald-400">Bepul</span>
            </div>
            <button type="button" onClick={() => setCheckoutNotice(true)} className="group flex w-full items-center justify-center gap-3 rounded-full bg-forest dark:bg-emerald-600 py-4 text-sm font-semibold tracking-wide text-white shadow-lg shadow-forest/20 transition-all hover:bg-forest-dark dark:hover:bg-emerald-500 hover:shadow-xl">
              Buyurtma berish — {totalPrice.toLocaleString()} so'm
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
            </button>
            {checkoutNotice && (
              <p className="mt-3 text-center text-xs leading-5 text-warm-gray dark:text-neutral-400" role="status">
                Buyurtma berish uchun <a className="font-semibold text-forest underline underline-offset-2 dark:text-emerald-300" href="https://www.instagram.com/samarqand.melfisflowers/" target="_blank" rel="noreferrer">Instagram orqali bog‘laning</a>.
              </p>
            )}
            <p className="mt-3 text-center text-xs text-warm-gray dark:text-neutral-400">
              150,000 so'mdan ortiq buyurtmalarga bepul yetkazib berish
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
