import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 w-full"
      style={{
        background: "#1a4428",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {/* Gold accent line */}
      <div
        className="h-1 w-full"
        style={{
          background:
            "linear-gradient(90deg, #F5C518 0%, rgba(255,255,255,0.6) 50%, #F5C518 100%)",
        }}
      />

      {/* FIXED WRAPPER: Perfectly balanced max-width and equal left/right padding */}
      <div className="max-w-5xl mx-auto w-full h-16 flex items-center justify-between px-6 sm:px-8">
        {/* Brand — left */}
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-xl shrink-0"
            style={{ background: "rgba(255,255,255,0.12)" }}
          >
            🍔
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-white font-black text-sm sm:text-base tracking-[0.15em] uppercase">
              Shake Shack
            </span>
            <span className="text-white/45 text-[9px] tracking-[0.12em] uppercase font-medium mt-0.5">
              Big Shack Shout Challenge
            </span>
          </div>
        </div>

        {/* Prize pill — right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.4,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="flex items-center gap-2 rounded-full font-black text-xs"
          style={{
            background: "linear-gradient(135deg, #F5C518 0%, #D4A000 100%)",
            color: "#1a1a1a",
            padding: "8px 16px",
            boxShadow: "0 2px 16px rgba(245,197,24,0.45)",
            whiteSpace: "nowrap",
          }}
        >
          <Trophy size={13} strokeWidth={2.5} />
          <span className="hidden sm:inline">Top 10 Win a FREE Meal</span>
          <span className="sm:hidden">Top 10 🏆</span>
        </motion.div>
      </div>
    </motion.header>
  );
}
