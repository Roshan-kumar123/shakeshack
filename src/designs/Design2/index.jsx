/**
 * Design 2 — Editorial / Apple Minimal
 * Pure white bg, extreme whitespace, thin elegant typography,
 * circular hemisphere pedestals, Shake Shack green as only accent color.
 */
import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';

function initials(name) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

const PCFG = {
  1: { w: 152, pedestalH: 136, rankFontSize: 80, avatarW: 60, nameSz: 15, flagSz: 9, timeSz: 24, accentColor: '#29603D', foodEmoji: '🍔', emojiSz: 32, showCrown: true },
  2: { w: 124, pedestalH: 104, rankFontSize: 62, avatarW: 48, nameSz: 14, flagSz: 9, timeSz: 18, accentColor: '#6B7280', foodEmoji: '🥤', emojiSz: 24, showCrown: false },
  3: { w: 112, pedestalH: 78,  rankFontSize: 48, avatarW: 42, nameSz: 13, flagSz: 9, timeSz: 16, accentColor: '#9CA3AF', foodEmoji: '🍟', emojiSz: 20, showCrown: false },
  4: { w: 96,  pedestalH: 54,  rankFontSize: 34, avatarW: 34, nameSz: 12, flagSz: 8, timeSz: 13, accentColor: '#D1D5DB', foodEmoji: '🍦', emojiSz: 16, showCrown: false },
  5: { w: 96,  pedestalH: 44,  rankFontSize: 28, avatarW: 32, nameSz: 12, flagSz: 8, timeSz: 12, accentColor: '#E5E7EB', foodEmoji: '🌭', emojiSz: 14, showCrown: false },
};

const ROW_AVATAR_COLORS = [
  '#29603D','#1E4D6B','#7B3F00','#5C2D91','#8B0000','#006064','#37474F','#4A148C','#1B5E20','#0D47A1',
];

function PodiumCard({ entry, delay }) {
  const c = PCFG[entry.rank];
  const isFirst = entry.rank === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 90, damping: 20 }}
      className="flex flex-col items-center shrink-0"
      style={{ width: c.w }}
    >
      <div className="flex flex-col items-center w-full pb-3 px-1 gap-1.5">
        {c.showCrown && (
          <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
            <Crown size={20} style={{ color: '#29603D', fill: '#29603D' }} />
          </motion.div>
        )}

        <div style={{ fontSize: c.emojiSz, lineHeight: 1 }}>{c.foodEmoji}</div>

        <div
          className="rounded-full flex items-center justify-center font-black select-none text-white"
          style={{
            width: c.avatarW, height: c.avatarW, fontSize: c.avatarW * 0.3,
            backgroundColor: isFirst ? '#29603D' : '#1a1a1a',
            boxShadow: `0 4px 24px ${isFirst ? 'rgba(41,96,61,0.35)' : 'rgba(0,0,0,0.15)'}`,
          }}
        >
          {initials(entry.name)}
        </div>

        {/* Country code badge */}
        <span
          className="inline-flex items-center justify-center font-black rounded"
          style={{
            fontSize: c.flagSz, letterSpacing: '0.06em',
            padding: '2px 6px',
            background: isFirst ? '#29603D' : '#1a1a1a',
            color: '#fff',
          }}
        >
          {entry.country.slice(0, 3).toUpperCase()}
        </span>

        <p className="font-black text-center w-full truncate leading-tight text-[#1a1a1a]"
          style={{ fontSize: c.nameSz, letterSpacing: '-0.01em' }}>
          {entry.name.split(' ')[0]}
        </p>

        <p className="font-black leading-none"
          style={{ fontSize: c.timeSz, color: isFirst ? '#29603D' : '#1a1a1a', letterSpacing: '-0.03em' }}>
          {entry.timeInSeconds.toFixed(1)}s
        </p>

        {isFirst && <div className="w-8 h-0.5 rounded-full" style={{ background: '#29603D', opacity: 0.8 }} />}
      </div>

      {/* Pedestal — hemisphere with food emoji bg */}
      <div
        className="w-full relative overflow-hidden flex items-end justify-center"
        style={{
          height: c.pedestalH,
          background: isFirst ? '#29603D' : (entry.rank === 2 ? '#1a1a1a' : '#F3F4F6'),
          borderRadius: '50% 50% 0 0 / 20px 20px 0 0',
          boxShadow: isFirst ? '0 -4px 40px rgba(41,96,61,0.2), 0 8px 32px rgba(41,96,61,0.12)' : '0 -2px 20px rgba(0,0,0,0.06)',
        }}
      >
        {/* Food emoji bg inside pedestal */}
        <span className="absolute pointer-events-none select-none" style={{ top: '8%', left: '5%', fontSize: Math.max(c.pedestalH * 0.28, 14), opacity: 0.12, lineHeight: 1, transform: 'rotate(-18deg)' }}>{c.foodEmoji}</span>
        <span className="absolute pointer-events-none select-none" style={{ bottom: '10%', right: '6%', fontSize: Math.max(c.pedestalH * 0.22, 12), opacity: 0.1, lineHeight: 1, transform: 'rotate(14deg)' }}>{c.foodEmoji}</span>

        <span className="absolute font-black select-none"
          style={{ fontSize: c.rankFontSize, color: isFirst ? 'rgba(255,255,255,0.18)' : (entry.rank === 2 ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.07)'), bottom: -8, lineHeight: 1 }}>
          {entry.rank}
        </span>
        <span className="absolute top-3 inset-x-0 text-center font-black select-none text-[10px]"
          style={{ color: isFirst ? 'rgba(255,255,255,0.7)' : (entry.rank === 2 ? 'rgba(255,255,255,0.6)' : '#9CA3AF') }}>
          #{entry.rank}
        </span>
      </div>
    </motion.div>
  );
}

