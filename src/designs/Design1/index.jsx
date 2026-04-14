/**
 * Design 1 — Modern Classic (Shake Shack Green + Glassmorphism)
 * Deep green bg, frosted glass podium cards, gold/silver/bronze glows,
 * faded food emoji background, hero + podium in 100vh.
 */
import { motion } from 'framer-motion';
import { Crown, Mic2, Clock } from 'lucide-react';

// ─── helpers ────────────────────────────────────────────────────────────────

function initials(name) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

// ─── Podium config ───────────────────────────────────────────────────────────

const PCFG = {
  1: {
    glow: '0 0 40px rgba(245,197,24,0.55), 0 0 0 1.5px rgba(245,197,24,0.6)',
    border: 'rgba(245,197,24,0.5)',
    avatarGlow: '0 0 0 3px rgba(245,197,24,0.7)',
    rankColor: '#F5C518',
    timeColor: '#FEF08A',
    pedestalH: 130,
    w: 144,
    avatarW: 56,
    nameSz: 15,
    flagSz: 20,
    timeSz: 22,
    foodEmoji: '🍔',
    showCrown: true,
    emojiSz: 28,
  },
  2: {
    glow: '0 0 28px rgba(209,213,219,0.45), 0 0 0 1.5px rgba(209,213,219,0.5)',
    border: 'rgba(209,213,219,0.45)',
    avatarGlow: '0 0 0 3px rgba(209,213,219,0.6)',
    rankColor: '#D1D5DB',
    timeColor: '#F3F4F6',
    pedestalH: 100,
    w: 118,
    avatarW: 44,
    nameSz: 14,
    flagSz: 18,
    timeSz: 17,
    foodEmoji: '🥤',
    showCrown: false,
    emojiSz: 22,
  },
  3: {
    glow: '0 0 28px rgba(205,127,50,0.45), 0 0 0 1.5px rgba(205,127,50,0.5)',
    border: 'rgba(205,127,50,0.45)',
    avatarGlow: '0 0 0 3px rgba(205,127,50,0.6)',
    rankColor: '#CD7F32',
    timeColor: '#FED7AA',
    pedestalH: 76,
    w: 106,
    avatarW: 38,
    nameSz: 13,
    flagSz: 17,
    timeSz: 15,
    foodEmoji: '🍟',
    showCrown: false,
    emojiSz: 18,
  },
  4: {
    glow: '0 0 20px rgba(147,197,253,0.35), 0 0 0 1px rgba(147,197,253,0.4)',
    border: 'rgba(147,197,253,0.4)',
    avatarGlow: '0 0 0 2px rgba(147,197,253,0.5)',
    rankColor: '#93C5FD',
    timeColor: '#DBEAFE',
    pedestalH: 54,
    w: 94,
    avatarW: 34,
    nameSz: 12,
    flagSz: 16,
    timeSz: 13,
    foodEmoji: '🍦',
    showCrown: false,
    emojiSz: 15,
  },
  5: {
    glow: '0 0 20px rgba(249,168,212,0.35), 0 0 0 1px rgba(249,168,212,0.4)',
    border: 'rgba(249,168,212,0.4)',
    avatarGlow: '0 0 0 2px rgba(249,168,212,0.5)',
    rankColor: '#F9A8D4',
    timeColor: '#FCE7F3',
    pedestalH: 44,
    w: 94,
    avatarW: 32,
    nameSz: 12,
    flagSz: 16,
    timeSz: 12,
    foodEmoji: '🌭',
    showCrown: false,
    emojiSz: 14,
  },
};

// ─── PodiumCard ──────────────────────────────────────────────────────────────

