import { useEffect, useState } from 'react';

// Floating flower petal SVG component
function FloatingPetal({ style, variant = 0 }) {
  const petals = [
    // Oval soft rose petal
    <path
      d="M20 5 C30 5, 38 15, 35 30 C32 45, 20 55, 20 55 C20 55, 8 45, 5 30 C2 15, 10 5, 20 5 Z"
      fill="currentColor"
    />,
    // Slightly curved leaf/petal
    <path
      d="M10 50 C10 25, 25 10, 50 10 C50 35, 35 50, 10 50 Z"
      fill="currentColor"
    />,
    // Slender blossom petal
    <path
      d="M25 0 C35 15, 40 35, 25 50 C10 35, 15 15, 25 0 Z"
      fill="currentColor"
    />
  ];

  return (
    <svg
      viewBox="0 0 50 60"
      className="absolute pointer-events-none transition-transform"
      style={style}
    >
      {petals[variant % petals.length]}
    </svg>
  );
}

export default function BackgroundDecor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Soft cursor follower effect on mousemove
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Pre-configured floating petals with varied trajectories
  const fallingPetals = [
    { left: '8%', size: 24, duration: 22, delay: 0, opacity: 0.12, variant: 0, color: 'text-rose-dark dark:text-rose' },
    { left: '22%', size: 18, duration: 28, delay: 5, opacity: 0.08, variant: 1, color: 'text-forest dark:text-emerald-400' },
    { left: '38%', size: 28, duration: 25, delay: 11, opacity: 0.14, variant: 2, color: 'text-gold dark:text-amber-300' },
    { left: '55%', size: 20, duration: 32, delay: 3, opacity: 0.1, variant: 0, color: 'text-rose dark:text-rose' },
    { left: '72%', size: 26, duration: 24, delay: 8, opacity: 0.15, variant: 1, color: 'text-forest-light dark:text-emerald-300' },
    { left: '88%', size: 22, duration: 29, delay: 14, opacity: 0.09, variant: 2, color: 'text-gold-light dark:text-amber-200' },
    { left: '94%', size: 16, duration: 35, delay: 2, opacity: 0.08, variant: 0, color: 'text-rose-dark dark:text-rose' },
    { left: '15%', size: 25, duration: 27, delay: 17, opacity: 0.11, variant: 1, color: 'text-gold dark:text-amber-300' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      {/* ── Soft Interactive Parallax Orb ── */}
      <div
        className="absolute top-1/4 left-1/3 w-[550px] h-[550px] rounded-full blur-3xl opacity-30 dark:opacity-20 transition-transform duration-1000 ease-out"
        style={{
          transform: `translate(${mousePos.x * 1.5}px, ${mousePos.y * 1.5}px)`,
          background: 'radial-gradient(circle, rgba(201, 169, 110, 0.22) 0%, rgba(212, 166, 154, 0.12) 45%, transparent 70%)',
        }}
      />

      {/* ── Giant Aurora Ambient Blobs ── */}
      <div
        className="absolute -top-48 -right-48 w-[850px] h-[850px] rounded-full opacity-[0.06] dark:opacity-[0.14] animate-float-slow blur-2xl"
        style={{
          background: 'radial-gradient(circle, #2D4A3E 0%, #1E3329 50%, transparent 75%)',
        }}
      />
      <div
        className="absolute top-[35%] -left-64 w-[750px] h-[750px] rounded-full opacity-[0.05] dark:opacity-[0.12] animate-float-reverse blur-2xl"
        style={{
          background: 'radial-gradient(circle, #C9A96E 0%, #D4A69A 50%, transparent 75%)',
        }}
      />
      <div
        className="absolute bottom-[-15%] right-[-10%] w-[900px] h-[900px] rounded-full opacity-[0.06] dark:opacity-[0.15] animate-float-slow blur-3xl"
        style={{
          background: 'radial-gradient(circle, #2D4A3E 0%, #C9A96E 40%, transparent 75%)',
          animationDelay: '4s',
        }}
      />

      {/* ── Falling & Swaying Botanical Petals ── */}
      {fallingPetals.map((petal, i) => (
        <div
          key={i}
          className={`absolute animate-fall-petal ${petal.color}`}
          style={{
            left: petal.left,
            top: '-80px',
            width: `${petal.size}px`,
            height: `${petal.size * 1.2}px`,
            opacity: petal.opacity,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
          }}
        >
          <FloatingPetal variant={petal.variant} />
        </div>
      ))}

      {/* ── Geometric Decorative Botanical Mandalas ── */}
      <svg
        className="absolute top-28 right-[12%] w-36 h-36 text-forest/[0.04] dark:text-emerald-400/[0.07] animate-spin-very-slow"
        viewBox="0 0 100 100"
        fill="currentColor"
        style={{ transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)` }}
      >
        <ellipse cx="50" cy="25" rx="10" ry="25" />
        <ellipse cx="50" cy="25" rx="10" ry="25" transform="rotate(45 50 50)" />
        <ellipse cx="50" cy="25" rx="10" ry="25" transform="rotate(90 50 50)" />
        <ellipse cx="50" cy="25" rx="10" ry="25" transform="rotate(135 50 50)" />
        <ellipse cx="50" cy="25" rx="10" ry="25" transform="rotate(180 50 50)" />
        <ellipse cx="50" cy="25" rx="10" ry="25" transform="rotate(225 50 50)" />
        <ellipse cx="50" cy="25" rx="10" ry="25" transform="rotate(270 50 50)" />
        <ellipse cx="50" cy="25" rx="10" ry="25" transform="rotate(315 50 50)" />
        <circle cx="50" cy="50" r="7" className="text-gold/[0.15]" />
      </svg>

      <svg
        className="absolute top-[55%] left-[5%] w-48 h-48 text-gold/[0.05] dark:text-amber-300/[0.07] animate-spin-very-slow-reverse"
        viewBox="0 0 100 100"
        fill="currentColor"
        style={{ transform: `translate(${mousePos.x * 0.7}px, ${mousePos.y * 0.7}px)` }}
      >
        <ellipse cx="50" cy="18" rx="8" ry="18" />
        <ellipse cx="50" cy="18" rx="8" ry="18" transform="rotate(60 50 50)" />
        <ellipse cx="50" cy="18" rx="8" ry="18" transform="rotate(120 50 50)" />
        <ellipse cx="50" cy="18" rx="8" ry="18" transform="rotate(180 50 50)" />
        <ellipse cx="50" cy="18" rx="8" ry="18" transform="rotate(240 50 50)" />
        <ellipse cx="50" cy="18" rx="8" ry="18" transform="rotate(300 50 50)" />
      </svg>

      <svg
        className="absolute bottom-[18%] right-[8%] w-32 h-32 text-rose/[0.05] dark:text-rose/[0.08] animate-spin-very-slow"
        viewBox="0 0 100 100"
        fill="currentColor"
        style={{ animationDelay: '6s', transform: `translate(${mousePos.x * -0.4}px, ${mousePos.y * -0.4}px)` }}
      >
        <ellipse cx="50" cy="22" rx="13" ry="22" />
        <ellipse cx="50" cy="22" rx="13" ry="22" transform="rotate(72 50 50)" />
        <ellipse cx="50" cy="22" rx="13" ry="22" transform="rotate(144 50 50)" />
        <ellipse cx="50" cy="22" rx="13" ry="22" transform="rotate(216 50 50)" />
        <ellipse cx="50" cy="22" rx="13" ry="22" transform="rotate(288 50 50)" />
      </svg>

      {/* ── Modern Mesh Dot Matrix ── */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1.2px, transparent 1.2px)',
          backgroundSize: '44px 44px',
        }}
      />
    </div>
  );
}
