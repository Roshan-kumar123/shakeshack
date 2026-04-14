/**
 * Design 4 — Vibrant Pop-Art / Neo-Brutalism
 * Shake Shack green bg, hard black borders, offset shadows,
 * zero border-radius, oversized food emojis as design elements,
 * bold yellow/white/orange rank fills.
 */
import { motion, AnimatePresence } from 'framer-motion';
import { Crown } from 'lucide-react';
import { COUNTRIES } from '../../utils/leaderboard';

function initials(name) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

const PCFG = {
  1: { w: 148, pedestalH: 136, cardBg: '#FFE600', rankColor: '#000', borderColor: '#000', foodEmojis: ['🍔','🥤'], emojiSz: '2.8rem', avatarW: 54, nameSz: 15, timeSz: 22, showCrown: true, nameColor: '#000', timeColor: '#000' },
  2: { w: 120, pedestalH: 104, cardBg: '#fff',    rankColor: '#000', borderColor: '#000', foodEmojis: ['🍟','🍦'], emojiSz: '2.2rem', avatarW: 44, nameSz: 14, timeSz: 17, showCrown: false, nameColor: '#000', timeColor: '#000' },
  3: { w: 108, pedestalH: 76,  cardBg: '#FF6B35', rankColor: '#fff', borderColor: '#000', foodEmojis: ['🌭','🍿'], emojiSz: '1.8rem', avatarW: 38, nameSz: 13, timeSz: 14, showCrown: false, nameColor: '#fff', timeColor: '#fff' },
  4: { w: 84,  pedestalH: 50,  cardBg: '#E5F0E8', rankColor: '#000', borderColor: '#000', foodEmojis: ['🍔','🥤'], emojiSz: '1.1rem', avatarW: 28, nameSz: 11, timeSz: 12, showCrown: false, nameColor: '#000', timeColor: '#000' },
  5: { w: 84,  pedestalH: 40,  cardBg: '#E5F0E8', rankColor: '#000', borderColor: '#000', foodEmojis: ['🍟','🍦'], emojiSz: '1rem',   avatarW: 26, nameSz: 11, timeSz: 11, showCrown: false, nameColor: '#000', timeColor: '#000' },
};

const BG_FOOD = [
  { e: '🍔', top: '4%',  left: '2%',   sz: '5rem',   rot: '-12deg', op: 0.07 },
  { e: '🥤', top: '7%',  left: '18%',  sz: '4.5rem', rot: '9deg',   op: 0.07 },
  { e: '🍟', top: '3%',  left: '38%',  sz: '5.5rem', rot: '-5deg',  op: 0.07 },
  { e: '🍦', top: '6%',  left: '57%',  sz: '4rem',   rot: '14deg',  op: 0.06 },
  { e: '🌭', top: '5%',  left: '74%',  sz: '4.5rem', rot: '-8deg',  op: 0.06 },
  { e: '🍿', top: '7%',  left: '90%',  sz: '4rem',   rot: '11deg',  op: 0.06 },
  { e: '🍔', top: '28%', left: '0%',   sz: '4rem',   rot: '7deg',   op: 0.06 },
  { e: '🥤', top: '30%', left: '93%',  sz: '4rem',   rot: '-6deg',  op: 0.06 },
  { e: '🍟', top: '55%', left: '1%',   sz: '4.5rem', rot: '-10deg', op: 0.06 },
  { e: '🍦', top: '53%', left: '92%',  sz: '4rem',   rot: '9deg',   op: 0.06 },
  { e: '🌭', top: '76%', left: '4%',   sz: '4rem',   rot: '12deg',  op: 0.05 },
  { e: '🍔', top: '78%', left: '89%',  sz: '4.5rem', rot: '-7deg',  op: 0.05 },
  { e: '🥤', top: '88%', left: '22%',  sz: '4rem',   rot: '6deg',   op: 0.05 },
  { e: '🍟', top: '90%', left: '58%',  sz: '4.5rem', rot: '-13deg', op: 0.05 },
  { e: '🍦', top: '85%', left: '76%',  sz: '4rem',   rot: '8deg',   op: 0.05 },
];

