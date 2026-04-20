/**
 * Design 3 — Bold Sporty (Dark Charcoal + Dream11 Energy)
 * Near-black bg, monolithic pedestals, massive rank numbers, neon-green + gold accents.
 * Split hero: left = text stack, right = food emoji collage.
 */
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Zap } from 'lucide-react';
import { COUNTRIES } from '../../utils/leaderboard';

function initials(name) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

const PCFG = {
  1: { w: 148, pedestalH: 140, rankColor: '#FFD700', borderColor: '#FFD700', bgColor: '#1a1506', foodEmojis: ['🍔','🥤'], emojiSz: 30, avatarW: 56, nameSz: 15, timeSz: 22, showCrown: true },
  2: { w: 120, pedestalH: 106, rankColor: '#C0C0C0', borderColor: '#C0C0C0', bgColor: '#141414', foodEmojis: ['🍟','🍦'], emojiSz: 22, avatarW: 44, nameSz: 14, timeSz: 17, showCrown: false },
  3: { w: 108, pedestalH: 78,  rankColor: '#CD7F32', borderColor: '#CD7F32', bgColor: '#160d04', foodEmojis: ['🌭','🍿'], emojiSz: 18, avatarW: 38, nameSz: 13, timeSz: 14, showCrown: false },
  4: { w: 84,  pedestalH: 50,  rankColor: '#00C851', borderColor: '#00C851', bgColor: '#020d04', foodEmojis: ['🍔','🥤'], emojiSz: 13, avatarW: 28, nameSz: 11, timeSz: 12, showCrown: false },
  5: { w: 84,  pedestalH: 40,  rankColor: '#00C851', borderColor: '#00C851', bgColor: '#020d04', foodEmojis: ['🍟','🍦'], emojiSz: 12, avatarW: 26, nameSz: 11, timeSz: 11, showCrown: false },
};

const BG_FOOD = [
  { e: '🍔', top: '5%',  left: '2%',   sz: '5.5rem', rot: '-12deg', op: 0.07 },
  { e: '🥤', top: '8%',  left: '18%',  sz: '4.5rem', rot: '9deg',   op: 0.06 },
  { e: '🍟', top: '4%',  left: '38%',  sz: '5rem',   rot: '-5deg',  op: 0.07 },
  { e: '🍦', top: '6%',  left: '56%',  sz: '4rem',   rot: '14deg',  op: 0.06 },
  { e: '🌭', top: '5%',  left: '73%',  sz: '4.5rem', rot: '-8deg',  op: 0.06 },
  { e: '🍿', top: '7%',  left: '89%',  sz: '4rem',   rot: '11deg',  op: 0.05 },
  { e: '🍔', top: '30%', left: '0%',   sz: '4rem',   rot: '7deg',   op: 0.05 },
  { e: '🥤', top: '28%', left: '92%',  sz: '4.5rem', rot: '-6deg',  op: 0.05 },
  { e: '🍟', top: '55%', left: '1%',   sz: '4.5rem', rot: '-10deg', op: 0.05 },
  { e: '🍦', top: '52%', left: '91%',  sz: '4rem',   rot: '9deg',   op: 0.05 },
  { e: '🌭', top: '75%', left: '5%',   sz: '4rem',   rot: '12deg',  op: 0.05 },
  { e: '🍔', top: '78%', left: '88%',  sz: '4.5rem', rot: '-7deg',  op: 0.05 },
  { e: '🥤', top: '88%', left: '22%',  sz: '4rem',   rot: '6deg',   op: 0.05 },
  { e: '🍟', top: '90%', left: '58%',  sz: '4.5rem', rot: '-13deg', op: 0.05 },
  { e: '🍦', top: '85%', left: '76%',  sz: '4rem',   rot: '8deg',   op: 0.05 },
];

