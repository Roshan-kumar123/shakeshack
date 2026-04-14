/**
 * Design 2 — Editorial / Apple Minimal
 * Pure white bg, extreme whitespace, thin elegant typography,
 * circular hemisphere pedestals, Shake Shack green as only accent color.
 */
import { motion, AnimatePresence } from 'framer-motion';
import { Crown } from 'lucide-react';
import { COUNTRIES } from '../../utils/leaderboard';

function initials(name) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

const PCFG = {
  1: { w: 152, pedestalH: 136, rankFontSize: 80, avatarW: 60, nameSz: 15, flagSz: 9, timeSz: 24, accentColor: '#29603D', pedestalBg: '#29603D', foodEmoji: '🍔', emojiSz: 32, showCrown: true },
  2: { w: 124, pedestalH: 104, rankFontSize: 62, avatarW: 48, nameSz: 14, flagSz: 9, timeSz: 18, accentColor: '#374151', pedestalBg: '#1a1a1a', foodEmoji: '🥤', emojiSz: 24, showCrown: false },
  3: { w: 112, pedestalH: 78,  rankFontSize: 48, avatarW: 42, nameSz: 13, flagSz: 9, timeSz: 16, accentColor: '#4B5563', pedestalBg: '#374151', foodEmoji: '🍟', emojiSz: 20, showCrown: false },
  4: { w: 84,  pedestalH: 50,  rankFontSize: 28, avatarW: 28, nameSz: 11, flagSz: 8, timeSz: 12, accentColor: '#6B7280', pedestalBg: '#4B5563', foodEmoji: '🍦', emojiSz: 13, showCrown: false },
  5: { w: 84,  pedestalH: 40,  rankFontSize: 22, avatarW: 26, nameSz: 11, flagSz: 8, timeSz: 11, accentColor: '#9CA3AF', pedestalBg: '#6B7280', foodEmoji: '🌭', emojiSz: 12, showCrown: false },
};

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
      <div className="flex flex-col items-center w-full pb-2 px-1" style={{ gap: entry.rank <= 3 ? 5 : 3 }}>
        {c.showCrown && (
          <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
            <Crown size={20} style={{ color: '#29603D', fill: '#29603D' }} />
          </motion.div>
        )}

        {entry.rank <= 3 && <div style={{ fontSize: c.emojiSz, lineHeight: 1 }}>{c.foodEmoji}</div>}

        <div
          className="rounded-full flex items-center justify-center font-black select-none text-white"
          style={{
            width: c.avatarW, height: c.avatarW, fontSize: c.avatarW * 0.3,
            backgroundColor: c.pedestalBg,
            boxShadow: `0 4px 24px rgba(0,0,0,0.2)`,
          }}
        >
          {initials(entry.name)}
        </div>

        {/* Country code badge — only for top 3 */}
        {entry.rank <= 3 && (
          <span
            className="inline-flex items-center justify-center font-black rounded"
            style={{
              fontSize: c.flagSz, letterSpacing: '0.06em',
              padding: '2px 6px',
              background: c.pedestalBg,
              color: '#fff',
            }}
          >
            {entry.country.slice(0, 3).toUpperCase()}
          </span>
        )}

        <p className="font-black text-center w-full truncate leading-tight text-[#1a1a1a]"
          style={{ fontSize: c.nameSz, letterSpacing: '-0.01em' }}>
          {entry.name.split(' ')[0]}
        </p>

        <p className="font-black leading-none"
          style={{ fontSize: c.timeSz, color: c.pedestalBg, letterSpacing: '-0.03em' }}>
          {entry.timeInSeconds.toFixed(1)}s
        </p>

        {isFirst && <div className="w-8 h-0.5 rounded-full" style={{ background: '#29603D', opacity: 0.8 }} />}
      </div>

      {/* Pedestal — hemisphere */}
      <div
        className="w-full relative overflow-hidden flex items-end justify-center"
        style={{
          height: c.pedestalH,
          background: c.pedestalBg,
          borderRadius: '50% 50% 0 0 / 20px 20px 0 0',
          boxShadow: isFirst ? '0 -4px 40px rgba(41,96,61,0.2), 0 8px 32px rgba(41,96,61,0.12)' : '0 -2px 20px rgba(0,0,0,0.12)',
        }}
      >
        {/* Food emoji bg inside pedestal */}
        <span className="absolute pointer-events-none select-none" style={{ top: '8%', left: '5%', fontSize: Math.max(c.pedestalH * 0.28, 10), opacity: 0.18, lineHeight: 1, transform: 'rotate(-18deg)' }}>{c.foodEmoji}</span>
        <span className="absolute pointer-events-none select-none" style={{ bottom: '10%', right: '6%', fontSize: Math.max(c.pedestalH * 0.22, 8), opacity: 0.14, lineHeight: 1, transform: 'rotate(14deg)' }}>{c.foodEmoji}</span>

        <span className="absolute font-black select-none"
          style={{ fontSize: c.rankFontSize, color: 'rgba(255,255,255,0.2)', bottom: -8, lineHeight: 1 }}>
          {entry.rank}
        </span>
        <span className="absolute top-3 inset-x-0 text-center font-black select-none text-[10px]"
          style={{ color: 'rgba(255,255,255,0.7)' }}>
          #{entry.rank}
        </span>
      </div>
    </motion.div>
  );
}

