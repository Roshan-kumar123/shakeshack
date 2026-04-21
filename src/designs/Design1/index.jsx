/**
 * Design 1 — Client Reference Exact Match
 * Layout order: Navbar → Logo → FilterBar → Live Leaderboard → Top Shouters → Podium
 */
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, ChevronDown, ChevronUp, Play, Pause, Mic } from 'lucide-react';
import AudioWave from '../../components/AudioWave';
import { COUNTRIES } from '../../utils/leaderboard';
import challengeLogo from '../../assets/challenge-logo-Buup4W0F.png';
import footerLogo from '../../assets/footer-logo.png';
import topShoutersImg from '../../assets/top-shouters.png';

function initials(name) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

const PCFG = {
  1: { glow: '0 0 0 2px rgba(245,197,24,0.8)', border: '#F5C518', avatarBg: '#1a4a2a', avatarBorder: 'rgba(245,197,24,0.7)', rankColor: '#F5C518', timeColor: '#F5C518', pedestalH: 120, w: 140, avatarW: 56, nameSz: 14, timeSz: 18, showCrown: true,  foodEmoji: '🍔' },
  2: { glow: '0 0 0 2px rgba(209,213,219,0.6)', border: 'rgba(255,255,255,0.25)', avatarBg: '#1e3a2a', avatarBorder: 'rgba(209,213,219,0.5)', rankColor: '#D1D5DB', timeColor: '#ffffff', pedestalH: 90,  w: 116, avatarW: 46, nameSz: 13, timeSz: 15, showCrown: false, foodEmoji: '🥤' },
  3: { glow: '0 0 0 2px rgba(205,127,50,0.6)',  border: 'rgba(255,255,255,0.2)',  avatarBg: '#1e3520', avatarBorder: 'rgba(205,127,50,0.5)',  rankColor: '#CD7F32', timeColor: '#ffffff', pedestalH: 70,  w: 104, avatarW: 38, nameSz: 12, timeSz: 14, showCrown: false, foodEmoji: '🍟' },
  4: { glow: '0 0 0 1px rgba(255,255,255,0.15)', border: 'rgba(255,255,255,0.12)', avatarBg: '#1a3020', avatarBorder: 'rgba(255,255,255,0.2)', rankColor: '#9CA3AF', timeColor: '#ffffff', pedestalH: 64,  w: 88,  avatarW: 30, nameSz: 11, timeSz: 12, showCrown: false, foodEmoji: '🍦' },
  5: { glow: '0 0 0 1px rgba(255,255,255,0.15)', border: 'rgba(255,255,255,0.12)', avatarBg: '#1a3020', avatarBorder: 'rgba(255,255,255,0.2)', rankColor: '#9CA3AF', timeColor: '#ffffff', pedestalH: 54,  w: 88,  avatarW: 28, nameSz: 11, timeSz: 11, showCrown: false, foodEmoji: '🌭' },
};

// ─── Podium audio player (inline, with AudioWave) ────────────────────────────
function PodiumAudio({ url }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const a = new Audio(url);
    a.preload = 'none';
    audioRef.current = a;
    a.onended = () => setPlaying(false);
    return () => { a.pause(); };
  }, [url]);

  function toggle(e) {
    e.stopPropagation();
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }

  return (
    <button onClick={toggle}
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full font-black text-[10px] transition-all shrink-0 cursor-pointer"
      style={{
        background: playing ? 'rgba(245,197,24,0.2)' : 'rgba(255,255,255,0.1)',
        border: `1px solid ${playing ? 'rgba(245,197,24,0.5)' : 'rgba(255,255,255,0.2)'}`,
        color: playing ? '#F5C518' : 'rgba(255,255,255,0.8)',
      }}>
      {playing
        ? <><AudioWave size="sm" /><span>Pause</span></>
        : <><Play size={9} fill="currentColor" /><span>Play</span></>
      }
    </button>
  );
}

