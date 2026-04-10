/**
 * Design 3 — Bold Sporty (Dark Charcoal + Dream11 Energy)
 * Near-black bg, monolithic pedestals, massive rank numbers, neon-green + gold accents.
 * Split hero: left = text stack, right = food emoji collage.
 */
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Square, Crown, Zap } from 'lucide-react';
import AudioWave from '../../components/AudioWave';

function initials(name) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

const PCFG = {
  1: { w: 148, pedestalH: 140, rankColor: '#FFD700', borderColor: '#FFD700', bgColor: '#1a1506', foodEmojis: ['🍔','🥤'], emojiSz: 30, avatarW: 56, nameSz: 15, timeSz: 22, showCrown: true },
  2: { w: 120, pedestalH: 106, rankColor: '#C0C0C0', borderColor: '#C0C0C0', bgColor: '#141414', foodEmojis: ['🍟','🍦'], emojiSz: 22, avatarW: 44, nameSz: 14, timeSz: 17, showCrown: false },
  3: { w: 108, pedestalH: 78, rankColor: '#CD7F32', borderColor: '#CD7F32', bgColor: '#160d04', foodEmojis: ['🌭','🍿'], emojiSz: 18, avatarW: 38, nameSz: 13, timeSz: 14, showCrown: false },
  4: { w: 94, pedestalH: 54, rankColor: '#00C851', borderColor: '#00C851', bgColor: '#020d04', foodEmojis: ['🍔','🥤'], emojiSz: 14, avatarW: 32, nameSz: 12, timeSz: 12, showCrown: false },
  5: { w: 94, pedestalH: 44, rankColor: '#00C851', borderColor: '#00C851', bgColor: '#020d04', foodEmojis: ['🍟','🍦'], emojiSz: 13, avatarW: 30, nameSz: 12, timeSz: 11, showCrown: false },
};

