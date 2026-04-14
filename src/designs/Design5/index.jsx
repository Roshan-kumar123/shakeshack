/**
 * Design 5 — Frosted Glass / Full-Bleed Blur
 * Full-viewport blurred food-emoji wallpaper bg, dark overlay,
 * everything inside ultra-premium glass cards.
 * Glass navbar, glass hero card, glass podium cards, glass list panel.
 */
import { motion } from 'framer-motion';
import { Crown, Mic2 } from 'lucide-react';

function initials(name) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

const WALL_EMOJIS = [
  { e: '🍔', top: '2%',  left: '5%',  sz: '6rem',   rot: '-12deg', op: 0.6  },
  { e: '🥤', top: '3%',  left: '25%', sz: '5rem',   rot: '8deg',   op: 0.5  },
  { e: '🍟', top: '1%',  left: '48%', sz: '5.5rem', rot: '-6deg',  op: 0.55 },
  { e: '🍦', top: '2%',  left: '68%', sz: '5rem',   rot: '14deg',  op: 0.5  },
  { e: '🌭', top: '3%',  left: '87%', sz: '4.5rem', rot: '-10deg', op: 0.45 },
  { e: '🍿', top: '22%', left: '2%',  sz: '4.5rem', rot: '6deg',   op: 0.45 },
  { e: '🍔', top: '20%', left: '18%', sz: '6rem',   rot: '-8deg',  op: 0.55 },
  { e: '🥤', top: '22%', left: '38%', sz: '4.5rem', rot: '10deg',  op: 0.5  },
  { e: '🍟', top: '20%', left: '58%', sz: '5.5rem', rot: '-14deg', op: 0.5  },
  { e: '🍦', top: '21%', left: '78%', sz: '5rem',   rot: '5deg',   op: 0.5  },
  { e: '🌭', top: '21%', left: '93%', sz: '4.5rem', rot: '-8deg',  op: 0.45 },
  { e: '🍔', top: '42%', left: '0%',  sz: '5.5rem', rot: '10deg',  op: 0.5  },
  { e: '🥤', top: '40%', left: '20%', sz: '6rem',   rot: '-6deg',  op: 0.55 },
  { e: '🍟', top: '42%', left: '42%', sz: '4.5rem', rot: '12deg',  op: 0.45 },
  { e: '🍦', top: '40%', left: '62%', sz: '5rem',   rot: '-10deg', op: 0.5  },
  { e: '🌭', top: '42%', left: '82%', sz: '4.5rem', rot: '7deg',   op: 0.45 },
  { e: '🍔', top: '62%', left: '8%',  sz: '5rem',   rot: '-15deg', op: 0.5  },
  { e: '🥤', top: '62%', left: '28%', sz: '5.5rem', rot: '9deg',   op: 0.5  },
  { e: '🍟', top: '62%', left: '50%', sz: '5rem',   rot: '-4deg',  op: 0.5  },
  { e: '🍦', top: '62%', left: '70%', sz: '4.5rem', rot: '11deg',  op: 0.45 },
  { e: '🌭', top: '63%', left: '90%', sz: '5rem',   rot: '-12deg', op: 0.5  },
  { e: '🍔', top: '82%', left: '3%',  sz: '6rem',   rot: '8deg',   op: 0.5  },
  { e: '🥤', top: '82%', left: '22%', sz: '4.5rem', rot: '-10deg', op: 0.45 },
  { e: '🍟', top: '80%', left: '44%', sz: '5.5rem', rot: '6deg',   op: 0.5  },
  { e: '🍦', top: '82%', left: '64%', sz: '5rem',   rot: '-8deg',  op: 0.5  },
  { e: '🌭', top: '81%', left: '84%', sz: '4.5rem', rot: '13deg',  op: 0.45 },
];