function FilterBar({ weeks, selectedWeek, setSelectedWeek, selectedCountry, setSelectedCountry, isFetching }) {
  return (
    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
      className="max-w-5xl mx-auto w-full px-6 sm:px-8 pt-4 pb-1 relative z-10">
      <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl" style={{ background: '#F8F9FA', border: '1px solid #E5E7EB', position: 'relative', overflow: 'hidden' }}>

        <AnimatePresence>
          {isFetching && (
            <motion.div key="bar" initial={{ scaleX: 0, opacity: 1 }} animate={{ scaleX: 1, opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{ background: '#29603D', transformOrigin: 'left', zIndex: 10 }} />
          )}
        </AnimatePresence>

        {/* Week pills — scrollable flex-1 */}
        <div className="flex items-center gap-1.5 flex-1 min-w-0 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          <span className="shrink-0 text-[8px] font-black uppercase tracking-[0.2em] mr-0.5" style={{ color: '#9CA3AF' }}>Week</span>
          {weeks.map((w) => {
            const active = w.dateFrom === selectedWeek.dateFrom;
            return (
              <button key={w.dateFrom} onClick={() => setSelectedWeek(w)} disabled={isFetching}
                className={`filter-btn shrink-0 px-2.5 py-1 rounded-full text-[9px] font-black whitespace-nowrap ${active ? 'filter-btn-active' : 'filter-btn-light'}`}
                style={active
                  ? { background: '#29603D', color: '#fff', boxShadow: '0 2px 8px rgba(41,96,61,0.35)' }
                  : { background: '#fff', color: '#374151', border: '1px solid #D1D5DB' }}>
                {w.label}
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="shrink-0 w-px self-stretch" style={{ background: '#E5E7EB' }} />

        {/* Country pills — fixed, no wrap */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="shrink-0 text-[8px] font-black uppercase tracking-[0.2em] mr-0.5" style={{ color: '#9CA3AF' }}>Country</span>
          {COUNTRIES.map((c) => {
            const active = c.code === selectedCountry;
            return (
              <button key={c.code} onClick={() => setSelectedCountry(c.code)} disabled={isFetching}
                className={`filter-btn px-2.5 py-1 rounded-full text-[9px] font-black ${active ? 'filter-btn-active' : 'filter-btn-light'}`}
                style={active
                  ? { background: '#29603D', color: '#fff', boxShadow: '0 2px 8px rgba(41,96,61,0.35)' }
                  : { background: '#fff', color: '#374151', border: '1px solid #D1D5DB' }}>
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
        className="flex flex-col items-center gap-4 p-10 rounded-3xl text-center max-w-sm"
        style={{ background: '#fff', border: '1px solid #E5E7EB', boxShadow: '0 8px 48px rgba(0,0,0,0.06)' }}>
        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: '3.5rem', lineHeight: 1 }}>🍔</motion.div>
        <div>
          <p className="font-black text-[#1a1a1a] text-lg mb-1" style={{ letterSpacing: '-0.02em' }}>No Entries Yet</p>
          <p className="text-sm" style={{ color: '#9CA3AF', lineHeight: 1.5 }}>Check back soon —<br />the shout-off is just getting started!</p>
        </div>
        <div className="flex gap-1">
          {[0,1,2].map(i => (
            <motion.div key={i} animate={{ scale: [1, 1.4, 1], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              className="w-1.5 h-1.5 rounded-full" style={{ background: '#29603D' }} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function Design2({ entries, isFetching, weeks, selectedWeek, setSelectedWeek, selectedCountry, setSelectedCountry }) {
  const podiumOrder = [4, 2, 1, 3, 5];
  const get = (rank) => entries.find(e => e.rank === rank);
  const hasEntries = entries.length > 0;

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

      {/* Hero + Filters + Podium — 100vh */}
      <div className="w-full flex flex-col" style={{ minHeight: 'calc(100vh - 56px)', background: '#FAFAF8', position: 'relative', overflow: 'hidden' }}>
        {FOOD_BG.map((f, i) => (
          <div key={i} className="absolute pointer-events-none select-none"
            style={{ top: f.top, left: f.left, right: f.right, bottom: f.bottom, fontSize: f.size, transform: `rotate(${f.rot})`, opacity: 0.05, lineHeight: 1 }}>
            {f.emoji}
          </div>
        ))}

        {/* Filter bar */}
        <FilterBar weeks={weeks} selectedWeek={selectedWeek} setSelectedWeek={setSelectedWeek}
          selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} isFetching={isFetching} />

        {/* Hero */}
        <div className="max-w-5xl mx-auto w-full px-6 sm:px-8 pt-4 pb-2 text-center relative z-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase mb-4"
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
            style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)', fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 1.05 }}>
            The Big Shack <strong style={{ fontWeight: 900, color: '#29603D' }}>Shout</strong> Challenge 🍔
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }}
            className="mb-2 font-medium" style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.85rem)', letterSpacing: '-0.01em', color: '#6B7280' }}>
            Say "THE BIIIIG SHACK" in one breath · Longest wins · 🏆 Top 5 win a FREE meal
          </motion.p>
        </div>

        {/* Podium or empty state */}
        <AnimatePresence mode="wait">
          {hasEntries ? (
            <motion.div key="podium" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }} className="flex-1 flex flex-col justify-end relative z-10">
              <div className="max-w-5xl mx-auto w-full px-4 sm:px-8 pb-6">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex items-center gap-2 mb-4">
                  <span className="text-[#29603D] font-black text-[10px] tracking-[0.35em] uppercase">Top Shouters</span>
                  <div className="flex-1 h-px" style={{ background: '#29603D33' }} />
                </motion.div>
                <div className="relative rounded-2xl" style={{ padding: '0 0 4px' }}>
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
                      const delays = { 1: 0.1, 2: 0.2, 3: 0.3, 4: 0.25, 5: 0.35 };
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
