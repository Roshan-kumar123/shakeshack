import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { fetchLeaderboardData } from "./api/leaderboard";
import Design1 from "./designs/Design1";
import Design2 from "./designs/Design2";
import Design3 from "./designs/Design3";
import Design4 from "./designs/Design4";
import Design5 from "./designs/Design5";

function ErrorState({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-24 px-4 text-center bg-white">
      <span className="text-5xl mb-4">😬</span>
      <h2 className="font-black text-xl mb-2 text-[#1a1a1a]">
        Couldn't load results
      </h2>
      <p className="text-gray-400 text-sm mb-6">
        Check your connection and try again.
      </p>
      <button
        onClick={onRetry}
        className="bg-[#29603D] hover:bg-[#1e4d2f] text-white font-bold px-8 py-3 rounded-full text-sm transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}

function fireConfetti() {
  const opts = { startVelocity: 30, spread: 90, ticks: 60, zIndex: 9999 };
  const colors = ["#29603D", "#F5C518", "#ffffff", "#CD7F32", "#C0C0C0"];
  setTimeout(
    () =>
      confetti({
        ...opts,
        particleCount: 100,
        origin: { x: 0.25, y: 0.65 },
        colors,
      }),
    0,
  );
  setTimeout(
    () =>
      confetti({
        ...opts,
        particleCount: 100,
        origin: { x: 0.75, y: 0.65 },
        colors,
      }),
    160,
  );
}

// Dismiss the HTML splash screen — called only when data is ready (or on error)
function hideSplash() {
  const splash = document.getElementById("splash");
  if (!splash) return;
  splash.classList.add("hiding");
  setTimeout(() => splash.remove(), 480);
}

export default function App() {
  const [status, setStatus] = useState("loading");
  const [entries, setEntries] = useState([]);

  function load() {
    setStatus("loading");
    setEntries([]);
    fetchLeaderboardData()
      .then((data) => {
        setEntries(data);
        setStatus("success");
      })
      .catch(() => {
        setStatus("error");
        hideSplash();
      });
  }

  useEffect(() => {
    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (status === "success") {
      hideSplash();
      setTimeout(fireConfetti, 0);
    }
  }, [status]);

  if (status === "loading") return null; // keep splash visible — render nothing
  if (status === "error") return <ErrorState onRetry={load} />;

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/1" replace />} /> */}
        <Route path="/" element={<Design1 entries={entries} />} />
        <Route path="/1" element={<Design1 entries={entries} />} />
        <Route path="/2" element={<Design2 entries={entries} />} />
        <Route path="/3" element={<Design3 entries={entries} />} />
        <Route path="/4" element={<Design4 entries={entries} />} />
        <Route path="/5" element={<Design5 entries={entries} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