const ROW_AVATAR_COLORS = [
  '#1a5e30','#0d3d5c','#5c2e00','#3a1a6e','#5c0000','#004d50','#1f2d35','#2d0d6e','#0e3d15','#072b5c',
];

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
  const [playing, setPlaying] = useState(false);
  const timer = useRef(null);

  function toggle() {
    if (playing) { setPlaying(false); clearTimeout(timer.current); }
    else { setPlaying(true); timer.current = setTimeout(() => setPlaying(false), 5000); }
  }
  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 120, damping: 14 }}
      className="flex flex-col items-center shrink-0 snap-center"
      style={{ width: c.w }}
    >
      {/* Above pedestal */}
      <div className="flex flex-col items-center w-full pb-2 px-1 gap-1">
        {c.showCrown && (
          <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
            <Crown size={20} style={{ color: '#FFD700', fill: '#FFD700', filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.9))' }} />
          </motion.div>
        )}

        <div style={{ fontSize: c.emojiSz, lineHeight: 1, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
          {c.foodEmojis[0]}
        </div>

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

        {/* Country code badge — replaces flag emoji (Windows rendering fix) */}
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

        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={toggle}
          type="button"
          aria-label={playing ? 'Stop' : 'Play shout'}
          style={{
            cursor: 'pointer', fontSize: 9, padding: '3px 9px',
            background: playing ? c.rankColor : 'transparent',
            color: playing ? '#000' : c.rankColor,
            border: `1px solid ${c.rankColor}`,
          }}
          className="flex items-center gap-1 rounded-full font-bold transition-all duration-150"
        >
          {playing
            ? <><Square size={7} strokeWidth={0} style={{ fill: 'currentColor', flexShrink: 0 }} /><AudioWave size="sm" /></>
            : <><Play size={7} strokeWidth={0} style={{ fill: 'currentColor', flexShrink: 0, marginLeft: 1 }} /><span>PLAY</span></>
          }
        </motion.button>
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

function LeaderboardRow({ entry, isLast }) {
  const [playing, setPlaying] = useState(false);
  const timer = useRef(null);

  function toggle() {
    if (playing) { setPlaying(false); clearTimeout(timer.current); }
    else { setPlaying(true); timer.current = setTimeout(() => setPlaying(false), 5000); }
  }
  useEffect(() => () => clearTimeout(timer.current), []);

  const winner = entry.isWinner;

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.22, ease: 'easeOut' } } }}
      className={[
        'flex items-center gap-4 sm:gap-5 px-5 sm:px-7 py-3.5 transition-colors duration-150',
        !isLast && 'border-b border-gray-800',
        winner ? 'hover:bg-[#1a1506]' : 'hover:bg-[#141414]',
      ].filter(Boolean).join(' ')}
      style={{ background: winner ? '#131005' : '#0d0d0d' }}
    >
      <div
        className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-black shrink-0 uppercase tracking-wider"
        style={winner
          ? { background: '#FFD700', color: '#000' }
          : { background: '#1a1a1a', color: '#4B5563', border: '1px solid #374151' }}
      >
        {entry.rank}
      </div>
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black shrink-0 select-none uppercase"
        style={{ backgroundColor: ROW_AVATAR_COLORS[entry.id % ROW_AVATAR_COLORS.length], border: winner ? '2px solid #FFD70044' : 'none', color: winner ? '#FFD700' : '#9CA3AF' }}
      >
        {initials(entry.name)}
      </div>
      <div className="flex flex-col min-w-0 flex-1 gap-0.5">
        <span className="font-black text-base uppercase tracking-wide truncate" style={{ color: '#F9FAFB', letterSpacing: '0.04em' }}>
          {entry.name}
          {winner && (
            <span className="ml-2 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-sm align-middle" style={{ background: '#FFD700', color: '#000' }}>
              WINNER
            </span>
          )}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-black px-1.5 py-px rounded-sm" style={{ background: '#FFD70022', color: '#FFD700', border: '1px solid #FFD70044' }}>
            {entry.country.slice(0, 3).toUpperCase()}
          </span>
          <span className="text-sm font-bold truncate" style={{ color: '#9CA3AF' }}>{entry.country}</span>
        </div>
        <span className="text-[11px] font-mono truncate" style={{ color: '#374151' }}>{entry.phoneSnippet}</span>
      </div>
      <div className="shrink-0 text-right tabular-nums font-black text-sm" style={{ color: winner ? '#FFD700' : '#4B5563', width: '4rem', textShadow: winner ? '0 0 8px rgba(255,215,0,0.5)' : 'none' }}>
        {entry.timeInSeconds.toFixed(1)}s
      </div>
      <motion.button
        whileTap={{ scale: 0.86 }} whileHover={{ scale: 1.08 }}
        onClick={toggle}
        aria-label={playing ? 'Stop' : 'Play shout'}
        style={{ cursor: 'pointer', background: playing ? '#00C851' : '#1a1a1a', color: playing ? '#000' : '#4B5563', border: '1px solid #374151' }}
        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200"
      >
        {playing ? <AudioWave size="sm" /> : <Play size={12} strokeWidth={0} style={{ fill: 'currentColor', marginLeft: 1 }} />}
      </motion.button>
    </motion.div>
  );
}

