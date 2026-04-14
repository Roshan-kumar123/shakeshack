/**
 * Design 4 — Vibrant Pop-Art / Neo-Brutalism
 * Shake Shack green bg, hard black borders, offset shadows,
 * zero border-radius, oversized food emojis as design elements,
 * bold yellow/white/orange rank fills.
 */
import { motion } from 'framer-motion';
import { Crown } from 'lucide-react';

function initials(name) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

const PCFG = {
  1: { w: 148, pedestalH: 136, cardBg: '#FFE600', rankColor: '#000', borderColor: '#000', foodEmojis: ['🍔','🥤'], emojiSz: '2.8rem', avatarW: 54, nameSz: 15, timeSz: 22, showCrown: true, nameColor: '#000', timeColor: '#000' },
  2: { w: 120, pedestalH: 104, cardBg: '#fff',    rankColor: '#000', borderColor: '#000', foodEmojis: ['🍟','🍦'], emojiSz: '2.2rem', avatarW: 44, nameSz: 14, timeSz: 17, showCrown: false, nameColor: '#000', timeColor: '#000' },
  3: { w: 108, pedestalH: 76,  cardBg: '#FF6B35', rankColor: '#fff', borderColor: '#000', foodEmojis: ['🌭','🍿'], emojiSz: '1.8rem', avatarW: 38, nameSz: 13, timeSz: 14, showCrown: false, nameColor: '#fff', timeColor: '#fff' },
  4: { w: 94,  pedestalH: 52,  cardBg: '#E5F0E8', rankColor: '#000', borderColor: '#000', foodEmojis: ['🍔','🥤'], emojiSz: '1.5rem', avatarW: 32, nameSz: 12, timeSz: 12, showCrown: false, nameColor: '#000', timeColor: '#000' },
  5: { w: 94,  pedestalH: 44,  cardBg: '#E5F0E8', rankColor: '#000', borderColor: '#000', foodEmojis: ['🍟','🍦'], emojiSz: '1.4rem', avatarW: 30, nameSz: 12, timeSz: 11, showCrown: false, nameColor: '#000', timeColor: '#000' },
};

const ROW_AVATAR_COLORS = [
  '#FFE600','#ffffff','#FF6B35','#29603D','#FFE600','#ffffff','#FF6B35','#29603D','#FFE600','#ffffff',
];
const ROW_AVATAR_TEXT = [
  '#000','#000','#fff','#fff','#000','#000','#fff','#fff','#000','#000',
];

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

  // Country badge text color adapts to card bg
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
      <div className="flex flex-col items-center w-full pb-2 px-1 gap-1">
        {c.showCrown && (
          <motion.div animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
            <Crown size={22} style={{ color: '#000', fill: '#FFE600' }} />
          </motion.div>
        )}

        {/* Oversized food emoji */}
        <div style={{ fontSize: c.emojiSz, lineHeight: 1 }}>{c.foodEmojis[0]}</div>

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

        {/* Country code badge */}
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

        {/* HUGE rank number — fully solid */}
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

function LeaderboardRow({ entry, isLast }) {
  const winner = entry.isWinner;

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.22, ease: 'easeOut' } } }}
      className={[
        'flex items-center gap-4 sm:gap-5 px-5 sm:px-7 py-3.5 transition-colors duration-100',
        !isLast && 'border-b-2 border-black',
        winner ? 'hover:bg-[#FFF9D0]' : 'hover:bg-[#F0F7F2]',
      ].filter(Boolean).join(' ')}
      style={{ background: winner ? '#FFFDE8' : '#fff' }}
    >
      <div
        className="w-8 h-8 flex items-center justify-center text-xs font-black shrink-0"
        style={winner
          ? { background: '#FFE600', color: '#000', border: '2px solid #000', boxShadow: '2px 2px 0 #000' }
          : { background: '#fff', color: '#9CA3AF', border: '2px solid #D1D5DB' }}
      >
        {entry.rank}
      </div>
      <div
        className="w-10 h-10 flex items-center justify-center text-sm font-black shrink-0 select-none"
        style={{
          backgroundColor: ROW_AVATAR_COLORS[entry.id % ROW_AVATAR_COLORS.length],
          color: ROW_AVATAR_TEXT[entry.id % ROW_AVATAR_TEXT.length],
          border: '2px solid #000',
          boxShadow: winner ? '2px 2px 0 #000' : 'none',
        }}
      >
        {initials(entry.name)}
      </div>
      <div className="flex flex-col min-w-0 flex-1 gap-0.5">
        <span className="font-black text-base text-[#111827] truncate leading-snug">
          {entry.name}
          {winner && (
            <span className="ml-2 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 align-middle" style={{ background: '#FFE600', color: '#000', border: '1.5px solid #000' }}>
              WINNER
            </span>
          )}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-black px-1.5 py-px" style={{ background: '#29603D', color: '#fff', border: '1.5px solid #000' }}>
            {entry.country.slice(0, 3).toUpperCase()}
          </span>
          <span className="text-sm font-bold truncate" style={{ color: '#1a4428' }}>{entry.country}</span>
        </div>
        <span className="text-[11px] text-gray-400 font-mono truncate">{entry.phoneSnippet}</span>
      </div>
      <div className="shrink-0 text-right tabular-nums font-black text-sm w-16" style={{ color: winner ? '#000' : '#9CA3AF' }}>
        {entry.timeInSeconds.toFixed(1)}s
      </div>
    </motion.div>
  );
}