const PCFG = {
  1: {
    w: 148, pedestalH: 136, avatarW: 56, nameSz: 15, timeSz: 22,
    glow: '0 0 40px rgba(245,197,24,0.6), 0 0 0 1.5px rgba(245,197,24,0.7)',
    glowColor: 'rgba(245,197,24,0.55)',
    borderColor: 'rgba(245,197,24,0.5)',
    rankColor: '#F5C518',
    foodEmojis: ['🍔','🥤'], emojiSz: '2rem', showCrown: true,
  },
  2: {
    w: 120, pedestalH: 104, avatarW: 44, nameSz: 14, timeSz: 17,
    glow: '0 0 28px rgba(220,220,220,0.4), 0 0 0 1px rgba(220,220,220,0.45)',
    glowColor: 'rgba(220,220,220,0.35)',
    borderColor: 'rgba(220,220,220,0.4)',
    rankColor: '#E5E7EB',
    foodEmojis: ['🍟','🍦'], emojiSz: '1.6rem', showCrown: false,
  },
  3: {
    w: 108, pedestalH: 78, avatarW: 38, nameSz: 13, timeSz: 14,
    glow: '0 0 24px rgba(205,127,50,0.45), 0 0 0 1px rgba(205,127,50,0.4)',
    glowColor: 'rgba(205,127,50,0.4)',
    borderColor: 'rgba(205,127,50,0.4)',
    rankColor: '#CD7F32',
    foodEmojis: ['🌭','🍿'], emojiSz: '1.4rem', showCrown: false,
  },
  4: {
    w: 94, pedestalH: 54, avatarW: 32, nameSz: 12, timeSz: 12,
    glow: '0 0 16px rgba(147,197,253,0.35), 0 0 0 1px rgba(147,197,253,0.35)',
    glowColor: 'rgba(147,197,253,0.3)',
    borderColor: 'rgba(147,197,253,0.35)',
    rankColor: '#93C5FD',
    foodEmojis: ['🍔','🥤'], emojiSz: '1.2rem', showCrown: false,
  },
  5: {
    w: 94, pedestalH: 44, avatarW: 30, nameSz: 12, timeSz: 11,
    glow: '0 0 16px rgba(249,168,212,0.35), 0 0 0 1px rgba(249,168,212,0.35)',
    glowColor: 'rgba(249,168,212,0.3)',
    borderColor: 'rgba(249,168,212,0.35)',
    rankColor: '#F9A8D4',
    foodEmojis: ['🍟','🍦'], emojiSz: '1.1rem', showCrown: false,
  },
};

const ROW_AVATAR_COLORS = [
  'rgba(245,197,24,0.3)', 'rgba(220,220,220,0.25)', 'rgba(205,127,50,0.3)',
  'rgba(41,96,61,0.35)', 'rgba(245,197,24,0.25)', 'rgba(147,197,253,0.25)',
  'rgba(249,168,212,0.25)', 'rgba(255,255,255,0.15)', 'rgba(41,96,61,0.3)', 'rgba(245,197,24,0.2)',
];

const GLASS_CARD = {
  background: 'rgba(255,255,255,0.1)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.2)',
};