function PodiumCard({ entry, delay }) {
  const c = PCFG[entry.rank];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 100, damping: 16 }}
      className="flex flex-col items-center shrink-0"
      style={{ width: c.w }}
    >
      {/* Info above pedestal */}
      <div className="flex flex-col items-center w-full pb-2 px-1 gap-1.5">
        {c.showCrown && (
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Crown size={22} style={{ color: '#F5C518', fill: '#F5C518', filter: 'drop-shadow(0 0 8px rgba(245,197,24,0.8))' }} />
          </motion.div>
        )}

        {/* Food emoji topper */}
        <div style={{ fontSize: c.emojiSz, lineHeight: 1, filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.3))' }}>
          {c.foodEmoji}
        </div>

        {/* Avatar — glass circle */}
        <div
          className="rounded-full flex items-center justify-center font-black select-none"
          style={{
            width: c.avatarW, height: c.avatarW,
            fontSize: c.avatarW * 0.32,
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(8px)',
            border: `1.5px solid ${c.border}`,
            boxShadow: c.avatarGlow,
            color: '#fff',
          }}
        >
          {initials(entry.name)}
        </div>

        <span
          className="inline-flex items-center justify-center font-black rounded"
          style={{
            fontSize: 9, letterSpacing: '0.06em',
            padding: '2px 5px',
            background: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(6px)',
            border: `1px solid ${c.border}`,
            color: '#fff',
            textShadow: '0 1px 4px rgba(0,0,0,0.6)',
          }}
        >
          {entry.country.slice(0, 3).toUpperCase()}
        </span>

        <p className="font-black text-center w-full truncate leading-tight" style={{ fontSize: c.nameSz, color: '#ffffff', textShadow: '0 1px 10px rgba(0,0,0,0.95), 0 2px 16px rgba(0,0,0,0.8)', letterSpacing: '-0.01em', WebkitFontSmoothing: 'antialiased' }}>
          {entry.name.split(' ')[0]}
        </p>

        <p className="font-black leading-none drop-shadow-lg" style={{ fontSize: c.timeSz, color: c.timeColor }}>
          {entry.timeInSeconds.toFixed(1)}s
        </p>
      </div>

      {/* Pedestal — glass */}
      <div
        className="w-full rounded-t-2xl relative overflow-hidden"
        style={{
          height: c.pedestalH,
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(16px)',
          border: `1px solid ${c.border}`,
          boxShadow: c.glow,
        }}
      >
        {/* Scattered food emoji bg inside pedestal */}
        <span className="absolute pointer-events-none select-none" style={{ top: '8%', left: '4%', fontSize: Math.max(c.pedestalH * 0.28, 14), opacity: 0.13, lineHeight: 1, transform: 'rotate(-18deg)' }}>{c.foodEmoji}</span>
        <span className="absolute pointer-events-none select-none" style={{ bottom: '10%', right: '5%', fontSize: Math.max(c.pedestalH * 0.22, 12), opacity: 0.1, lineHeight: 1, transform: 'rotate(14deg)' }}>{c.foodEmoji}</span>

        {/* Big rank number — fully visible */}
        <div className="absolute inset-0 flex items-end justify-center pb-1">
          <span
            className="font-black select-none leading-none"
            style={{ fontSize: c.pedestalH * 0.68, color: c.rankColor, opacity: 0.9, lineHeight: 1 }}
          >
            {entry.rank}
          </span>
        </div>
        {/* Top label */}
        <span
          className="absolute top-2 inset-x-0 text-center font-black select-none"
          style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}
        >
          #{entry.rank}
        </span>
        {/* Gloss overlay */}
        <div
          className="absolute inset-x-0 top-0 h-8 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom,rgba(255,255,255,0.15),transparent)' }}
        />
      </div>
    </motion.div>
  );
}

// ─── LeaderboardRow ──────────────────────────────────────────────────────────

const ROW_AVATAR_COLORS = [
  '#29603D','#1E4D6B','#7B3F00','#5C2D91','#8B0000','#006064','#37474F','#4A148C','#1B5E20','#0D47A1',
];

