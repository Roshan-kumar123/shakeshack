import { motion } from 'framer-motion';
import LeaderboardRow from './LeaderboardRow';

export default function LeaderboardList({ entries }) {
  // Only ranks 6–10 (non-winners)
  const listEntries = entries.filter(e => e.rank > 5);

  return (
    <section className="w-full pb-16" style={{ background: '#F8FAFB' }}>

      {/* Smooth transition from dark green above */}
      <div className="h-10 w-full" style={{ background: 'linear-gradient(180deg,#1e5233 0%,#F8FAFB 100%)' }} />

      <div className="max-w-5xl mx-auto px-6 sm:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="flex items-center justify-between mb-4"
        >
          <div className="flex items-center gap-2">
            <span className="text-[#29603D] font-black text-[10px] tracking-[0.3em] uppercase">Full Rankings</span>
            <span className="text-gray-300 text-xs">·</span>
            <span className="text-gray-400 text-[10px]">Ranks 6 – 10</span>
          </div>
        </motion.div>

        {/* Column headers */}
        <div
          className="flex items-center gap-4 sm:gap-5 px-5 sm:px-7 py-2.5 rounded-xl mb-2"
          style={{ background: '#F1F5F9' }}
        >
          <div className="w-7 sm:w-8 shrink-0" />
          <div className="w-9 sm:w-10 shrink-0" />
          <span className="flex-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Participant</span>
          <span className="hidden sm:block text-[10px] font-bold text-gray-400 uppercase tracking-wider w-40">Country</span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider text-right w-16">Time</span>
          <div className="w-8 sm:w-9 shrink-0" />
        </div>

        {/* Rows */}
        <motion.div
          initial="hidden" animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.4 } } }}
          className="rounded-2xl overflow-hidden border border-gray-100 bg-white"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.04)' }}
        >
          {listEntries.map((entry, i) => (
            <LeaderboardRow
              key={entry.id}
              entry={entry}
              isLast={i === listEntries.length - 1}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