function PodiumCard({ entry, delay }) {
  const c = PCFG[entry.rank];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center shrink-0 snap-center"
      style={{ width: c.w }}
    >
      {/* Above pedestal */}
      <div className="flex flex-col items-center w-full pb-2 px-1 gap-1.5">
        {c.showCrown && (
          <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}>
            <Crown size={20} style={{ color: '#F5C518', fill: '#F5C518', filter: 'drop-shadow(0 0 10px rgba(245,197,24,0.9))' }} />
          </motion.div>
        )}

        <div style={{ fontSize: c.emojiSz, lineHeight: 1, filter: 'drop-shadow(0 3px 8px rgba(0,0,0,0.4))' }}>
          {c.foodEmojis[0]}
        </div>

        {/* Glass avatar */}
        <div
          className="rounded-full flex items-center justify-center font-black select-none text-white"
          style={{
            width: c.avatarW, height: c.avatarW, fontSize: c.avatarW * 0.3,
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(8px)',
            border: `1.5px solid ${c.borderColor}`,
            boxShadow: `0 0 0 2px ${c.glowColor}`,
          }}
        >
          {initials(entry.name)}
        </div>

        {/* Country code badge — glass pill */}
        <span style={{
          fontSize: 9, padding: '2px 5px', lineHeight: 1.4,
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          border: `1px solid ${c.borderColor}`,
          color: '#fff',
          fontWeight: 700,
          letterSpacing: '0.05em',
          borderRadius: 3,
        }}>
          {entry.country.slice(0, 3).toUpperCase()}
        </span>

        <p className="font-black text-center w-full truncate leading-tight text-white"
          style={{
            fontSize: c.nameSz,
            textShadow: '0 1px 10px rgba(0,0,0,0.95), 0 2px 16px rgba(0,0,0,0.8)',
          }}>
          {entry.name.split(' ')[0]}
        </p>

        <p className="font-black leading-none" style={{ fontSize: c.timeSz, color: c.rankColor, textShadow: `0 0 12px ${c.rankColor}` }}>
          {entry.timeInSeconds.toFixed(1)}s
        </p>

      </div>

      {/* Glass pedestal */}
      <div
        className="w-full rounded-t-2xl relative overflow-hidden"
        style={{
          height: c.pedestalH,
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: `1px solid ${c.borderColor}`,
          borderBottom: 'none',
          boxShadow: c.glow,
        }}
      >
        {/* Food emojis inside pedestal */}
        <span className="absolute select-none pointer-events-none"
          style={{ fontSize: '1.3rem', top: 4, left: 5, opacity: 0.18, lineHeight: 1, transform: 'rotate(-10deg)' }}>
          {c.foodEmojis[0]}
        </span>
        <span className="absolute select-none pointer-events-none"
          style={{ fontSize: '1.1rem', bottom: 6, right: 5, opacity: 0.15, lineHeight: 1, transform: 'rotate(8deg)' }}>
          {c.foodEmojis[1]}
        </span>

        {/* SOLID rank number */}
        <div className="absolute inset-0 flex items-end justify-center pb-1">
          <span
            className="font-black select-none"
            style={{
              fontSize: c.pedestalH * 0.7,
              color: c.rankColor,
              opacity: 0.9,
              lineHeight: 1,
              textShadow: `0 0 24px ${c.rankColor}`,
            }}
          >
            {entry.rank}
          </span>
        </div>
        <span
          className="absolute top-2 inset-x-0 text-center font-black select-none text-[10px]"
          style={{ color: 'rgba(255,255,255,0.65)' }}
        >
          #{entry.rank}
        </span>
        <div
          className="absolute inset-x-0 top-0 h-8 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom,rgba(255,255,255,0.2),transparent)' }}
        />
      </div>
    </motion.div>
  );
}

function LeaderboardRow({ entry, isLast }) {
  const winner = entry.isWinner;

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, x: 16 }, visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } } }}
      className={[
        'flex items-center gap-4 sm:gap-5 px-5 sm:px-7 py-3.5 transition-all duration-200',
        !isLast && 'border-b border-white/10',
        winner ? 'hover:bg-white/10' : 'hover:bg-white/5',
      ].filter(Boolean).join(' ')}
      style={{ background: winner ? 'rgba(245,197,24,0.08)' : 'transparent' }}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0"
        style={winner
          ? { background: 'rgba(245,197,24,0.25)', color: '#F5C518', border: '1px solid rgba(245,197,24,0.4)', boxShadow: '0 0 8px rgba(245,197,24,0.3)' }
          : { background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.12)' }}
      >
        {entry.rank}
      </div>
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black shrink-0 select-none text-white"
        style={{
          background: ROW_AVATAR_COLORS[entry.id % ROW_AVATAR_COLORS.length],
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255,255,255,0.2)',
        }}
      >
        {initials(entry.name)}
      </div>
      <div className="flex flex-col min-w-0 flex-1 gap-0.5">
        <span className="font-black text-base text-white truncate leading-snug" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
          {entry.name}
          {winner && (
            <span className="ml-2 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full align-middle" style={{ background: 'rgba(245,197,24,0.2)', color: '#F5C518', border: '1px solid rgba(245,197,24,0.4)' }}>
              Winner
            </span>
          )}
        </span>
        <div className="flex items-center gap-1.5">
          <span style={{
            fontSize: 10, padding: '2px 5px', lineHeight: 1.4,
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255,255,255,0.25)',
            color: '#fff',
            fontWeight: 700,
            letterSpacing: '0.05em',
            borderRadius: 3,
          }}>
            {entry.country.slice(0, 3).toUpperCase()}
          </span>
          <span className="text-sm font-bold truncate" style={{ color: 'rgba(255,255,255,0.75)' }}>{entry.country}</span>
        </div>
        <span className="text-[11px] font-mono truncate" style={{ color: 'rgba(255,255,255,0.3)' }}>{entry.phoneSnippet}</span>
      </div>
      <div className="shrink-0 text-right tabular-nums font-black text-sm" style={{ color: winner ? '#F5C518' : 'rgba(255,255,255,0.35)', width: '4rem', textShadow: winner ? '0 0 8px rgba(245,197,24,0.5)' : 'none' }}>
        {entry.timeInSeconds.toFixed(1)}s
      </div>
    </motion.div>
  );
}