function LeaderboardRow({ entry, isLast }) {
  const winner = entry.isWinner;

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.25, ease: 'easeOut' } } }}
      className={[
        'flex items-center gap-4 sm:gap-5 px-5 sm:px-7 py-3.5 transition-colors duration-150',
        !isLast && 'border-b border-gray-100',
        winner ? 'bg-[#FFFDF5] hover:bg-[#FFF8E7]' : 'bg-white hover:bg-gray-50/80',
      ].filter(Boolean).join(' ')}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0"
        style={winner ? { background: '#29603D', color: '#fff' } : { background: '#f3f4f6', color: '#9ca3af' }}
      >
        {entry.rank}
      </div>
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-black shrink-0 select-none"
        style={{ backgroundColor: ROW_AVATAR_COLORS[entry.id % ROW_AVATAR_COLORS.length] }}
      >
        {initials(entry.name)}
      </div>
      <div className="flex flex-col min-w-0 flex-1 gap-0.5">
        <span className="font-bold text-base text-[#111827] truncate leading-snug">
          {entry.name}
          {winner && (
            <span className="ml-2 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full align-middle" style={{ background: '#DCFCE7', color: '#15803D' }}>
              Winner
            </span>
          )}
        </span>
        <span className="text-xs text-gray-400 font-mono truncate leading-snug">{entry.phoneSnippet}</span>
      </div>
      <div className="hidden sm:flex items-center gap-3 shrink-0" style={{ width: 160 }}>
        <span
          className="inline-flex items-center justify-center shrink-0 font-black text-[11px] rounded-md px-1.5 py-0.5"
          style={{ background: '#29603D', color: '#fff', letterSpacing: '0.04em', minWidth: 28 }}
        >
          {entry.country.slice(0, 2).toUpperCase()}
        </span>
        <span className="text-sm font-bold truncate" style={{ color: '#1a4428' }}>{entry.country}</span>
      </div>
      <div className="shrink-0 text-right tabular-nums font-black text-sm" style={{ color: winner ? '#29603D' : '#9ca3af', width: '4rem' }}>
        {entry.timeInSeconds.toFixed(1)}s
      </div>
    </motion.div>
  );
}

// ─── Main Design 1 ────────────────────────────────────────────────────────────

