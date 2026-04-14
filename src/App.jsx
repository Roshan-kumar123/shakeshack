import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { fetchLeaderboardData } from "./api/leaderboard";
import { generateWeeks, getDefaultWeek } from "./utils/leaderboard";
import Design1 from "./designs/Design1";
import Design2 from "./designs/Design2";
import Design3 from "./designs/Design3";
import Design4 from "./designs/Design4";
import Design5 from "./designs/Design5";

// Weeks computed once — stable across renders
const WEEKS = generateWeeks();

function hideSplash() {
  const splash = document.getElementById("splash");
  if (!splash) return;
  splash.classList.add("hiding");
  setTimeout(() => splash.remove(), 480);
}

function fireConfetti() {
  const opts = { startVelocity: 30, spread: 90, ticks: 60, zIndex: 9999 };
  const colors = ["#29603D", "#F5C518", "#ffffff", "#CD7F32", "#C0C0C0"];
  setTimeout(() => confetti({ ...opts, particleCount: 100, origin: { x: 0.25, y: 0.65 }, colors }), 0);
  setTimeout(() => confetti({ ...opts, particleCount: 100, origin: { x: 0.75, y: 0.65 }, colors }), 160);
}

function ErrorState({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-24 px-4 text-center" style={{ background: "#0a2818" }}>
      <span className="text-5xl mb-4">😬</span>
      <h2 className="font-black text-xl mb-2 text-white">Couldn't load results</h2>
      <p className="text-white/40 text-sm mb-6">Check your connection and try again.</p>
      <button
        onClick={onRetry}
        className="bg-[#29603D] hover:bg-[#1e4d2f] text-white font-bold px-8 py-3 rounded-full text-sm transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}

export default function App() {
  const [status, setStatus]               = useState("loading");
  const [entries, setEntries]             = useState([]);
  const [isFetching, setIsFetching]       = useState(false);
  const [selectedWeek, setSelectedWeek]   = useState(() => getDefaultWeek(WEEKS));
  const [selectedCountry, setSelectedCountry] = useState("KSA");

  const hasLoadedOnce = useRef(false);

  async function load(week, country, isInitial) {
    if (isInitial) {
      setStatus("loading");
    } else {
      setIsFetching(true);
    }

    try {
      const data = await fetchLeaderboardData({
        country,
        dateFrom: week.dateFrom,
        dateTo:   week.dateTo,
      });
      setEntries(data);
      setStatus("success");

      if (!hasLoadedOnce.current) {
        hasLoadedOnce.current = true;
        hideSplash();
        setTimeout(fireConfetti, 0);
      }
    } catch {
      if (isInitial) {
        setStatus("error");
        hideSplash();
      }
      // On filter-change error, keep showing existing entries
    } finally {
      setIsFetching(false);
    }
  }

  // Initial load
  useEffect(() => {
    load(selectedWeek, selectedCountry, true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Re-fetch when filters change (skip initial — handled above)
  useEffect(() => {
    if (!hasLoadedOnce.current) return;
    load(selectedWeek, selectedCountry, false);
  }, [selectedWeek, selectedCountry]);

  if (status === "loading") return null; // Keep splash screen visible
  if (status === "error")   return <ErrorState onRetry={() => load(selectedWeek, selectedCountry, true)} />;

  const sharedProps = {
    entries,
    isFetching,
    weeks:           WEEKS,
    selectedWeek,
    setSelectedWeek,
    selectedCountry,
    setSelectedCountry,
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<Design1 {...sharedProps} />} />
        <Route path="/1" element={<Design1 {...sharedProps} />} />
        <Route path="/2" element={<Design2 {...sharedProps} />} />
        <Route path="/3" element={<Design3 {...sharedProps} />} />
        <Route path="/4" element={<Design4 {...sharedProps} />} />
        <Route path="/5" element={<Design5 {...sharedProps} />} />
        <Route path="*"  element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