function PodiumCard({ entry, delay }) {
  const c = PCFG[entry.rank];

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 120, damping: 14 }}
      className="flex flex-col items-center shrink-0 snap-center"
      style={{ width: c.w }}
    >
      {/* Above pedestal */}
      <div className="flex flex-col items-center w-full pb-2 px-1" style={{ gap: entry.rank <= 3 ? 4 : 3 }}>
        {c.showCrown && (
          <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
            <Crown size={20} style={{ color: '#FFD700', fill: '#FFD700', filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.9))' }} />
          </motion.div>
        )}

        {entry.rank <= 3 && (
          <div style={{ fontSize: c.emojiSz, lineHeight: 1, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
            {c.foodEmojis[0]}
          </div>
        )}

        <div
          className="rounded-full flex items-center justify-center font-black select-none uppercase"
          style={{
            width: c.avatarW, height: c.avatarW, fontSize: c.avatarW * 0.3,
            background: '#1a1a1a',
            border: `2px solid ${c.borderColor}`,
            color: c.rankColor,
            boxShadow: `0 0 12px ${c.rankColor}55`,
          }}
        >
          {initials(entry.name)}
        </div>

        {/* Country code badge — top 3 only */}
        {entry.rank <= 3 && (
          <span style={{
            fontSize: 9, padding: '2px 5px', lineHeight: 1.4,
            background: 'rgba(255,255,255,0.1)',
            border: `1px solid ${c.borderColor}55`,
            color: '#E5E7EB',
            fontWeight: 700,
            letterSpacing: '0.05em',
            borderRadius: 3,
          }}>
            {entry.country.slice(0, 3).toUpperCase()}
          </span>
        )}

        <p className="font-black text-center w-full truncate leading-tight uppercase"
          style={{
            fontSize: c.nameSz,
            color: '#ffffff',
            letterSpacing: '0.05em',
            textShadow: '0 1px 10px rgba(0,0,0,0.95), 0 2px 16px rgba(0,0,0,0.8)',
          }}>
          {entry.name.split(' ')[0]}
        </p>

        <p className="font-black leading-none" style={{ fontSize: c.timeSz, color: c.rankColor, letterSpacing: '-0.02em', textShadow: `0 0 12px ${c.rankColor}88` }}>
          {entry.timeInSeconds.toFixed(1)}s
        </p>
      </div>

      {/* Pedestal — monolithic block */}
      <div
        className="w-full relative overflow-hidden flex items-end justify-center"
        style={{
          height: c.pedestalH,
          background: c.bgColor,
          borderTop: `6px solid ${c.rankColor}`,
          boxShadow: `inset 0 0 30px rgba(0,0,0,0.5), 0 0 20px ${c.rankColor}33`,
        }}
      >
        {/* Food emojis inside pedestal */}
        <span className="absolute select-none pointer-events-none"
          style={{ fontSize: c.emojiSz * 0.85, top: 4, left: 5, opacity: 0.12, lineHeight: 1, transform: 'rotate(-10deg)' }}>
          {c.foodEmojis[0]}
        </span>
        <span className="absolute select-none pointer-events-none"
          style={{ fontSize: c.emojiSz * 0.7, bottom: 6, right: 4, opacity: 0.10, lineHeight: 1, transform: 'rotate(8deg)' }}>
          {c.foodEmojis[1]}
        </span>

        {/* HUGE visible rank number */}
        <span
          className="absolute font-black select-none"
          style={{
            fontSize: c.pedestalH * 0.82,
            color: c.rankColor,
            opacity: 0.88,
            lineHeight: 1,
            bottom: -6,
            textShadow: `0 0 30px ${c.rankColor}66`,
          }}
        >
          {entry.rank}
        </span>
        <span
          className="absolute top-2 inset-x-0 text-center font-black select-none text-[10px] uppercase tracking-widest"
          style={{ color: `${c.rankColor}99` }}
        >
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
      <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,215,0,0.2)', position: 'relative', overflow: 'hidden' }}>

        <AnimatePresence>
          {isFetching && (
            <motion.div key="bar" initial={{ scaleX: 0, opacity: 1 }} animate={{ scaleX: 1, opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{ background: 'linear-gradient(90deg,#F5C518,#D4A000)', transformOrigin: 'left', zIndex: 10 }} />
          )}
        </AnimatePresence>

        {/* Week pills — scrollable flex-1 */}
        <div className="flex items-center gap-1.5 flex-1 min-w-0 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          <span className="shrink-0 text-[8px] font-black uppercase tracking-[0.2em] mr-0.5" style={{ color: 'rgba(255,215,0,0.5)' }}>Week</span>
          {weeks.map((w) => {
            const active = w.dateFrom === selectedWeek.dateFrom;
            return (
              <button key={w.dateFrom} onClick={() => setSelectedWeek(w)} disabled={isFetching}
                className={`filter-btn shrink-0 px-2.5 py-1 rounded-md text-[9px] font-black whitespace-nowrap uppercase tracking-wide ${active ? 'filter-btn-active' : 'filter-btn-dark'}`}
                style={active
                  ? { background: '#FFD700', color: '#000', boxShadow: '0 0 10px rgba(255,215,0,0.4)' }
                  : { background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.15)' }}>
                {w.label}
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="shrink-0 w-px self-stretch" style={{ background: 'rgba(255,215,0,0.15)' }} />

        {/* Country pills — fixed, no wrap */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="shrink-0 text-[8px] font-black uppercase tracking-[0.2em] mr-0.5" style={{ color: 'rgba(255,215,0,0.5)' }}>Country</span>
          {COUNTRIES.map((c) => {
            const active = c.code === selectedCountry;
            return (
              <button key={c.code} onClick={() => setSelectedCountry(c.code)} disabled={isFetching}
                className={`filter-btn px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-wide ${active ? 'filter-btn-active' : 'filter-btn-dark'}`}
                style={active
                  ? { background: '#FFD700', color: '#000', boxShadow: '0 0 10px rgba(255,215,0,0.4)' }
                  : { background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.15)' }}>
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
        className="flex flex-col items-center gap-4 p-8 rounded-lg text-center max-w-sm"
        style={{ background: '#1a1a1a', border: '1px solid rgba(255,215,0,0.3)', boxShadow: '0 8px 48px rgba(0,0,0,0.5), 0 0 32px rgba(255,215,0,0.08)' }}>
        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: '3.5rem', lineHeight: 1, filter: 'drop-shadow(0 0 16px rgba(255,215,0,0.5))' }}>🍔</motion.div>
        <div>
          <p className="font-black text-white text-lg mb-1 uppercase tracking-wider">No Entries Yet</p>
          <p className="text-sm" style={{ color: '#6B7280', lineHeight: 1.5 }}>Check back soon —<br />the shout-off is just getting started!</p>
        </div>
        <div className="flex gap-1">
          {[0,1,2].map(i => (
            <motion.div key={i} animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              className="w-1.5 h-1.5 rounded-full" style={{ background: '#FFD700' }} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function Design3({ entries, isFetching, weeks, selectedWeek, setSelectedWeek, selectedCountry, setSelectedCountry }) {
  const podiumOrder = [4, 2, 1, 3, 5];
  const get = (rank) => entries.find(e => e.rank === rank);
  const hasEntries = entries.length > 0;

  return (
    <div className="min-h-screen w-full flex flex-col" style={{ background: '#0d0d0d', fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* Navbar */}
      <nav
        className="w-full shrink-0 sticky top-0 z-50"
        style={{ height: 56, background: '#0d0d0d', borderBottom: '1px solid #FFD70033' }}
      >
        <div className="max-w-5xl mx-auto h-full flex items-center justify-between px-6 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-md text-base" style={{ background: '#1a1506', border: '1px solid #FFD70044' }}>🍔</div>
            <div>
              <p className="font-black text-sm uppercase tracking-widest leading-none" style={{ color: '#E5E7EB', letterSpacing: '0.08em' }}>Shake Shack</p>
              <p className="text-[9px] uppercase tracking-widest leading-none mt-0.5" style={{ color: '#4B5563' }}>Shout Challenge</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-wider" style={{ background: '#FFD700', color: '#000' }}>
            <Zap size={10} strokeWidth={3} /> Top 5 Win Free Meal
          </div>
        </div>
      </nav>

      {/* Hero + Filters + Podium */}
      <div
        className="w-full flex flex-col relative overflow-hidden"
        style={{
          minHeight: 'calc(100vh - 56px)',
          backgroundImage: 'repeating-linear-gradient(45deg,rgba(255,255,255,0.015) 0px,rgba(255,255,255,0.015) 1px,transparent 1px,transparent 40px)',
        }}
      >
        {/* Food bg emojis */}
        {BG_FOOD.map((f, i) => (
          <div key={i} className="absolute select-none pointer-events-none" aria-hidden="true"
            style={{ top: f.top, left: f.left, fontSize: f.sz, transform: `rotate(${f.rot})`, opacity: f.op, lineHeight: 1, zIndex: 0 }}>
            {f.e}
          </div>
        ))}

        {/* Filter bar */}
        <FilterBar weeks={weeks} selectedWeek={selectedWeek} setSelectedWeek={setSelectedWeek}
          selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} isFetching={isFetching} />

        {/* Hero — split layout */}
        <div className="max-w-5xl mx-auto w-full px-6 sm:px-8 pt-4 pb-2 relative z-10">
          <div className="flex items-start justify-between gap-6">
            {/* Left: text */}
            <div className="flex-1 min-w-0">
              <motion.div
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider mb-3"
                style={{ background: '#00C85122', color: '#00C851', border: '1px solid #00C85155' }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: '#00C851' }} />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: '#00C851' }} />
                </span>
                Live Leaderboard
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="font-black uppercase leading-none mb-2"
                style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.5rem)', color: '#F9FAFB', letterSpacing: '-0.01em', lineHeight: 0.95 }}
              >
                THE BIG
                <br />
                <span style={{ color: '#FFD700', textShadow: '0 0 20px rgba(255,215,0,0.5)' }}>SHACK</span>
                <br />
                SHOUT
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }}
                className="h-1 w-16 rounded-full mb-2"
                style={{ background: '#00C851', boxShadow: '0 0 12px rgba(0,200,81,0.6)' }}
              />

              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.32 }}
                style={{ color: '#6B7280', fontSize: '0.72rem', lineHeight: 1.5 }}
              >
                Say "THE BIIIIG SHACK" in one breath.
                <br />
                <span style={{ color: '#FFD700', fontWeight: 700 }}>Longest shout wins a FREE meal.</span>
              </motion.p>
            </div>

            {/* Right: food emoji collage */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 100, damping: 20 }}
              className="shrink-0 hidden sm:flex items-center justify-center"
              style={{ width: 160, height: 100, position: 'relative' }}
            >
              {[
                { e: '🍔', top: 0,  left: 20, sz: '3.5rem', rot: '-10deg' },
                { e: '🥤', top: 10, left: 90, sz: '2.8rem', rot: '12deg'  },
                { e: '🍟', top: 55, left: 5,  sz: '2.4rem', rot: '-5deg'  },
                { e: '🍦', top: 60, left: 80, sz: '2.2rem', rot: '8deg'   },
                { e: '🌭', top: 30, left: 55, sz: '2rem',   rot: '-15deg' },
              ].map((f, i) => (
                <div key={i} className="absolute select-none pointer-events-none" style={{ top: f.top, left: f.left, fontSize: f.sz, transform: `rotate(${f.rot})`, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.6))' }}>
                  {f.e}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Podium or empty state */}
        <AnimatePresence mode="wait">
          {hasEntries ? (
            <motion.div key="podium" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }} className="flex-1 flex flex-col justify-end relative z-10">
              <div className="max-w-5xl mx-auto w-full px-4 sm:px-8 pb-6">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="flex items-center gap-2 mb-4">
                  <span className="font-black text-[10px] uppercase tracking-[0.3em]" style={{ color: '#FFD700' }}>🏆 Top Shouters</span>
                  <div className="flex-1 h-px" style={{ background: 'rgba(255,215,0,0.2)' }} />
                </motion.div>
                <div className="relative rounded-lg" style={{ padding: '0 0 4px' }}>
                  <AnimatePresence>
                    {isFetching && (
                      <motion.div key="shimmer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }} className="podium-loading-overlay rounded-lg" />
                    )}
                  </AnimatePresence>
                  <motion.div animate={{ opacity: isFetching ? 0.65 : 1 }} transition={{ duration: 0.25 }}
                    className="flex items-end justify-center gap-3 overflow-x-auto flex-nowrap snap-x"
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
      <footer className="w-full relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0d1a0a 0%, #050f05 55%, #020802 100%)', borderTop: '1px solid #FFD70022' }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent 0%,#FFD700 30%,#FFD700 70%,transparent 100%)', opacity: 0.7 }} />
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
          {['🍔','🥤','🍟','🍦','🌭','🍿','🍔','🥤','🍟','🍦','🌭','🍿'].map((e, i) => (
            <span key={i} className="absolute" style={{
              fontSize: '2.8rem', opacity: 0.05,
              top: `${Math.floor(i / 6) * 55 + 10}%`,
              left: `${(i % 6) * 17 + 2}%`,
              transform: `rotate(${(i % 3 - 1) * 12}deg)`,
              lineHeight: 1,
            }}>{e}</span>
          ))}
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 py-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span style={{ fontSize: '1.5rem' }}>🍔</span>
            <span className="font-black text-base uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.92)', letterSpacing: '0.15em' }}>Shake Shack</span>
            <span style={{ fontSize: '1.5rem' }}>🏆</span>
          </div>
          <div className="h-px w-24 mx-auto mb-4" style={{ background: 'linear-gradient(90deg,transparent,#FFD700,transparent)' }} />
          <p className="text-center text-xs font-bold mb-1" style={{ color: 'rgba(255,255,255,0.82)' }}>
            The Big Shack Shout Challenge · Limited time campaign
          </p>
          <p className="text-center text-[11px]" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Results update in real-time · Top 5 winners contacted via WhatsApp 📱
          </p>
          <p className="text-center text-[10px] mt-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
            © 2026 Shake Shack · All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
