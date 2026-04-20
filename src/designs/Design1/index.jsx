/**
 * Design 1 — Modern Classic (Shake Shack Green + Glassmorphism)
 */
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Mic2, Clock } from 'lucide-react';
import { COUNTRIES } from '../../utils/leaderboard';

function initials(name) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

const PCFG = {
  1: { glow: '0 0 40px rgba(245,197,24,0.55), 0 0 0 1.5px rgba(245,197,24,0.6)', border: 'rgba(245,197,24,0.5)', avatarGlow: '0 0 0 3px rgba(245,197,24,0.7)', rankColor: '#F5C518', timeColor: '#FEF08A', pedestalH: 110, w: 136, avatarW: 52, nameSz: 15, timeSz: 20, foodEmoji: '🍔', showCrown: true,  emojiSz: 26 },
  2: { glow: '0 0 28px rgba(209,213,219,0.45), 0 0 0 1.5px rgba(209,213,219,0.5)', border: 'rgba(209,213,219,0.45)', avatarGlow: '0 0 0 3px rgba(209,213,219,0.6)', rankColor: '#D1D5DB', timeColor: '#F3F4F6', pedestalH: 84,  w: 112, avatarW: 42, nameSz: 13, timeSz: 16, foodEmoji: '🥤', showCrown: false, emojiSz: 20 },
  3: { glow: '0 0 28px rgba(205,127,50,0.45), 0 0 0 1.5px rgba(205,127,50,0.5)',   border: 'rgba(205,127,50,0.45)',  avatarGlow: '0 0 0 3px rgba(205,127,50,0.6)',  rankColor: '#CD7F32', timeColor: '#FED7AA', pedestalH: 64,  w: 100, avatarW: 36, nameSz: 12, timeSz: 14, foodEmoji: '🍟', showCrown: false, emojiSz: 17 },
  4: { glow: '0 0 16px rgba(147,197,253,0.3),  0 0 0 1px rgba(147,197,253,0.4)',   border: 'rgba(147,197,253,0.4)', avatarGlow: '0 0 0 2px rgba(147,197,253,0.5)', rankColor: '#93C5FD', timeColor: '#DBEAFE', pedestalH: 50,  w: 84,  avatarW: 28, nameSz: 11, timeSz: 12, foodEmoji: '🍦', showCrown: false, emojiSz: 13 },
  5: { glow: '0 0 16px rgba(249,168,212,0.3),  0 0 0 1px rgba(249,168,212,0.4)',   border: 'rgba(249,168,212,0.4)', avatarGlow: '0 0 0 2px rgba(249,168,212,0.5)', rankColor: '#F9A8D4', timeColor: '#FCE7F3', pedestalH: 40,  w: 84,  avatarW: 26, nameSz: 11, timeSz: 11, foodEmoji: '🌭', showCrown: false, emojiSz: 12 },
};

