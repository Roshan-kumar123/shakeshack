import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Square } from 'lucide-react';
import AudioWave from './AudioWave';

function initials(name) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

const AVATAR_COLORS = [
  '#29603D', '#1E4D6B', '#7B3F00', '#5C2D91',
  '#8B0000', '#006064', '#37474F', '#4A148C',
];
const avatarColor = (id) => AVATAR_COLORS[id % AVATAR_COLORS.length];

export default function LeaderboardRow({ entry, isLast }) {
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
      variants={{
        hidden:  { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.25, ease: 'easeOut' } },
      }}
      className={[
        'flex items-center gap-4 sm:gap-5 px-5 sm:px-7 py-3.5 transition-colors duration-150',
        !isLast && 'border-b border-gray-100',
        winner ? 'bg-[#FFFDF5] hover:bg-[#FFF8E7]' : 'bg-white hover:bg-gray-50/70',
      ].filter(Boolean).join(' ')}
    >
      {/* Rank badge */}
      <div
        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0"
        style={winner
          ? { background: '#29603D', color: '#fff' }
          : { background: '#f3f4f6', color: '#9ca3af' }
        }
      >
        {entry.rank}
      </div>

      {/* Avatar */}
      <div
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-black shrink-0 select-none"
        style={{ backgroundColor: avatarColor(entry.id) }}
      >
        {initials(entry.name)}
      </div>

      {/* Name + phone */}
      <div className="flex flex-col min-w-0 flex-1 gap-px">
        <span className="font-semibold text-sm text-[#111827] truncate leading-snug">
          {entry.name}
          {winner && (
            <span
              className="ml-2 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full align-middle"
              style={{ background: '#DCFCE7', color: '#15803D' }}
            >
              Winner
            </span>
          )}
        </span>
        <span className="text-[11px] text-gray-400 font-mono truncate leading-snug">{entry.phoneSnippet}</span>
      </div>

      {/* Country */}
      <div className="hidden sm:flex items-center gap-2 shrink-0 min-w-0" style={{ width: 'clamp(80px, 12vw, 160px)' }}>
        <span className="text-lg leading-none shrink-0">{entry.flagEmoji}</span>
        <span className="text-xs text-gray-400 truncate hidden md:block">{entry.country}</span>
      </div>

      {/* Time */}
      <div
        className="shrink-0 text-right tabular-nums font-black text-sm sm:text-base"
        style={{ color: winner ? '#29603D' : '#9ca3af', width: '4rem' }}
      >
        {entry.timeInSeconds.toFixed(1)}s
      </div>

      {/* Play / Stop button — cursor: pointer */}
      <motion.button
        whileTap={{ scale: 0.86 }}
        whileHover={{ scale: 1.08 }}
        onClick={toggle}
        aria-label={playing ? 'Stop' : 'Play shout'}
        style={{ cursor: 'pointer' }}
        className={[
          'w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200',
          playing
            ? 'bg-[#29603D] text-white'
            : 'bg-gray-100 text-gray-500 hover:bg-[#29603D] hover:text-white',
        ].join(' ')}
      >
        {playing
          ? <AudioWave size="sm" />
          : <Play size={12} strokeWidth={0} style={{ fill: 'currentColor', marginLeft: 1 }} />
        }
      </motion.button>
    </motion.div>
  );
}