export default function Design3({ entries }) {
  const podiumOrder = [4, 2, 1, 3, 5];
  const get = (rank) => entries.find(e => e.rank === rank);

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

      {/* Hero + Podium */}
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

        {/* Hero — split layout */}
        <div className="max-w-5xl mx-auto w-full px-6 sm:px-8 pt-8 pb-4 relative z-10">
          <div className="flex items-start justify-between gap-6">
            {/* Left: text */}
            <div className="flex-1 min-w-0">
              <motion.div
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider mb-4"
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
                className="font-black uppercase leading-none mb-3"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: '#F9FAFB', letterSpacing: '-0.01em', lineHeight: 0.95 }}
              >
                THE BIG
                <br />
                <span style={{ color: '#FFD700', textShadow: '0 0 20px rgba(255,215,0,0.5)' }}>SHACK</span>
                <br />
                SHOUT
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }}
                className="h-1 w-16 rounded-full mb-3"
                style={{ background: '#00C851', boxShadow: '0 0 12px rgba(0,200,81,0.6)' }}
              />

              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.32 }}
                style={{ color: '#6B7280', fontSize: '0.75rem', lineHeight: 1.5 }}
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
              style={{ width: 160, height: 110, position: 'relative' }}
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

        {/* Podium */}
        <div className="flex-1 flex flex-col justify-end relative z-10">
          <div className="max-w-5xl mx-auto w-full px-4 sm:px-8 pb-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="flex items-center gap-2 mb-4">
              <span className="font-black text-[10px] uppercase tracking-[0.3em]" style={{ color: '#FFD700' }}>🏆 Top Shouters</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,215,0,0.2)' }} />
            </motion.div>

            <div
              className="flex items-end justify-center gap-2 sm:gap-3 overflow-x-auto sm:overflow-visible flex-nowrap snap-x sm:snap-none"
              style={{ scrollbarWidth: 'none' }}
            >
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
      <section className="w-full pb-16 relative" style={{ background: '#0d0d0d' }}>
        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg,transparent,#FFD70033,transparent)' }} />
        <div className="max-w-5xl mx-auto px-6 sm:px-8 pt-8 relative">

          {/* Food emoji margin decorations */}
          <div className="absolute left-0 top-16 bottom-16 w-10 hidden lg:flex flex-col justify-around items-center pointer-events-none select-none" aria-hidden="true" style={{ opacity: 0.18 }}>
            {['🍔','🥤','🍟','🍦','🌭'].map((e, i) => <span key={i} style={{ fontSize: '1.5rem' }}>{e}</span>)}
          </div>
          <div className="absolute right-0 top-16 bottom-16 w-10 hidden lg:flex flex-col justify-around items-center pointer-events-none select-none" aria-hidden="true" style={{ opacity: 0.18 }}>
            {['🍿','🍔','🥤','🍟','🍦'].map((e, i) => <span key={i} style={{ fontSize: '1.5rem' }}>{e}</span>)}
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="flex items-center gap-2 mb-4">
            <span className="font-black text-sm uppercase tracking-[0.2em]" style={{ color: '#E5E7EB' }}>Full Rankings</span>
            <span style={{ color: '#00C851', fontSize: '0.75rem', fontWeight: 900 }}>·</span>
            <span className="font-bold text-xs" style={{ color: '#9CA3AF' }}>Ranks 1–10</span>
            <div className="flex-1 h-px bg-gray-800" />
          </motion.div>

          <div className="flex items-center gap-4 sm:gap-5 px-5 sm:px-7 py-2.5 rounded-lg mb-2" style={{ background: '#1a1a1a' }}>
            <div className="w-8 shrink-0" />
            <div className="w-10 shrink-0" />
            <span className="flex-1 text-[10px] font-black uppercase tracking-wider" style={{ color: '#E5E7EB' }}>Participant</span>
            <span className="hidden sm:block text-[10px] font-black uppercase tracking-wider flex-1" style={{ color: '#E5E7EB' }}>Country</span>
            <span className="text-[10px] font-black uppercase tracking-wider text-right w-16" style={{ color: '#E5E7EB' }}>Time</span>
            <div className="w-9 shrink-0" />
          </div>

          <motion.div
            initial="hidden" animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.4 } } }}
            className="rounded-xl overflow-hidden"
            style={{ border: '1px solid #1F2937', boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}
          >
            {entries.map((entry, i) => (
              <LeaderboardRow key={entry.id} entry={entry} isLast={i === entries.length - 1} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0d1a0a 0%, #050f05 55%, #020802 100%)', borderTop: '1px solid #FFD70022' }}>
        {/* Gold shimmer accent line */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent 0%,#FFD700 30%,#FFD700 70%,transparent 100%)', opacity: 0.7 }} />

        {/* Food emoji wallpaper */}
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
          {/* Brand row */}
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
            © 2025 Shake Shack · All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
