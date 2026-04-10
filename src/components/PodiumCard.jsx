import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Square, Crown } from 'lucide-react';
import AudioWave from './AudioWave';

const CFG = {
  1: {
    w: 148, pedestalH: 140,
    pedestalBg: 'linear-gradient(180deg,#FEF08A 0%,#EAB308 40%,#CA8A04 100%)',
    ring: '0 0 0 3px #FDE047, 0 6px 20px rgba(0,0,0,0.2)',
    avatarBg: 'linear-gradient(135deg,#FEF9C3,#CA8A04)',
    avatarW: 58, fontSize: 16, nameSz: 13, timeSz: 22,
    timeColor: '#713F12', btnBg: '#CA8A04', btnHover: '#A16207',
    showCrown: true, crownColor: '#F5C518',
    rankColor: 'rgba(255,255,255,0.65)', foodEmoji: '🍔',
  },
  2: {
    w: 120, pedestalH: 108,
    pedestalBg: 'linear-gradient(180deg,#F3F4F6 0%,#D1D5DB 40%,#9CA3AF 100%)',
    ring: '0 0 0 3px #D1D5DB, 0 4px 14px rgba(0,0,0,0.14)',
    avatarBg: 'linear-gradient(135deg,#F9FAFB,#6B7280)',
    avatarW: 46, fontSize: 13, nameSz: 11, timeSz: 17,
    timeColor: '#374151', btnBg: '#6B7280', btnHover: '#4B5563',
    showCrown: false, crownColor: 'transparent',
    rankColor: 'rgba(255,255,255,0.6)', foodEmoji: '🍟',
  },
  3: {
    w: 108, pedestalH: 80,
    pedestalBg: 'linear-gradient(180deg,#FED7AA 0%,#F97316 40%,#C2410C 100%)',
    ring: '0 0 0 3px #FB923C, 0 4px 14px rgba(0,0,0,0.14)',
    avatarBg: 'linear-gradient(135deg,#FFF7ED,#C2410C)',
    avatarW: 40, fontSize: 12, nameSz: 10, timeSz: 15,
    timeColor: '#7C2D12', btnBg: '#C2410C', btnHover: '#9A3412',
    showCrown: false, crownColor: 'transparent',
    rankColor: 'rgba(255,255,255,0.6)', foodEmoji: '🥤',
  },
  4: {
    w: 96, pedestalH: 58,
    pedestalBg: 'linear-gradient(180deg,#DBEAFE 0%,#93C5FD 40%,#3B82F6 100%)',
    ring: '0 0 0 3px #93C5FD, 0 4px 12px rgba(0,0,0,0.12)',
    avatarBg: 'linear-gradient(135deg,#EFF6FF,#3B82F6)',
    avatarW: 36, fontSize: 11, nameSz: 10, timeSz: 14,
    timeColor: '#1E40AF', btnBg: '#3B82F6', btnHover: '#2563EB',
    showCrown: false, crownColor: 'transparent',
    rankColor: 'rgba(255,255,255,0.6)', foodEmoji: '🌭',
  },
  5: {
    w: 96, pedestalH: 48,
    pedestalBg: 'linear-gradient(180deg,#FCE7F3 0%,#F9A8D4 40%,#EC4899 100%)',
    ring: '0 0 0 3px #F9A8D4, 0 4px 12px rgba(0,0,0,0.12)',
    avatarBg: 'linear-gradient(135deg,#FDF2F8,#EC4899)',
    avatarW: 34, fontSize: 10, nameSz: 9, timeSz: 13,
    timeColor: '#9D174D', btnBg: '#EC4899', btnHover: '#DB2777',
    showCrown: false, crownColor: 'transparent',
    rankColor: 'rgba(255,255,255,0.6)', foodEmoji: '🍦',
  },
};

function initials(name) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

export default function PodiumCard({ entry, delay = 0 }) {
  const c = CFG[entry.rank];
  const [playing, setPlaying] = useState(false);
  const timer = useRef(null);

  function toggle() {
    if (playing) { setPlaying(false); clearTimeout(timer.current); }
    else { setPlaying(true); timer.current = setTimeout(() => setPlaying(false), 5000); }
  }
  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 110, damping: 18 }}
      className="flex flex-col items-center shrink-0 snap-center"
      style={{ width: c.w }}
    >
      {/* Info above pedestal */}
      <div className="flex flex-col items-center w-full pb-2 px-1 gap-1">

        {c.showCrown && (
          <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
            <Crown size={20} style={{ color: c.crownColor, fill: c.crownColor, filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.25))' }} />
          </motion.div>
        )}

        {/* Food emoji — decorative brand element */}
        <div className="text-2xl leading-none select-none mb-0.5"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))', fontSize: entry.rank <= 2 ? 22 : 16 }}>
          {c.foodEmoji}
        </div>

        {/* Avatar */}
        <div className="rounded-full flex items-center justify-center text-white font-black select-none"
          style={{ width: c.avatarW, height: c.avatarW, fontSize: c.fontSize, background: c.avatarBg, boxShadow: c.ring }}>
          {initials(entry.name)}
        </div>

        <span style={{ fontSize: 13, lineHeight: 1 }}>{entry.flagEmoji}</span>

        <p className="font-bold text-center w-full truncate leading-tight text-white drop-shadow" style={{ fontSize: c.nameSz }}>
          {entry.name.split(' ')[0]}
        </p>

        <p className="font-black leading-none text-white drop-shadow" style={{ fontSize: c.timeSz }}>
          {entry.timeInSeconds.toFixed(1)}s
        </p>

        <motion.button
          whileTap={{ scale: 0.86 }}
          onClick={toggle}
          type="button"
          aria-label={playing ? 'Stop shout' : 'Play shout'}
          style={{ cursor: 'pointer', fontSize: 9, padding: '3px 9px', background: playing ? c.btnHover : c.btnBg, color: '#fff' }}
          className="flex items-center gap-1 rounded-full font-bold transition-colors duration-150"
        >
          {playing
            ? <><Square size={7} strokeWidth={0} style={{ fill: 'currentColor', flexShrink: 0 }} /><AudioWave size="sm" /></>
            : <><Play size={7} strokeWidth={0} style={{ fill: 'currentColor', flexShrink: 0, marginLeft: 1 }} /><span>Play</span></>
          }
        </motion.button>
      </div>

      {/* Pedestal */}
      <div className="w-full rounded-t-xl relative overflow-hidden flex items-end justify-center"
        style={{ height: c.pedestalH, background: c.pedestalBg, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 16px rgba(0,0,0,0.15)' }}>
        <span className="select-none font-black text-white" style={{ fontSize: c.pedestalH * 0.7, opacity: 0.08, marginBottom: '-0.1em', lineHeight: 1 }}>
          {entry.rank}
        </span>
        <span className="absolute top-1.5 inset-x-0 text-center font-black select-none" style={{ fontSize: 10, color: c.rankColor }}>
          #{entry.rank}
        </span>
        <div className="absolute inset-x-0 top-0 h-6 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom,rgba(255,255,255,0.18),transparent)' }} />
      </div>
    </motion.div>
  );
}