// ─── Podium card ─────────────────────────────────────────────────────────────
function PodiumCard({ entry, delay }) {
  const c = PCFG[entry.rank];
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 100, damping: 16 }}
      className="flex flex-col items-center shrink-0"
      style={{ width: c.w }}
    >
      {/* Above-pedestal content */}
      <div className="flex flex-col items-center w-full pb-1.5 px-1" style={{ gap: entry.rank <= 3 ? 5 : 3 }}>
        {c.showCrown && (
          <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}>
            <Crown size={18} style={{ color: '#F5C518', fill: '#F5C518', filter: 'drop-shadow(0 0 8px rgba(245,197,24,0.9))' }} />
          </motion.div>
        )}

        {/* Avatar circle */}
        <div className="rounded-full flex items-center justify-center font-black select-none shrink-0"
          style={{ width: c.avatarW, height: c.avatarW, fontSize: c.avatarW * 0.33, background: c.avatarBg, border: `2px solid ${c.avatarBorder}`, boxShadow: c.glow, color: '#fff' }}>
          {initials(entry.name)}
        </div>

        {/* Country badge — only rank 1-3 */}
        {entry.rank <= 3 && (
          <span className="inline-flex items-center justify-center font-black rounded-sm"
            style={{ fontSize: 8, letterSpacing: '0.08em', padding: '1.5px 5px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.85)' }}>
            {entry.country.slice(0, 3).toUpperCase()}
          </span>
        )}

        {/* Name */}
        <p className="font-bold text-center w-full truncate leading-tight"
          style={{ fontSize: c.nameSz, color: '#ffffff' }}>
          {entry.name.split(' ')[0]}
        </p>

        {/* Time */}
        <p className="font-black leading-none" style={{ fontSize: c.timeSz, color: c.timeColor }}>
          {entry.timeInSeconds.toFixed(1)}s
        </p>

        {/* Play button — only if audio exists */}
        {entry.audioUrl && <PodiumAudio url={entry.audioUrl} />}
      </div>

      {/* Pedestal */}
      <div className="w-full rounded-t-xl relative overflow-hidden flex flex-col items-center justify-between pt-1.5 pb-1"
        style={{ height: c.pedestalH, background: entry.rank === 1 ? 'rgba(245,197,24,0.12)' : 'rgba(255,255,255,0.07)', border: `1px solid ${c.border}`, borderBottom: 'none' }}>
        {/* #N label top */}
        <span className="font-black select-none leading-none" style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)' }}>#{entry.rank}</span>
        {/* Food emoji middle */}
        <span className="select-none leading-none" style={{ fontSize: Math.max(c.pedestalH * 0.22, 13) }}>{c.foodEmoji}</span>
        {/* Rank number bottom */}
        <span className="font-black select-none leading-none" style={{ fontSize: c.pedestalH * 0.42, color: c.rankColor, lineHeight: 1 }}>{entry.rank}</span>
      </div>
    </motion.div>
  );
}

