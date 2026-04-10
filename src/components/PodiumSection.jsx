import { motion } from 'framer-motion';
import PodiumCard from './PodiumCard';

export default function PodiumSection({ entries }) {
  const get = (rank) => entries.find(e => e.rank === rank);

  return (
    /*
      Sits inside the dark green hero background — no white card, no wrapper.
      pb-8 gives breathing room before the white list section below.
    */
    <section
      className="w-full pb-10"
      style={{ background: 'linear-gradient(180deg,#1a4428 0%,#1e5233 100%)' }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-8">

        {/* Section label — white text on dark bg */}
        <motion.div
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="flex items-center gap-2 mb-5 pt-2"
        >
          <span className="text-white font-black text-[10px] tracking-[0.3em] uppercase">🏆 Top Shouters</span>
          <div className="flex-1 h-px bg-white/25" />
        </motion.div>

        {/*
          5 cards: order 4 | 2 | 1 | 3 | 5
          Desktop: flex row, justify-center, gap-2
          Mobile: horizontal scroll with snap
        */}
        <div
          className="flex items-end justify-center gap-2 sm:gap-3 overflow-x-auto sm:overflow-visible flex-nowrap snap-x sm:snap-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {get(4) && <PodiumCard entry={get(4)} delay={0.35} />}
          {get(2) && <PodiumCard entry={get(2)} delay={0.2} />}
          {get(1) && <PodiumCard entry={get(1)} delay={0.1} />}
          {get(3) && <PodiumCard entry={get(3)} delay={0.25} />}
          {get(5) && <PodiumCard entry={get(5)} delay={0.4} />}
        </div>

      </div>
    </section>
  );
}
