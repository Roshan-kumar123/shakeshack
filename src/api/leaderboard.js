import { mockLeaderboard } from '../data/mockLeaderboard';

/**
 * Fetches leaderboard data.
 *
 * API INTEGRATION POINT:
 * When the real backend is ready, replace the body of this function with:
 *
 *   const res = await fetch('https://api.example.com/shout-challenge/leaderboard');
 *   if (!res.ok) throw new Error(`HTTP ${res.status}`);
 *   return res.json();
 *
 * The rest of the app (App.jsx and all components) requires zero changes.
 *
 * @returns {Promise<Array>} Resolves to array of leaderboard entry objects.
 */
export async function fetchLeaderboardData() {
  return new Promise((resolve) =>
    setTimeout(() => resolve(mockLeaderboard), 1600)
  );
}