function LeaderboardRow({ entry, isLast }) {
  const winner = entry.isWinner;

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, x: 16 }, visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } } }}
      className={['flex items-center gap-4 sm:gap-6 px-6 sm:px-8 py-4 transition-colors duration-200', !isLast && 'border-b border-gray-100', 'hover:bg-gray-50/60'].filter(Boolean).join(' ')}
    >
      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0"
        style={{ background: winner ? '#29603D' : 'transparent', color: winner ? '#fff' : '#9CA3AF', border: winner ? 'none' : '1.5px solid #E5E7EB' }}>
        {entry.rank}
      </div>
      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0 select-none"
        style={{ backgroundColor: ROW_AVATAR_COLORS[entry.id % ROW_AVATAR_COLORS.length] }}>
        {initials(entry.name)}
      </div>
      <div className="flex flex-col min-w-0 flex-1 gap-0.5">
        <span className="font-bold text-base text-[#111827] truncate" style={{ letterSpacing: '-0.01em' }}>
          {entry.name}
          {winner && (
            <span className="ml-2 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full align-middle" style={{ background: '#F0FDF4', color: '#15803D', border: '1px solid #BBF7D0' }}>
              Winner
            </span>
          )}
        </span>
        <span className="text-xs text-gray-400 font-mono truncate">{entry.phoneSnippet}</span>
      </div>
      <div className="hidden sm:flex items-center gap-2.5 shrink-0" style={{ width: 155 }}>
        <span className="inline-flex items-center justify-center font-black rounded text-[10px] px-1.5 py-0.5 shrink-0"
          style={{ background: '#29603D', color: '#fff', letterSpacing: '0.04em', minWidth: 28 }}>
          {entry.country.slice(0, 2).toUpperCase()}
        </span>
        <span className="text-sm font-semibold text-[#1a4428] truncate hidden md:block">{entry.country}</span>
      </div>
      <div className="shrink-0 text-right tabular-nums font-black text-sm" style={{ color: winner ? '#29603D' : '#9CA3AF', width: '4rem', letterSpacing: '-0.02em' }}>
        {entry.timeInSeconds.toFixed(1)}s
      </div>
    </motion.div>
  );
}

