import { motion } from 'framer-motion';
import { Mic2, Clock } from 'lucide-react';

export default function HeroSection() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ background: 'linear-gradient(160deg,#0f2d1a 0%,#1a4428 55%,#1e5233 100%)' }}
    >
      <div
        className="absolute top-0 right-0 w-125 h-125 pointer-events-none"
        style={{ background: 'radial-gradient(circle at top right,rgba(245,197,24,0.1) 0%,transparent 60%)' }}
      />

      {/* Compact padding — hero text stays tight so podium is above fold */}
      <div className="max-w-5xl mx-auto px-6 sm:px-8 pt-10 pb-8 text-center">

        <motion.div
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.85)' }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
          </span>
          Live Leaderboard
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="font-black text-white leading-tight tracking-tight mb-3"
          style={{ fontSize: 'clamp(1.7rem,3.5vw,3rem)' }}
        >
          The Big Shack Shout Challenge 🍔🗣️
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.28, type: 'spring', stiffness: 200, damping: 18 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl mb-3 font-black"
          style={{ fontSize: 'clamp(0.75rem,1.3vw,0.95rem)', background: 'linear-gradient(135deg,#F5C518,#D4A000)', color: '#1a1a1a', boxShadow: '0 4px 20px rgba(245,197,24,0.35)' }}
        >
          <Mic2 size={14} strokeWidth={2.5} />
          Say "THE BIIIIG SHACK" in one breath!
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-4 flex-wrap"
          style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.75rem' }}
        >
          <span className="flex items-center gap-1.5"><Clock size={11} /> Longest breath wins</span>
          <span className="w-px h-3 bg-white/20 hidden sm:block" />
          <span style={{ color: '#F5C518', fontWeight: 700 }}>🏆 Top 5 win a FREE Shake Shack meal</span>
        </motion.div>

      </div>

      {/* Podium section renders directly inside this dark bg — no wave needed */}
    </div>
  );
}