const FOOD_BG = [
  { emoji: '🍔', top: '6%',  left: '1%',   size: '7.5rem', rot: '-15deg' },
  { emoji: '🍟', top: '30%', left: '0%',   size: '5.5rem', rot: '10deg'  },
  { emoji: '🍦', top: '56%', left: '1%',   size: '6rem',   rot: '-8deg'  },
  { emoji: '🌭', top: '78%', left: '2%',   size: '5rem',   rot: '12deg'  },
  { emoji: '🥤', top: '8%',  right: '2%',  size: '6.5rem', rot: '12deg'  },
  { emoji: '🍔', top: '32%', right: '1%',  size: '5.5rem', rot: '-12deg' },
  { emoji: '🍟', top: '58%', right: '2%',  size: '5.5rem', rot: '8deg'   },
  { emoji: '🍦', top: '80%', right: '3%',  size: '5rem',   rot: '-14deg' },
  { emoji: '🍿', top: '5%',  left: '38%',  size: '4rem',   rot: '5deg'   },
  { emoji: '🥤', top: '22%', left: '14%',  size: '3.5rem', rot: '-10deg' },
  { emoji: '🌭', top: '22%', right: '14%', size: '3.5rem', rot: '15deg'  },
  { emoji: '🍔', top: '48%', left: '20%',  size: '4rem',   rot: '8deg'   },
  { emoji: '🍟', top: '48%', right: '18%', size: '4rem',   rot: '-6deg'  },
  { emoji: '🍦', top: '70%', left: '30%',  size: '4.5rem', rot: '-12deg' },
  { emoji: '🥤', top: '70%', right: '28%', size: '4rem',   rot: '10deg'  },
];

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
      <div className="flex flex-col items-center w-full pb-1.5 px-1" style={{ gap: entry.rank <= 3 ? 5 : 3 }}>
        {c.showCrown && (
          <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}>
            <Crown size={20} style={{ color: '#F5C518', fill: '#F5C518', filter: 'drop-shadow(0 0 8px rgba(245,197,24,0.8))' }} />
          </motion.div>
        )}
        {entry.rank <= 3 && <div style={{ fontSize: c.emojiSz, lineHeight: 1, filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.3))' }}>{c.foodEmoji}</div>}
        <div className="rounded-full flex items-center justify-center font-black select-none"
          style={{ width: c.avatarW, height: c.avatarW, fontSize: c.avatarW * 0.32, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: `1.5px solid ${c.border}`, boxShadow: c.avatarGlow, color: '#fff' }}>
          {initials(entry.name)}
        </div>
        {entry.rank <= 3 && (
          <span className="inline-flex items-center justify-center font-black rounded"
            style={{ fontSize: 9, letterSpacing: '0.06em', padding: '2px 5px', background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(6px)', border: `1px solid ${c.border}`, color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
            {entry.country.slice(0, 3).toUpperCase()}
          </span>
        )}
        <p className="font-black text-center w-full truncate leading-tight"
          style={{ fontSize: c.nameSz, color: '#ffffff', textShadow: '0 1px 10px rgba(0,0,0,0.95), 0 2px 16px rgba(0,0,0,0.8)', letterSpacing: '-0.01em' }}>
          {entry.name.split(' ')[0]}
        </p>
        <p className="font-black leading-none drop-shadow-lg" style={{ fontSize: c.timeSz, color: c.timeColor }}>
          {entry.timeInSeconds.toFixed(1)}s
        </p>
      </div>
      <div className="w-full rounded-t-2xl relative overflow-hidden"
        style={{ height: c.pedestalH, background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)', border: `1px solid ${c.border}`, boxShadow: c.glow }}>
        <span className="absolute pointer-events-none select-none" style={{ top: '8%', left: '4%', fontSize: Math.max(c.pedestalH * 0.28, 14), opacity: 0.13, lineHeight: 1, transform: 'rotate(-18deg)' }}>{c.foodEmoji}</span>
        <span className="absolute pointer-events-none select-none" style={{ bottom: '10%', right: '5%', fontSize: Math.max(c.pedestalH * 0.22, 12), opacity: 0.1, lineHeight: 1, transform: 'rotate(14deg)' }}>{c.foodEmoji}</span>
        <div className="absolute inset-0 flex items-end justify-center pb-1">
          <span className="font-black select-none leading-none" style={{ fontSize: c.pedestalH * 0.68, color: c.rankColor, opacity: 0.9, lineHeight: 1 }}>{entry.rank}</span>
        </div>
        <span className="absolute top-2 inset-x-0 text-center font-black select-none" style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>#{entry.rank}</span>
        <div className="absolute inset-x-0 top-0 h-8 pointer-events-none" style={{ background: 'linear-gradient(to bottom,rgba(255,255,255,0.15),transparent)' }} />
      </div>
    </motion.div>
  );
}

function FilterBar({ weeks, selectedWeek, setSelectedWeek, selectedCountry, setSelectedCountry, isFetching }) {
  return (
    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
      className="max-w-5xl mx-auto w-full px-6 sm:px-8 pt-4 pb-1 relative z-10">
      <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.12)', position: 'relative', overflow: 'hidden' }}>

        <AnimatePresence>
          {isFetching && (
            <motion.div key="bar" initial={{ scaleX: 0, opacity: 1 }} animate={{ scaleX: 1, opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{ background: 'linear-gradient(90deg,#F5C518,#D4A000)', transformOrigin: 'left', zIndex: 10 }} />
          )}
        </AnimatePresence>

        {/* Week pills — scrollable, takes all remaining space */}
        <div className="flex items-center gap-1.5 flex-1 min-w-0 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          <span className="shrink-0 text-[8px] font-black uppercase tracking-[0.2em] mr-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Week</span>
          {weeks.map((w) => {
            const active = w.dateFrom === selectedWeek.dateFrom;
            return (
              <button key={w.dateFrom} onClick={() => setSelectedWeek(w)} disabled={isFetching}
                className={`filter-btn shrink-0 px-2.5 py-1 rounded-full text-[9px] font-black whitespace-nowrap ${active ? 'filter-btn-active' : 'filter-btn-dark'}`}
                style={active
                  ? { background: 'linear-gradient(135deg,#F5C518,#D4A000)', color: '#1a1a1a', boxShadow: '0 0 10px rgba(245,197,24,0.4)' }
                  : { background: 'rgba(255,255,255,0.11)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.2)' }}>
                {w.label}
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="shrink-0 w-px self-stretch" style={{ background: 'rgba(255,255,255,0.12)' }} />

        {/* Country pills — fixed width, no wrap */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="shrink-0 text-[8px] font-black uppercase tracking-[0.2em] mr-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Country</span>
          {COUNTRIES.map((c) => {
            const active = c.code === selectedCountry;
            return (
              <button key={c.code} onClick={() => setSelectedCountry(c.code)} disabled={isFetching}
                className={`filter-btn px-2.5 py-1 rounded-full text-[9px] font-black ${active ? 'filter-btn-active' : 'filter-btn-dark'}`}
                style={active
                  ? { background: 'linear-gradient(135deg,#F5C518,#D4A000)', color: '#1a1a1a', boxShadow: '0 0 10px rgba(245,197,24,0.4)' }
                  : { background: 'rgba(255,255,255,0.11)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.2)' }}>
                {c.code}
              </button>
            );
          })}
        </div>

      </div>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 relative z-10">
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        className="flex flex-col items-center gap-4 p-8 rounded-3xl text-center max-w-sm"
        style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.15)', boxShadow: '0 8px 48px rgba(0,0,0,0.25)' }}>
        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: '3.5rem', lineHeight: 1, filter: 'drop-shadow(0 0 16px rgba(245,197,24,0.6))' }}>🍔</motion.div>
        <div>
          <p className="font-black text-white text-lg mb-1" style={{ letterSpacing: '-0.01em' }}>No Entries Yet</p>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>Check back soon —<br />the shout-off is just getting started!</p>
        </div>
        <div className="flex gap-1">
          {[0,1,2].map(i => (
            <motion.div key={i} animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              className="w-1.5 h-1.5 rounded-full" style={{ background: '#F5C518' }} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function Design1({ entries, isFetching, weeks, selectedWeek, setSelectedWeek, selectedCountry, setSelectedCountry }) {
  const podiumOrder = [4, 2, 1, 3, 5];
  const get = (rank) => entries.find(e => e.rank === rank);
  const hasEntries = entries.length > 0;

  return (
    <div className="min-h-screen w-full flex flex-col" style={{ background: 'radial-gradient(ellipse at top,#143d22 0%,#0a2818 60%,#06180f 100%)' }}>

      {/* Navbar */}
      <nav className="w-full shrink-0 sticky top-0 z-50"
        style={{ height: 56, background: 'rgba(10,40,24,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(245,197,24,0.15)' }}>
        <div className="max-w-5xl mx-auto h-full flex items-center justify-between px-6 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="text-xl">🍔</span>
            <div>
              <p className="text-white font-black text-sm tracking-widest uppercase leading-none">Shake Shack</p>
              <p className="text-white/40 text-[9px] tracking-wider uppercase leading-none mt-0.5">Big Shack Shout Challenge</p>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, type: 'spring' }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider"
            style={{ background: 'linear-gradient(135deg,#F5C518,#D4A000)', color: '#1a1a1a', boxShadow: '0 2px 12px rgba(245,197,24,0.4)' }}>
            🏆 <span className="hidden sm:inline">Top 5 Win FREE Meal</span><span className="sm:hidden">Top 5</span>
          </motion.div>
        </div>
      </nav>

      {/* Hero + Filters + Podium */}
      <div className="w-full flex flex-col" style={{ minHeight: 'calc(100vh - 56px)', position: 'relative', overflow: 'hidden' }}>

        {/* Food emoji bg */}
        {FOOD_BG.map((f, i) => (
          <div key={i} className="absolute pointer-events-none select-none"
            style={{ top: f.top, left: f.left, right: f.right, fontSize: f.size, transform: `rotate(${f.rot})`, opacity: 0.08, lineHeight: 1 }}>
            {f.emoji}
          </div>
        ))}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.04\'/%3E%3C/svg%3E")', opacity: 0.4 }} />

        {/* Filter bar */}
        <FilterBar weeks={weeks} selectedWeek={selectedWeek} setSelectedWeek={setSelectedWeek}
          selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} isFetching={isFetching} />

        {/* Hero text */}
        <div className="max-w-5xl mx-auto w-full px-6 sm:px-8 pt-4 pb-2 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-3"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.8)' }}>
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
            </span>
            Live Leaderboard
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-black text-white leading-tight tracking-tight mb-2"
            style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2.2rem)', letterSpacing: '-0.02em' }}>
            The Big Shack Shout Challenge 🍔🗣️
          </motion.h1>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.26, type: 'spring', stiffness: 200, damping: 18 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl mb-2 font-black"
            style={{ fontSize: 'clamp(0.65rem, 1.1vw, 0.82rem)', background: 'linear-gradient(135deg,#F5C518,#D4A000)', color: '#1a1a1a', boxShadow: '0 4px 20px rgba(245,197,24,0.4)' }}>
            <Mic2 size={12} strokeWidth={2.5} />
            Say "THE BIIIIG SHACK" in one breath!
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.38 }}
            className="flex items-center justify-center gap-4 flex-wrap"
            style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.68rem' }}>
            <span className="flex items-center gap-1.5"><Clock size={10} /> Longest breath wins</span>
            <span className="w-px h-3 bg-white/20 hidden sm:block" />
            <span style={{ color: '#F5C518', fontWeight: 700 }}>🏆 Top 5 win a FREE Shake Shack meal</span>
          </motion.div>
        </div>

        {/* Podium or empty state */}
        <AnimatePresence mode="wait">
          {hasEntries ? (
            <motion.div key="podium" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }} className="flex-1 flex flex-col justify-end relative z-10">
              <div className="max-w-5xl mx-auto w-full px-4 sm:px-8 pb-6">
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-2 mb-4">
                  <span className="text-white/80 font-black text-[10px] tracking-[0.3em] uppercase">🏆 Top Shouters</span>
                  <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.15)' }} />
                </motion.div>
                <div className="relative rounded-2xl" style={{ padding: '0 0 4px' }}>
                  {/* Loading shimmer overlay */}
                  <AnimatePresence>
                    {isFetching && (
                      <motion.div key="shimmer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }} className="podium-loading-overlay rounded-2xl" />
                    )}
                  </AnimatePresence>
                  <motion.div animate={{ opacity: isFetching ? 0.65 : 1 }} transition={{ duration: 0.25 }}
                    className="flex items-end justify-center gap-3 overflow-x-auto flex-nowrap snap-x pb-1"
                    style={{ scrollbarWidth: 'none' }}>
                    {podiumOrder.map((rank) => {
                      const entry = get(rank);
                      const delays = { 1: 0.1, 2: 0.2, 3: 0.35, 4: 0.25, 5: 0.4 };
                      return entry ? <PodiumCard key={rank} entry={entry} delay={delays[rank]} /> : null;
                    })}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex">
              <EmptyState />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="w-full relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg,#0d2e1a 0%,#06180f 100%)', borderTop: '2px solid rgba(245,197,24,0.25)' }}>
        <div className="w-full h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(245,197,24,0.6),transparent)' }} />
        {['🍔','🥤','🍟','🍦','🌭','🍿','🍔','🥤'].map((e, i) => (
          <span key={i} className="absolute pointer-events-none select-none"
            style={{ fontSize: '4rem', opacity: 0.06, lineHeight: 1, top: i < 4 ? '10%' : '45%', left: `${(i % 4) * 26 + 2}%`, transform: `rotate(${i % 2 === 0 ? '-12deg' : '10deg'})` }}>{e}</span>
        ))}
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 py-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-2xl">🍔</span>
            <p className="text-white font-black text-base tracking-[0.25em] uppercase" style={{ letterSpacing: '0.2em' }}>Shake Shack</p>
            <span className="text-2xl">🍔</span>
          </div>
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