export default function Design2({ entries }) {
  const podiumOrder = [4, 2, 1, 3, 5];
  const get = (rank) => entries.find(e => e.rank === rank);

  const FOOD_BG = [
    { emoji: '🍔', top: '6%',  left: '1%',  size: '8rem',   rot: '-12deg' },
    { emoji: '🥤', top: '8%',  right: '2%', size: '7rem',   rot: '10deg'  },
    { emoji: '🍟', top: '32%', left: '0%',  size: '5.5rem', rot: '8deg'   },
    { emoji: '🍦', top: '34%', right: '1%', size: '5rem',   rot: '-10deg' },
    { emoji: '🌭', top: '60%', left: '1%',  size: '5.5rem', rot: '-6deg'  },
    { emoji: '🍿', top: '62%', right: '2%', size: '5rem',   rot: '14deg'  },
    { emoji: '🍔', top: '20%', left: '12%', size: '3.5rem', rot: '6deg'   },
    { emoji: '🥤', top: '20%', right: '12%',size: '3.5rem', rot: '-8deg'  },
    { emoji: '🍟', top: '48%', left: '18%', size: '3.5rem', rot: '10deg'  },
    { emoji: '🍦', top: '48%', right: '16%',size: '3.5rem', rot: '-12deg' },
    { emoji: '🌭', top: '75%', left: '28%', size: '4rem',   rot: '-6deg'  },
    { emoji: '🍔', top: '75%', right: '25%',size: '3.5rem', rot: '9deg'   },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col bg-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* Navbar */}
      <nav className="w-full shrink-0 sticky top-0 z-50 bg-white" style={{ height: 56, borderBottom: '1px solid #E5E7EB' }}>
        <div className="max-w-5xl mx-auto h-full flex items-center justify-between px-6 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-base font-bold" style={{ background: '#29603D', color: '#fff' }}>🍔</div>
            <div>
              <p className="text-[#1a1a1a] font-black text-sm tracking-widest uppercase leading-none">Shake Shack</p>
              <p className="text-gray-500 text-[9px] tracking-wider leading-none mt-0.5">Big Shack Shout Challenge</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black"
            style={{ background: '#F0FDF4', color: '#15803D', border: '1px solid #BBF7D0' }}>
            🏆 <span className="hidden sm:inline">Top 5 Win FREE Meal</span>
          </div>
        </div>
      </nav>

      {/* Hero + Podium — 100vh */}
      <div className="w-full flex flex-col" style={{ minHeight: 'calc(100vh - 56px)', background: '#FAFAF8', position: 'relative', overflow: 'hidden' }}>
        {FOOD_BG.map((f, i) => (
          <div key={i} className="absolute pointer-events-none select-none"
            style={{ top: f.top, left: f.left, right: f.right, bottom: f.bottom, fontSize: f.size, transform: `rotate(${f.rot})`, opacity: 0.05, lineHeight: 1 }}>
            {f.emoji}
          </div>
        ))}

        {/* Hero */}
        <div className="max-w-5xl mx-auto w-full px-6 sm:px-8 pt-10 pb-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase mb-5"
            style={{ background: '#F0FDF4', color: '#15803D', border: '1px solid #BBF7D0' }}>
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
            </span>
            Live Leaderboard
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#1a1a1a] leading-tight mb-2"
            style={{ fontSize: 'clamp(1.8rem, 3.2vw, 3rem)', fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 1.05 }}>
            The Big Shack <strong style={{ fontWeight: 900, color: '#29603D' }}>Shout</strong> Challenge 🍔
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }}
            className="mb-4 font-medium" style={{ fontSize: 'clamp(0.75rem, 1.1vw, 0.9rem)', letterSpacing: '-0.01em', color: '#6B7280' }}>
            Say "THE BIIIIG SHACK" in one breath · Longest wins · 🏆 Top 5 win a FREE meal
          </motion.p>
        </div>

        {/* Podium */}
        <div className="flex-1 flex flex-col justify-end relative z-10">
          <div className="max-w-5xl mx-auto w-full px-4 sm:px-8 pb-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex items-center gap-2 mb-5">
              <span className="text-[#29603D] font-black text-[10px] tracking-[0.35em] uppercase">Top Shouters</span>
              <div className="flex-1 h-px" style={{ background: '#29603D33' }} />
            </motion.div>
            <div className="flex items-end justify-center gap-2 sm:gap-4 overflow-x-auto sm:overflow-visible flex-nowrap snap-x sm:snap-none" style={{ scrollbarWidth: 'none' }}>
              {podiumOrder.map((rank) => {
                const entry = get(rank);
                const delays = { 1: 0.1, 2: 0.2, 3: 0.3, 4: 0.25, 5: 0.35 };
                return entry ? <PodiumCard key={rank} entry={entry} delay={delays[rank]} /> : null;
              })}
            </div>
          </div>
        </div>
      </div>

      {/* List */}
      <section className="w-full pb-16 bg-white relative overflow-hidden">
        <div className="h-px w-full" style={{ background: '#E5E7EB' }} />

        {/* Food emoji margin decorations */}
        <div className="absolute left-0 top-12 bottom-12 w-20 pointer-events-none select-none hidden lg:flex flex-col justify-around items-center">
          {['🍔','🥤','🍟','🍦','🌭'].map((e, i) => (
            <span key={i} style={{ fontSize: '2rem', opacity: 0.1, transform: `rotate(${i % 2 === 0 ? '-12deg' : '10deg'})`, lineHeight: 1 }}>{e}</span>
          ))}
        </div>
        <div className="absolute right-0 top-12 bottom-12 w-20 pointer-events-none select-none hidden lg:flex flex-col justify-around items-center">
          {['🥤','🍦','🍔','🌭','🍟'].map((e, i) => (
            <span key={i} style={{ fontSize: '2rem', opacity: 0.1, transform: `rotate(${i % 2 === 0 ? '12deg' : '-10deg'})`, lineHeight: 1 }}>{e}</span>
          ))}
        </div>

        <div className="max-w-5xl mx-auto px-6 sm:px-8 pt-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="flex items-center gap-3 mb-5">
            <span className="text-[#1a1a1a] font-black text-xs tracking-[0.28em] uppercase">Full Rankings</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#29603D] opacity-50" />
            <span className="text-[#29603D] font-bold text-xs">Ranks 1–10</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg,#29603D33,transparent)' }} />
          </motion.div>

          <div className="flex items-center gap-4 sm:gap-6 px-6 sm:px-8 py-2.5 rounded-xl mb-2" style={{ background: '#F0F7F2' }}>
            <div className="w-7 shrink-0" /><div className="w-9 shrink-0" />
            <span className="flex-1 text-[10px] font-black text-[#29603D] uppercase tracking-wider">Participant</span>
            <span className="hidden sm:block text-[10px] font-black text-[#29603D] uppercase tracking-wider w-36">Country</span>
            <span className="text-[10px] font-black text-[#29603D] uppercase tracking-wider text-right w-16">Time</span>
          </div>

          <motion.div initial="hidden" animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04, delayChildren: 0.4 } } }}
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid #F3F4F6', boxShadow: '0 1px 4px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.03)' }}>
            {entries.map((entry, i) => (
              <LeaderboardRow key={entry.id} entry={entry} isLast={i === entries.length - 1} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full relative overflow-hidden" style={{ background: '#1a1a1a', borderTop: '2px solid #29603D44' }}>
        <div className="w-full h-px" style={{ background: 'linear-gradient(90deg,transparent,#29603D,transparent)' }} />
        {['🍔','🥤','🍟','🍦','🌭','🍿','🍔','🥤'].map((e, i) => (
          <span key={i} className="absolute pointer-events-none select-none"
            style={{ fontSize: '4rem', opacity: 0.05, lineHeight: 1, top: i < 4 ? '10%' : '45%', left: `${(i % 4) * 26 + 2}%`, transform: `rotate(${i % 2 === 0 ? '-12deg' : '10deg'})` }}>{e}</span>
        ))}
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 py-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-2xl">🍔</span>
            <p className="text-white font-black text-base tracking-[0.2em] uppercase">Shake Shack</p>
            <span className="text-2xl">🍔</span>
          </div>
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg,transparent,#29603D)' }} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: '#29603D' }}>🏆 Big Shack Shout Challenge</span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg,#29603D,transparent)' }} />
          </div>
          <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.82)' }}>Limited time campaign · Results update in real-time</p>
          <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.65)' }}>Top 5 winners contacted via WhatsApp 📱</p>
        </div>
      </footer>
    </div>
  );
}