export default function Design5({ entries }) {
  const podiumOrder = [4, 2, 1, 3, 5];
  const get = (rank) => entries.find(e => e.rank === rank);

  return (
    <div className="min-h-screen w-full flex flex-col" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* Full-bleed food wallpaper — fixed behind everything */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        <div className="absolute inset-0" style={{ overflow: 'hidden' }}>
          {WALL_EMOJIS.map((f, i) => (
            <div
              key={i}
              className="absolute select-none"
              style={{ top: f.top, left: f.left, fontSize: f.sz, transform: `rotate(${f.rot})`, opacity: f.op, lineHeight: 1, userSelect: 'none' }}
            >
              {f.e}
            </div>
          ))}
        </div>
        {/* Blur + dark overlay */}
        <div className="absolute inset-0" style={{ backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)', background: 'rgba(10,20,15,0.72)' }} />
      </div>

      {/* Content layer */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* Navbar — glass */}
        <nav
          className="w-full shrink-0 sticky top-0 z-50"
          style={{ height: 56, ...GLASS_CARD, borderRadius: 0, borderLeft: 'none', borderRight: 'none', borderTop: 'none' }}
        >
          <div className="max-w-5xl mx-auto h-full flex items-center justify-between px-6 sm:px-8">
            <div className="flex items-center gap-3">
              <span className="text-xl">🍔</span>
              <div>
                <p className="text-white font-black text-sm tracking-widest uppercase leading-none">Shake Shack</p>
                <p className="text-[9px] tracking-wider uppercase leading-none mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Big Shack Shout Challenge</p>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, type: 'spring' }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider"
              style={{ background: 'rgba(245,197,24,0.2)', border: '1px solid rgba(245,197,24,0.45)', color: '#F5C518', backdropFilter: 'blur(8px)', boxShadow: '0 0 16px rgba(245,197,24,0.2)' }}
            >
              🏆 <span className="hidden sm:inline">Top 5 Win FREE Meal</span>
            </motion.div>
          </div>
        </nav>

        {/* Hero + Podium — 100vh */}
        <div
          className="w-full flex flex-col"
          style={{ minHeight: 'calc(100vh - 56px)' }}
        >
          {/* Hero glass card */}
          <div className="max-w-5xl mx-auto w-full px-6 sm:px-8 pt-8 pb-4">
            <motion.div
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl px-8 py-6 text-center"
              style={{ ...GLASS_CARD, boxShadow: '0 8px 48px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.15)' }}
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.8)' }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
                </span>
                Live Leaderboard
              </div>

              <h1
                className="font-black text-white leading-tight tracking-tight mb-3"
                style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', letterSpacing: '-0.02em', textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}
              >
                The Big Shack Shout Challenge 🍔🗣️
              </h1>

              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl mb-3 font-black"
                style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.85rem)', background: 'rgba(245,197,24,0.2)', border: '1px solid rgba(245,197,24,0.4)', color: '#F5C518', backdropFilter: 'blur(8px)', boxShadow: '0 0 20px rgba(245,197,24,0.15)' }}
              >
                <Mic2 size={12} strokeWidth={2.5} />
                Say "THE BIIIIG SHACK" in one breath!
              </div>

              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.72rem' }}>
                Longest breath wins · 🏆 Top 5 win a FREE Shake Shack meal
              </p>
            </motion.div>
          </div>

          {/* Podium */}
          <div className="flex-1 flex flex-col justify-end">
            <div className="max-w-5xl mx-auto w-full px-4 sm:px-8 pb-8">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="flex items-center gap-2 mb-4">
                <span className="font-black text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.6)' }}>🏆 Top Shouters</span>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
              </motion.div>

              <div
                className="flex items-end justify-center gap-2 sm:gap-3 overflow-x-auto sm:overflow-visible flex-nowrap snap-x sm:snap-none pb-1"
                style={{ scrollbarWidth: 'none' }}
              >
                {podiumOrder.map((rank) => {
                  const entry = get(rank);
                  const delays = { 1: 0.1, 2: 0.22, 3: 0.34, 4: 0.28, 5: 0.4 };
                  return entry ? <PodiumCard key={rank} entry={entry} delay={delays[rank]} /> : null;
                })}
              </div>
            </div>
          </div>
        </div>

        {/* List — glass panel */}
        <section className="w-full pb-16">
          <div className="h-px w-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
          <div className="max-w-5xl mx-auto px-6 sm:px-8 pt-8 relative">

            {/* Food emoji margin decorations */}
            <div className="absolute left-0 top-16 bottom-16 w-10 hidden lg:flex flex-col justify-around items-center pointer-events-none select-none" aria-hidden="true" style={{ opacity: 0.25 }}>
              {['🍔','🥤','🍟','🍦','🌭'].map((e, i) => <span key={i} style={{ fontSize: '1.5rem' }}>{e}</span>)}
            </div>
            <div className="absolute right-0 top-16 bottom-16 w-10 hidden lg:flex flex-col justify-around items-center pointer-events-none select-none" aria-hidden="true" style={{ opacity: 0.25 }}>
              {['🍿','🍔','🥤','🍟','🍦'].map((e, i) => <span key={i} style={{ fontSize: '1.5rem' }}>{e}</span>)}
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex items-center gap-2 mb-4">
              <span className="font-black text-sm tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.9)' }}>Full Rankings</span>
              <span style={{ color: '#F5C518', fontSize: '0.75rem', fontWeight: 900 }}>·</span>
              <span className="font-bold text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>Ranks 1–10</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
            </motion.div>

            <div className="flex items-center gap-4 sm:gap-5 px-5 sm:px-7 py-2.5 rounded-xl mb-2" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <div className="w-8 shrink-0" />
              <div className="w-10 shrink-0" />
              <span className="flex-1 text-[10px] font-black uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.75)' }}>Participant</span>
              <span className="hidden sm:block text-[10px] font-black uppercase tracking-wider flex-1" style={{ color: 'rgba(255,255,255,0.75)' }}>Country</span>
              <span className="text-[10px] font-black uppercase tracking-wider text-right w-16" style={{ color: 'rgba(255,255,255,0.75)' }}>Time</span>
            </div>

            <motion.div
              initial="hidden" animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.45 } } }}
              className="rounded-2xl overflow-hidden"
              style={{ ...GLASS_CARD, boxShadow: '0 4px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.12)' }}
            >
              {entries.map((entry, i) => (
                <LeaderboardRow key={entry.id} entry={entry} isLast={i === entries.length - 1} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full relative overflow-hidden" style={{ ...GLASS_CARD, borderRadius: 0, borderLeft: 'none', borderRight: 'none', borderBottom: 'none' }}>
          {/* Gold shimmer accent line */}
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent 0%,#F5C518 30%,#F5C518 70%,transparent 100%)', opacity: 0.7 }} />

          <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 py-10">
            {/* Brand row */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <span style={{ fontSize: '1.5rem' }}>🍔</span>
              <span className="font-black text-base uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.92)', letterSpacing: '0.15em' }}>Shake Shack</span>
              <span style={{ fontSize: '1.5rem' }}>🏆</span>
            </div>
            <div className="h-px w-24 mx-auto mb-4" style={{ background: 'linear-gradient(90deg,transparent,#F5C518,transparent)' }} />

            <p className="text-center text-xs font-bold mb-1" style={{ color: 'rgba(255,255,255,0.82)' }}>
              The Big Shack Shout Challenge · Limited time campaign
            </p>
            <p className="text-center text-[11px]" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Results update in real-time · Top 5 winners contacted via WhatsApp 📱
            </p>
            <p className="text-center text-[10px] mt-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
              © 2025 Shake Shack · All rights reserved
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
