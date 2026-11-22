import { Truck, Clock, Sparkles } from 'lucide-react';

const items = [
  { icon: Truck, text: 'Free same-day delivery on orders over $50' },
  { icon: Clock, text: 'Order before 2 PM for same-day delivery' },
  { icon: Sparkles, text: 'Winter Collection — Now available' },
];

export default function AnnouncementBar() {
  return (
    <div className="bg-forest text-white overflow-hidden">
      <div className="mx-auto flex items-center justify-center gap-8 px-6 py-2.5">
        {items.map((item, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 ${i > 0 ? 'hidden sm:flex' : ''}`}
          >
            <item.icon className="h-3.5 w-3.5 text-gold-light" strokeWidth={1.8} />
            <span className="text-[11px] font-medium tracking-wide">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