export default function Design1({ entries }) {
  const podiumOrder = [4, 2, 1, 3, 5];
  const get = (rank) => entries.find(e => e.rank === rank);

  const FOOD_BG = [
    // Left column
    { emoji: '🍔', top: '6%',  left: '1%',  size: '7.5rem', rot: '-15deg' },
    { emoji: '🍟', top: '30%', left: '0%',  size: '5.5rem', rot: '10deg'  },
    { emoji: '🍦', top: '56%', left: '1%',  size: '6rem',   rot: '-8deg'  },
    { emoji: '🌭', top: '78%', left: '2%',  size: '5rem',   rot: '12deg'  },
    // Right column
    { emoji: '🥤', top: '8%',  right: '2%', size: '6.5rem', rot: '12deg'  },
    { emoji: '🍔', top: '32%', right: '1%', size: '5.5rem', rot: '-12deg' },
    { emoji: '🍟', top: '58%', right: '2%', size: '5.5rem', rot: '8deg'   },
    { emoji: '🍦', top: '80%', right: '3%', size: '5rem',   rot: '-14deg' },
    // Center scattered
    { emoji: '🍿', top: '5%',  left: '38%', size: '4rem',   rot: '5deg'   },
    { emoji: '🥤', top: '22%', left: '14%', size: '3.5rem', rot: '-10deg' },
    { emoji: '🌭', top: '22%', right: '14%',size: '3.5rem', rot: '15deg'  },
    { emoji: '🍔', top: '48%', left: '20%', size: '4rem',   rot: '8deg'   },
    { emoji: '🍟', top: '48%', right: '18%',size: '4rem',   rot: '-6deg'  },
    { emoji: '🍦', top: '70%', left: '30%', size: '4.5rem', rot: '-12deg' },
    { emoji: '🥤', top: '70%', right: '28%',size: '4rem',   rot: '10deg'  },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col" style={{ background: 'radial-gradient(ellipse at top,#143d22 0%,#0a2818 60%,#06180f 100%)' }}>

      {/* ── Navbar ── */}
      <nav
        className="w-full shrink-0 sticky top-0 z-50"
        style={{ height: 56, background: 'rgba(10,40,24,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(245,197,24,0.15)' }}
      >
        <div className="max-w-5xl mx-auto h-full flex items-center justify-between px-6 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="text-xl">🍔</span>
            <div>
              <p className="text-white font-black text-sm tracking-widest uppercase leading-none">Shake Shack</p>
              <p className="text-white/40 text-[9px] tracking-wider uppercase leading-none mt-0.5">Big Shack Shout Challenge</p>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, type: 'spring' }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider"
            style={{ background: 'linear-gradient(135deg,#F5C518,#D4A000)', color: '#1a1a1a', boxShadow: '0 2px 12px rgba(245,197,24,0.4)' }}
          >
            🏆 <span className="hidden sm:inline">Top 5 Win FREE Meal</span>
            <span className="sm:hidden">Top 5</span>
          </motion.div>
        </div>
      </nav>

      {/* ── Hero + Podium (100vh combined) ── */}
      <div
        className="w-full flex flex-col"
        style={{ minHeight: 'calc(100vh - 56px)', position: 'relative', overflow: 'hidden' }}
      >
        {/* Faded food emoji background */}
        {FOOD_BG.map((f, i) => (
          <div
            key={i}
            className="absolute pointer-events-none select-none"
            style={{
              top: f.top, left: f.left, right: f.right, bottom: f.bottom,
              fontSize: f.size,
              transform: `rotate(${f.rot})`,
              opacity: 0.08,
              lineHeight: 1,
              userSelect: 'none',
            }}
          >
            {f.emoji}
          </div>
        ))}

        {/* Noise grain texture overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.04\'/%3E%3C/svg%3E")', opacity: 0.4 }} />

        {/* Hero text block */}
        <div className="max-w-5xl mx-auto w-full px-6 sm:px-8 pt-8 pb-4 text-center relative z-10">

          <motion.div
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.8)' }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
            </span>
            Live Leaderboard
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-black text-white leading-tight tracking-tight mb-3"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)', letterSpacing: '-0.02em' }}
          >
            The Big Shack Shout Challenge 🍔🗣️
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.26, type: 'spring', stiffness: 200, damping: 18 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl mb-3 font-black"
            style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.9rem)', background: 'linear-gradient(135deg,#F5C518,#D4A000)', color: '#1a1a1a', boxShadow: '0 4px 20px rgba(245,197,24,0.4)' }}
          >
            <Mic2 size={13} strokeWidth={2.5} />
            Say "THE BIIIIG SHACK" in one breath!
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.38 }}
            className="flex items-center justify-center gap-4 flex-wrap"
            style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem' }}
          >
            <span className="flex items-center gap-1.5"><Clock size={10} /> Longest breath wins</span>
            <span className="w-px h-3 bg-white/20 hidden sm:block" />
            <span style={{ color: '#F5C518', fontWeight: 700 }}>🏆 Top 5 win a FREE Shake Shack meal</span>
          </motion.div>
        </div>

        {/* Podium */}
        <div className="flex-1 flex flex-col justify-end relative z-10">
          <div className="max-w-5xl mx-auto w-full px-4 sm:px-8 pb-6">

            <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="text-white/80 font-black text-[10px] tracking-[0.3em] uppercase">🏆 Top Shouters</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.15)' }} />
            </motion.div>

            <div
              className="flex items-end justify-center gap-2 sm:gap-3 overflow-x-auto sm:overflow-visible flex-nowrap snap-x sm:snap-none pb-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {podiumOrder.map((rank) => {
                const entry = get(rank);
                const delays = { 1: 0.1, 2: 0.2, 3: 0.35, 4: 0.25, 5: 0.4 };
                return entry ? <PodiumCard key={rank} entry={entry} delay={delays[rank]} /> : null;
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Leaderboard List (below fold) ── */}
      <section className="w-full pb-16 relative overflow-hidden" style={{ background: '#F8FAFB' }}>
        <div className="h-10 w-full" style={{ background: 'linear-gradient(180deg,#0a2818 0%,#F8FAFB 100%)' }} />

        {/* Food emoji decorations — left side */}
        <div className="absolute left-0 top-16 bottom-16 w-20 pointer-events-none select-none hidden lg:flex flex-col justify-around items-center" style={{ userSelect: 'none' }}>
          {['🍔','🥤','🍟','🍦','🌭'].map((e, i) => (
            <span key={i} style={{ fontSize: '2.2rem', opacity: 0.12, transform: `rotate(${i % 2 === 0 ? '-14deg' : '12deg'})`, lineHeight: 1 }}>{e}</span>
          ))}
        </div>
        {/* Food emoji decorations — right side */}
        <div className="absolute right-0 top-16 bottom-16 w-20 pointer-events-none select-none hidden lg:flex flex-col justify-around items-center" style={{ userSelect: 'none' }}>
          {['🥤','🍦','🍔','🌭','🍟'].map((e, i) => (
            <span key={i} style={{ fontSize: '2.2rem', opacity: 0.12, transform: `rotate(${i % 2 === 0 ? '14deg' : '-12deg'})`, lineHeight: 1 }}>{e}</span>
          ))}
        </div>

        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="text-[#1a4428] font-black text-xs tracking-[0.28em] uppercase">Full Rankings</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#29603D] opacity-50" />
            <span className="text-[#29603D] font-bold text-xs">Ranks 1 – 10</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg,#29603D44,transparent)' }} />
          </motion.div>

          <div className="flex items-center gap-4 sm:gap-5 px-5 sm:px-7 py-2.5 rounded-xl mb-2" style={{ background: '#E8F0EB' }}>
            <div className="w-8 shrink-0" />
            <div className="w-10 shrink-0" />
            <span className="flex-1 text-[10px] font-black text-[#29603D] uppercase tracking-wider">Participant</span>
            <span className="hidden sm:block text-[10px] font-black text-[#29603D] uppercase tracking-wider w-36">Country</span>
            <span className="text-[10px] font-black text-[#29603D] uppercase tracking-wider text-right w-16">Time</span>
          </div>

          <motion.div
            initial="hidden" animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.4 } } }}
            className="rounded-2xl overflow-hidden border border-gray-100 bg-white"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.04)' }}
          >
            {entries.map((entry, i) => (
              <LeaderboardRow key={entry.id} entry={entry} isLast={i === entries.length - 1} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="w-full relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg,#0d2e1a 0%,#06180f 100%)', borderTop: '2px solid rgba(245,197,24,0.25)' }}
      >
        {/* Gold accent glow line at top */}
        <div className="w-full h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(245,197,24,0.6),transparent)' }} />

        {/* Faded food emojis in footer bg */}
        {['🍔','🥤','🍟','🍦','🌭','🍿','🍔','🥤'].map((e, i) => (
          <span
            key={i}
            className="absolute pointer-events-none select-none"
            style={{
              fontSize: '4rem',
              opacity: 0.06,
              lineHeight: 1,
              top: i < 4 ? '10%' : '45%',
              left: `${(i % 4) * 26 + 2}%`,
              transform: `rotate(${i % 2 === 0 ? '-12deg' : '10deg'})`,
              userSelect: 'none',
            }}
          >{e}</span>
        ))}

        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 py-10 text-center">
          {/* Brand row */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-2xl">🍔</span>
            <p className="text-white font-black text-base tracking-[0.25em] uppercase" style={{ letterSpacing: '0.2em' }}>Shake Shack</p>
            <span className="text-2xl">🍔</span>
          </div>

          {/* Gold divider */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg,transparent,rgba(245,197,24,0.5))' }} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: '#F5C518' }}>🏆 Big Shack Shout Challenge</span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg,rgba(245,197,24,0.5),transparent)' }} />
          </div>

          <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.82)' }}>Limited time campaign · Results update in real-time</p>
          <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.65)' }}>Top 5 winners contacted via WhatsApp 📱</p>
        </div>
      </footer>
    </div>
  );
}