// ─── Week dropdown ────────────────────────────────────────────────────────────
function WeekDropdown({ weeks, selectedWeek, setSelectedWeek, isFetching }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative shrink-0">
      {/* Week pill — dark green bg, gold border, white text */}
      <button
        onClick={() => !isFetching && setOpen(o => !o)}
        className="flex items-center gap-2 px-4 py-1.5 rounded-full font-bold text-[12px] whitespace-nowrap cursor-pointer"
        style={{ background: 'transparent', color: '#ffffff', border: '1.5px solid #F5C518' }}>
        {selectedWeek.label}
        <ChevronDown size={13} style={{ color: '#F5C518', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-1 left-0 z-50 rounded-xl overflow-hidden min-w-40"
            style={{ background: '#0d2e1c', border: '1px solid rgba(245,197,24,0.25)', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
            {weeks.map((w) => {
              const active = w.dateFrom === selectedWeek.dateFrom;
              return (
                <button key={w.dateFrom}
                  onClick={() => { setSelectedWeek(w); setOpen(false); }}
                  className="w-full text-left px-4 py-2.5 text-[12px] font-medium whitespace-nowrap cursor-pointer"
                  style={{
                    background: active ? '#2563EB' : 'transparent',
                    color: active ? '#ffffff' : 'rgba(255,255,255,0.85)',
                    fontWeight: active ? 700 : 400,
                  }}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.background = '#2563EB'; e.currentTarget.style.color = '#ffffff'; } }}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; } }}>
                  {w.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Filter bar ───────────────────────────────────────────────────────────────
function FilterBar({ weeks, selectedWeek, setSelectedWeek, selectedCountry, setSelectedCountry, isFetching }) {
  return (
    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
      className="w-full px-4 sm:px-6 pt-4 pb-1 relative z-20 flex justify-center">
      <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl w-full max-w-2xl relative overflow-visible"
        style={{ background: 'rgba(10,41,26,0.8)', backdropFilter: 'blur(16px)', border: '1px solid rgba(245,197,24,0.25)' }}>

        {/* Loading bar */}
        <AnimatePresence>
          {isFetching && (
            <motion.div key="bar" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              className="absolute top-0 left-0 right-0 h-0.5 rounded-full"
              style={{ background: 'linear-gradient(90deg,#F5C518,#D4A000)', transformOrigin: 'left', zIndex: 10 }} />
          )}
        </AnimatePresence>

        {/* WEEK label + dropdown */}
        <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.15em]" style={{ color: 'rgba(255,255,255,0.5)' }}>Week</span>
        <WeekDropdown weeks={weeks} selectedWeek={selectedWeek} setSelectedWeek={setSelectedWeek} isFetching={isFetching} />

        {/* Divider */}
        <div className="shrink-0 w-px self-stretch" style={{ background: 'rgba(245,197,24,0.3)' }} />

        {/* COUNTRY label + pills */}
        <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.15em]" style={{ color: 'rgba(255,255,255,0.5)' }}>Country</span>
        <div className="flex items-center gap-2 flex-wrap">
          {COUNTRIES.map((c) => {
            const active = c.code === selectedCountry;
            return (
              <button key={c.code} onClick={() => !isFetching && setSelectedCountry(c.code)}
                className="px-3 py-1 rounded-full text-[12px] font-semibold transition-all cursor-pointer"
                style={active
                  ? { background: '#F5C518', color: '#1a1a1a' }
                  : { background: 'transparent', color: '#F5C518' }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.color = '#ffffff'; } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.color = '#F5C518'; } }}>
                {c.code}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        className="flex flex-col items-center gap-4 p-8 rounded-3xl text-center max-w-sm"
        style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 8px 48px rgba(0,0,0,0.25)' }}>
        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: '3rem', lineHeight: 1, filter: 'drop-shadow(0 0 16px rgba(245,197,24,0.5))' }}>🍔</motion.div>
        <div>
          <p className="font-black text-white text-lg mb-1">No Entries Yet</p>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>Check back soon —<br />the shout-off is just getting started!</p>
        </div>
        <div className="flex gap-1">
          {[0,1,2].map(i => (
            <motion.div key={i} animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              className="w-1.5 h-1.5 rounded-full" style={{ background: '#F5C518' }} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Analysis section (internal) ─────────────────────────────────────────────
function AudioPlayer({ url }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const a = new Audio(url);
    a.preload = 'none';
    audioRef.current = a;
    a.onended = () => setPlaying(false);
    return () => { a.pause(); };
  }, [url]);

  function toggle() {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play().then(() => setPlaying(true)).catch(() => setPlaying(false)); }
  }

  return (
    <button onClick={toggle}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-black text-[10px] transition-all cursor-pointer"
      style={{ background: playing ? 'rgba(245,197,24,0.2)' : 'rgba(255,255,255,0.08)', border: `1px solid ${playing ? 'rgba(245,197,24,0.45)' : 'rgba(255,255,255,0.15)'}`, color: playing ? '#F5C518' : 'rgba(255,255,255,0.75)' }}>
      {playing ? <><AudioWave size="sm" /><span>Pause</span></> : <><Play size={10} fill="currentColor" /><span>Play</span></>}
    </button>
  );
}

function AnalysisRow({ entry, index }) {
  const [open, setOpen] = useState(false);
  const a = entry.analysis;
  const hasAudio = !!entry.audioUrl;

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}
      className="rounded-xl overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}>

      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center gap-3 px-4 py-3 text-left">
        <span className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-black text-[11px]"
          style={{ background: 'linear-gradient(135deg,#F5C518,#D4A000)', color: '#1a1a1a' }}>{entry.rank}</span>
        <div className="flex-1 min-w-0">
          <p className="font-black text-white text-sm leading-none truncate">{entry.name}</p>
          <p className="text-[10px] mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.38)' }}>{entry.phone}</p>
        </div>
        <div className="shrink-0 text-right mr-1">
          <p className="font-black text-sm leading-none" style={{ color: '#F5C518' }}>{entry.timeInSeconds.toFixed(2)}s</p>
          <p className="text-[9px] mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>valid</p>
        </div>
        {a?.total_duration != null && (
          <div className="shrink-0 text-right mr-1">
            <p className="font-black text-sm leading-none" style={{ color: 'rgba(255,255,255,0.5)' }}>{Number(a.total_duration).toFixed(2)}s</p>
            <p className="text-[9px] mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>recorded</p>
          </div>
        )}
        {a ? (
          <span className="shrink-0 text-[10px] font-black px-2 py-0.5 rounded-full" style={{ background: 'rgba(245,197,24,0.12)', color: '#F5C518', border: '1px solid rgba(245,197,24,0.25)' }}>
            {a.rating.emoji} {a.rating.label}
          </span>
        ) : (
          <span className="shrink-0 text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.08)' }}>No analysis</span>
        )}
        <span style={{ color: 'rgba(255,255,255,0.25)' }}>{open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }} style={{ overflow: 'hidden' }}>
            <div className="px-4 pb-4 pt-1 flex flex-col gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: 'Valid Duration', value: `${entry.timeInSeconds.toFixed(2)}s`, accent: true },
                  { label: 'Total Recorded', value: a?.total_duration != null ? `${Number(a.total_duration).toFixed(2)}s` : '—' },
                  { label: 'Total Speech',   value: a?.total_speech   != null ? `${Number(a.total_speech).toFixed(2)}s`   : '—' },
                  { label: 'Longest Breath', value: a?.longest_speech != null ? `${Number(a.longest_speech).toFixed(2)}s` : '—' },
                ].map(stat => (
                  <div key={stat.label} className="rounded-lg px-3 py-2" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <p className="text-[9px] uppercase tracking-wider mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>{stat.label}</p>
                    <p className="font-black text-sm" style={{ color: stat.accent ? '#F5C518' : 'rgba(255,255,255,0.75)' }}>{stat.value}</p>
                  </div>
                ))}
              </div>
              {a?.transcript && (
                <div className="rounded-lg px-3 py-2.5 flex items-start gap-2" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <Mic size={11} className="shrink-0 mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }} />
                  <div>
                    <p className="text-[9px] uppercase tracking-wider mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>Transcript</p>
                    <p className="text-sm italic" style={{ color: 'rgba(255,255,255,0.72)' }}>"{a.transcript}"</p>
                  </div>
                </div>
              )}
              {hasAudio ? (
                <div className="flex items-center gap-3">
                  <AudioPlayer url={entry.audioUrl} />
                  <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>Voice recording</span>
                </div>
              ) : (
                <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.22)' }}>No audio available</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function AnalysisSection({ entries }) {
  if (!entries.length) return null;
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 pb-10">
      <div className="flex items-center gap-2 mb-3">
        <Mic size={11} style={{ color: '#F5C518' }} />
        <span className="text-white/70 font-black text-[10px] tracking-[0.3em] uppercase">Voice Analysis</span>
        <span className="text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider" style={{ background: 'rgba(245,197,24,0.12)', color: '#F5C518', border: '1px solid rgba(245,197,24,0.2)' }}>Internal</span>
        <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
      </div>
      <div className="flex flex-col gap-2">
        {entries.map((entry, i) => <AnalysisRow key={entry.rank} entry={entry} index={i} />)}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Design1({ entries, isFetching, weeks, selectedWeek, setSelectedWeek, selectedCountry, setSelectedCountry }) {
  const podiumOrder = [4, 2, 1, 3, 5];
  const get = (rank) => entries.find(e => e.rank === rank);
  const hasEntries = entries.length > 0;

  return (
    <div className="min-h-screen w-full flex flex-col" style={{ background: '#0a291a' }}>

      {/* ── Navbar ── */}
      <nav className="w-full shrink-0 sticky top-0 z-50 flex items-center justify-center"
        style={{ height: 69, background: '#0A291AE6', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <img src={footerLogo} alt="Shake Shack" style={{ height: 44, width: 'auto', objectFit: 'contain' }} />
      </nav>

      {/* Gold separator — full width solid */}
      <div className="w-full shrink-0" style={{ height: 1, background: 'rgba(245,197,24,0.4)' }} />

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col items-center w-full">

        {/* Challenge logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="pt-6 pb-2">
          <img
            src={challengeLogo}
            alt="The Big Shack Shout Challenge"
            style={{ height: 'clamp(90px, 14vw, 150px)', objectFit: 'contain', filter: 'drop-shadow(0 4px 20px rgba(245,197,24,0.25))' }}
          />
        </motion.div>

        {/* Filter bar */}
        <div className="w-full max-w-3xl">
          <FilterBar weeks={weeks} selectedWeek={selectedWeek} setSelectedWeek={setSelectedWeek}
            selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} isFetching={isFetching} />
        </div>

        {/* Live Leaderboard badge */}
        <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="mt-4 mb-2 inline-flex items-center gap-2 px-5 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.85)' }}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          Live Leaderboard
        </motion.div>

        {/* Top Shouters image */}
        <AnimatePresence mode="wait">
          {hasEntries ? (
            <motion.div key="podium" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
              className="w-full flex flex-col items-center">

              {/* top-shouters.png — below live badge, above podium */}
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                className="mb-4 mt-1">
                <img src={topShoutersImg} alt="Top Shouters"
                  style={{ height: 52, objectFit: 'contain' }} />
              </motion.div>

              {/* Podium */}
              <div className="w-full max-w-3xl px-4 sm:px-6 pb-6">
                <div className="relative">
                  <AnimatePresence>
                    {isFetching && (
                      <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 z-10 flex items-end justify-center gap-2 px-4 pb-1"
                        style={{ borderRadius: 16 }}>
                        {[104, 116, 140, 104, 88].map((w, i) => (
                          <div key={i} className="flex flex-col items-center shrink-0 animate-pulse" style={{ width: w }}>
                            <div className="rounded-full mb-2" style={{ width: w * 0.4, height: w * 0.4, background: 'rgba(255,255,255,0.1)' }} />
                            <div className="rounded mb-1.5" style={{ width: '70%', height: 8, background: 'rgba(255,255,255,0.1)' }} />
                            <div className="rounded mb-1.5" style={{ width: '50%', height: 10, background: 'rgba(245,197,24,0.15)' }} />
                            <div className="w-full rounded-t-xl" style={{ height: [70, 90, 120, 64, 54][i], background: 'rgba(255,255,255,0.07)' }} />
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <motion.div animate={{ opacity: isFetching ? 0 : 1 }} transition={{ duration: 0.25 }}
                    className="flex items-end justify-center gap-2 overflow-x-auto flex-nowrap pb-1"
                    style={{ scrollbarWidth: 'none' }}>
                    {podiumOrder.map((rank) => {
                      const entry = get(rank);
                      const delays = { 1: 0.1, 2: 0.2, 3: 0.35, 4: 0.28, 5: 0.42 };
                      return entry ? <PodiumCard key={rank} entry={entry} delay={delays[rank]} /> : null;
                    })}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex w-full">
              <EmptyState />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Voice Analysis — internal */}
        {entries.length > 0 && <AnalysisSection entries={entries} />}
      </div>

      {/* ── Footer ── */}
      <footer className="w-full shrink-0" style={{ background: '#0A291AE6', borderTop: '1px solid rgba(245,197,24,0.4)' }}>
        <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col items-center gap-3">
          <img src={footerLogo} alt="Shake Shack" style={{ height: 44, width: 'auto', objectFit: 'contain' }} />
          <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
            Limited time campaign · Results update in real-time<br />
            Top 5 winners contacted via WhatsApp 📱
          </p>
        </div>
      </footer>
    </div>
  );
}