export default function Design4({ entries }) {
  const podiumOrder = [4, 2, 1, 3, 5];
  const get = (rank) => entries.find(e => e.rank === rank);

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

      {/* Hero + Podium */}
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

        {/* Hero text */}
        <div className="max-w-5xl mx-auto w-full px-6 sm:px-8 pt-8 pb-2 relative z-10">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
                className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-[10px] font-black uppercase tracking-wider"
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
                  fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
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
                style={{ fontSize: '0.8rem' }}
              >
                Say "THE BIIIIG SHACK" in one breath 🗣️
              </motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.34 }} style={{ color: '#FFE600', fontSize: '0.72rem', fontWeight: 700 }}>
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

        {/* Podium */}
        <div className="flex-1 flex flex-col justify-end relative z-10">
          <div className="max-w-5xl mx-auto w-full px-4 sm:px-8 pb-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex items-center gap-2 mb-4">
              <span className="font-black text-[10px] uppercase tracking-[0.3em] text-white">🏆 Top Shouters</span>
              <div className="flex-1 h-0.5 bg-black/20" />
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
      <section className="w-full pb-16 bg-white relative">
        <div className="h-1 w-full bg-black" />
        <div className="max-w-5xl mx-auto px-6 sm:px-8 pt-8 relative">

          {/* Food emoji margin decorations */}
          <div className="absolute left-0 top-16 bottom-16 w-10 hidden lg:flex flex-col justify-around items-center pointer-events-none select-none" aria-hidden="true" style={{ opacity: 0.15 }}>
            {['🍔','🥤','🍟','🍦','🌭'].map((e, i) => <span key={i} style={{ fontSize: '1.5rem' }}>{e}</span>)}
          </div>
          <div className="absolute right-0 top-16 bottom-16 w-10 hidden lg:flex flex-col justify-around items-center pointer-events-none select-none" aria-hidden="true" style={{ opacity: 0.15 }}>
            {['🍿','🍔','🥤','🍟','🍦'].map((e, i) => <span key={i} style={{ fontSize: '1.5rem' }}>{e}</span>)}
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="flex items-center gap-2 mb-4">
            <span className="font-black text-sm uppercase tracking-[0.2em] text-black">Full Rankings</span>
            <span style={{ color: '#29603D', fontSize: '0.75rem', fontWeight: 900 }}>·</span>
            <span className="font-bold text-xs text-black/60">Ranks 1–10</span>
            <div className="flex-1 h-0.5 bg-black" />
          </motion.div>

          <div className="flex items-center gap-4 sm:gap-5 px-5 sm:px-7 py-2.5 mb-2 border-b-2 border-black" style={{ background: '#F9FAFB' }}>
            <div className="w-8 shrink-0" />
            <div className="w-10 shrink-0" />
            <span className="flex-1 text-[10px] font-black uppercase tracking-wider text-black">Participant</span>
            <span className="hidden sm:block text-[10px] font-black uppercase tracking-wider flex-1 text-black">Country</span>
            <span className="text-[10px] font-black uppercase tracking-wider text-right w-16 text-black">Time</span>
          </div>

          <motion.div
            initial="hidden" animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.4 } } }}
            className="overflow-hidden"
            style={{ border: '2px solid #000', boxShadow: '5px 5px 0 #000' }}
          >
            {entries.map((entry, i) => (
              <LeaderboardRow key={entry.id} entry={entry} isLast={i === entries.length - 1} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full relative overflow-hidden" style={{ background: '#1a1a1a', borderTop: '3px solid #000' }}>
        {/* Yellow shimmer accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg,transparent 0%,#FFE600 30%,#FFE600 70%,transparent 100%)', opacity: 0.9 }} />

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
            <span className="text-2xl">🍔</span>
            <span className="font-black text-base uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.92)', letterSpacing: '0.15em' }}>Shake Shack</span>
            <span className="text-2xl">🏆</span>
          </div>
          <div className="h-0.5 w-24 mx-auto mb-4 bg-black" style={{ background: 'linear-gradient(90deg,transparent,#FFE600,transparent)' }} />

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
