import { motion } from 'framer-motion';

const DELAYS = [0, 0.2, 0.1, 0.3, 0.15];

/**
 * Animated audio-wave indicator — shown while a track is "playing".
 * Fixed width so it never overflows its button container.
 */
export default function AudioWave({ size = 'md' }) {
  const barW = size === 'sm' ? 2 : 3;
  const barH = size === 'sm' ? 8 : 13;
  const gap = 2;
  // Total width = 5 bars + 4 gaps
  const totalW = 5 * barW + 4 * gap;

  return (
    <span
      className="inline-flex items-end shrink-0 overflow-hidden"
      style={{ width: totalW, height: barH, gap }}
      aria-label="playing"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          className="bg-current rounded-sm shrink-0"
          style={{ width: barW, height: barH, transformOrigin: 'bottom' }}
          animate={{ scaleY: [0.25, 1, 0.25] }}
          transition={{
            duration: 0.65,
            repeat: Infinity,
            delay: DELAYS[i],
            ease: 'easeInOut',
          }}
        />
      ))}
    </span>
  );
}