function PodiumCard({ entry, delay }) {
  const c = PCFG[entry.rank];
  const countryBadgeBg = c.cardBg === '#FFE600' ? 'rgba(0,0,0,0.12)' : c.cardBg === '#FF6B35' ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.08)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 130, damping: 14 }}
      className="flex flex-col items-center shrink-0 snap-center"
      style={{ width: c.w }}
    >
      {/* Above pedestal */}
      <div className="flex flex-col items-center w-full pb-2 px-1" style={{ gap: entry.rank <= 3 ? 4 : 3 }}>
        {c.showCrown && (
          <motion.div animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
            <Crown size={22} style={{ color: '#000', fill: '#FFE600' }} />
          </motion.div>
        )}

        {/* Food emoji — top 3 only */}
        {entry.rank <= 3 && <div style={{ fontSize: c.emojiSz, lineHeight: 1 }}>{c.foodEmojis[0]}</div>}

        {/* Avatar — brutalist square */}
        <div
          className="flex items-center justify-center font-black select-none"
          style={{
            width: c.avatarW, height: c.avatarW, fontSize: c.avatarW * 0.3,
            background: c.cardBg === '#fff' ? '#1a1a1a' : '#000',
            border: `2px solid ${c.borderColor}`,
            color: '#fff',
          }}
        >
          {initials(entry.name)}
        </div>

        {/* Country code badge — top 3 only */}
        {entry.rank <= 3 && (
          <span style={{
            fontSize: 9, padding: '2px 5px', lineHeight: 1.4,
            background: countryBadgeBg,
            border: '1.5px solid rgba(0,0,0,0.3)',
            color: c.nameColor,
            fontWeight: 900,
            letterSpacing: '0.05em',
          }}>
            {entry.country.slice(0, 3).toUpperCase()}
          </span>
        )}

        <p className="font-black text-center w-full truncate leading-tight"
          style={{
            fontSize: c.nameSz,
            color: c.nameColor,
            textShadow: c.nameColor === '#fff' ? '0 1px 8px rgba(0,0,0,0.7)' : 'none',
          }}>
          {entry.name.split(' ')[0]}
        </p>

        <p className="font-black leading-none" style={{ fontSize: c.timeSz, color: c.timeColor }}>
          {entry.timeInSeconds.toFixed(1)}s
        </p>
      </div>

      {/* Pedestal — flat brutalist block */}
      <div
        className="w-full relative overflow-hidden flex items-end justify-center"
        style={{
          height: c.pedestalH,
          background: c.cardBg,
          border: `3px solid ${c.borderColor}`,
          borderBottom: 'none',
          boxShadow: `5px 5px 0 #000`,
        }}
      >
        {/* Food emojis inside pedestal */}
        <span className="absolute select-none pointer-events-none"
          style={{ fontSize: '1.4rem', top: 5, left: 6, opacity: 0.14, lineHeight: 1, transform: 'rotate(-10deg)' }}>
          {c.foodEmojis[0]}
        </span>
        <span className="absolute select-none pointer-events-none"
          style={{ fontSize: '1.1rem', bottom: 8, right: 6, opacity: 0.12, lineHeight: 1, transform: 'rotate(8deg)' }}>
          {c.foodEmojis[1]}
        </span>

        {/* HUGE rank number */}
        <span
          className="absolute font-black select-none"
          style={{
            fontSize: c.pedestalH * 0.85,
            color: c.rankColor,
            opacity: 1,
            lineHeight: 1,
            bottom: -6,
          }}
        >
          {entry.rank}
        </span>
        <span
          className="absolute top-2 inset-x-0 text-center font-black select-none text-[10px]"
          style={{ color: c.rankColor === '#000' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.6)' }}
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
      <div className="flex items-center gap-3 px-3.5 py-2.5" style={{ background: '#FFE600', border: '3px solid #000', boxShadow: '4px 4px 0 #000', position: 'relative', overflow: 'hidden' }}>

        <AnimatePresence>
          {isFetching && (
            <motion.div key="bar" initial={{ scaleX: 0, opacity: 1 }} animate={{ scaleX: 1, opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{ background: '#000', transformOrigin: 'left', zIndex: 10 }} />
          )}
        </AnimatePresence>

        {/* Week pills — scrollable flex-1 */}
        <div className="flex items-center gap-1.5 flex-1 min-w-0 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          <span className="shrink-0 text-[8px] font-black uppercase tracking-[0.2em] mr-0.5 text-black/60">Week</span>
          {weeks.map((w) => {
            const active = w.dateFrom === selectedWeek.dateFrom;
            return (
              <button key={w.dateFrom} onClick={() => setSelectedWeek(w)} disabled={isFetching}
                className={`filter-btn shrink-0 px-2.5 py-1 text-[9px] font-black whitespace-nowrap ${active ? 'filter-btn-active' : 'filter-btn-brut'}`}
                style={active
                  ? { background: '#000', color: '#FFE600', border: '2px solid #000' }
                  : { background: '#fff', color: '#000', border: '2px solid #000' }}>
                {w.label}
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="shrink-0 w-0.5 self-stretch bg-black/20" />

        {/* Country pills — fixed, no wrap */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="shrink-0 text-[8px] font-black uppercase tracking-[0.2em] mr-0.5 text-black/60">Country</span>
          {COUNTRIES.map((c) => {
            const active = c.code === selectedCountry;
            return (
              <button key={c.code} onClick={() => setSelectedCountry(c.code)} disabled={isFetching}
                className={`filter-btn px-2.5 py-1 text-[9px] font-black ${active ? 'filter-btn-active' : 'filter-btn-brut'}`}
                style={active
                  ? { background: '#000', color: '#FFE600', border: '2px solid #000' }
                  : { background: '#fff', color: '#000', border: '2px solid #000' }}>
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
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 130, damping: 14 }}
        className="flex flex-col items-center gap-4 p-8 text-center max-w-sm"
        style={{ background: '#FFE600', border: '3px solid #000', boxShadow: '6px 6px 0 #000' }}>
        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: '3.5rem', lineHeight: 1 }}>🍔</motion.div>
        <div>
          <p className="font-black text-black text-lg mb-1 uppercase tracking-wide">No Entries Yet</p>
          <p className="text-sm text-black/70" style={{ lineHeight: 1.5 }}>Check back soon —<br />the shout-off is just getting started!</p>
        </div>
        <div className="flex gap-1">
          {[0,1,2].map(i => (
            <motion.div key={i} animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              style={{ width: 8, height: 8, background: '#000', border: '1.5px solid #000' }} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function Design4({ entries, isFetching, weeks, selectedWeek, setSelectedWeek, selectedCountry, setSelectedCountry }) {
  const podiumOrder = [4, 2, 1, 3, 5];
  const get = (rank) => entries.find(e => e.rank === rank);
  const hasEntries = entries.length > 0;

  const polkaDot = `radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)`;

  return (
    <div className="min-h-screen w-full flex flex-col" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* Navbar */}
      <nav
        className="w-full shrink-0 sticky top-0 z-50"
        style={{ height: 56, background: '#FFE600', borderBottom: '3px solid #000' }}
      >
        <div className="max-w-5xl mx-auto h-full flex items-center justify-between px-6 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="text-2xl leading-none">🍔</div>
            <div>
              <p className="font-black text-sm uppercase tracking-widest leading-none text-black" style={{ letterSpacing: '0.06em' }}>Shake Shack</p>
              <p className="text-[9px] uppercase tracking-wider leading-none mt-0.5 text-black/60">Shout Challenge</p>
            </div>
          </div>
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider"
            style={{ background: '#000', color: '#FFE600', border: '2px solid #000', boxShadow: '3px 3px 0 rgba(0,0,0,0.3)' }}
          >
            🏆 Top 5 Win Free Meal
          </div>
        </div>
      </nav>

      {/* Hero + Filters + Podium */}
      <div
        className="w-full flex flex-col relative overflow-hidden"
        style={{
          minHeight: 'calc(100vh - 56px)',
          background: `${polkaDot}, #29603D`,
          backgroundSize: '24px 24px, auto',
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

        {/* Hero text */}
        <div className="max-w-5xl mx-auto w-full px-6 sm:px-8 pt-4 pb-2 relative z-10">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
                className="inline-flex items-center gap-2 px-3 py-1 mb-2 text-[10px] font-black uppercase tracking-wider"
                style={{ background: '#FFE600', color: '#000', border: '2px solid #000', boxShadow: '2px 2px 0 rgba(0,0,0,0.3)' }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
                </span>
                Live Leaderboard
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.14, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="font-black uppercase leading-none mb-2"
                style={{
                  fontSize: 'clamp(1.6rem, 2.6vw, 2.5rem)',
                  color: '#FFE600',
                  letterSpacing: '-0.01em',
                  lineHeight: 0.95,
                  WebkitTextStroke: '2px #000',
                  paintOrder: 'stroke fill',
                }}
              >
                The Big Shack<br />Shout Challenge
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }}
                className="font-black text-white mb-1"
                style={{ fontSize: '0.75rem' }}
              >
                Say "THE BIIIIG SHACK" in one breath 🗣️
              </motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.34 }} style={{ color: '#FFE600', fontSize: '0.7rem', fontWeight: 700 }}>
                🏆 Top 5 win a FREE Shake Shack meal
              </motion.p>
            </div>

            {/* Decorative food elements — right side */}
            <div className="hidden sm:flex flex-col gap-1 items-center shrink-0 pt-2 relative z-10">
              {['🍔', '🥤', '🍟'].map((e, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 + i * 0.08, type: 'spring', stiffness: 150, damping: 12 }}
                  className="flex items-center justify-center font-black"
                  style={{
                    width: 52, height: 52,
                    background: i === 0 ? '#FFE600' : i === 1 ? '#fff' : '#FF6B35',
                    border: '3px solid #000',
                    boxShadow: '4px 4px 0 #000',
                    fontSize: '1.6rem',
                    lineHeight: 1,
                  }}
                >
                  {e}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Podium or empty state */}
        <AnimatePresence mode="wait">
          {hasEntries ? (
            <motion.div key="podium" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }} className="flex-1 flex flex-col justify-end relative z-10">
              <div className="max-w-5xl mx-auto w-full px-4 sm:px-8 pb-6">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex items-center gap-2 mb-4">
                  <span className="font-black text-[10px] uppercase tracking-[0.3em] text-white">🏆 Top Shouters</span>
                  <div className="flex-1 h-0.5 bg-black/20" />
                </motion.div>
                <div className="relative" style={{ padding: '0 0 4px' }}>
                  <AnimatePresence>
                    {isFetching && (
                      <motion.div key="shimmer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }} className="podium-loading-overlay" />
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
      <footer className="w-full relative overflow-hidden" style={{ background: '#1a1a1a', borderTop: '3px solid #000' }}>
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg,transparent 0%,#FFE600 30%,#FFE600 70%,transparent 100%)', opacity: 0.9 }} />
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
            <span className="text-2xl">🍔</span>
            <span className="font-black text-base uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.92)', letterSpacing: '0.15em' }}>Shake Shack</span>
            <span className="text-2xl">🏆</span>
          </div>
          <div className="h-0.5 w-24 mx-auto mb-4" style={{ background: 'linear-gradient(90deg,transparent,#FFE600,transparent)' }} />
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
