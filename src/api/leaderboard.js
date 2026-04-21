import { maskPhone } from '../utils/leaderboard';

const API_URL = '/api-proxy/api/tools-service/leaderboard/top';
const CAMPAIGN_ID = 'bigshack';

function proxyAudioUrl(url) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    // Normalise path-style → virtual-hosted-style
    if (parsed.hostname === 's3.ap-south-1.amazonaws.com') {
      parsed.hostname = 'travelpro-bucket.s3.ap-south-1.amazonaws.com';
      parsed.pathname = parsed.pathname.replace(/^\/travelpro-bucket/, '');
    }
    // Strip pre-signed query params — public files don't need them
    if (parsed.searchParams.has('X-Amz-Algorithm')) {
      parsed.search = '';
    }
    return parsed.toString();
  } catch {
    return url;
  }
}

/**
 * Fetches leaderboard data from the real API.
 *
 * @param {{ country: string, dateFrom: string, dateTo: string }} params
 * @returns {Promise<Array>} Resolves to array of mapped leaderboard entries.
 */
export async function fetchLeaderboardData({ country, dateFrom, dateTo }) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      campaign_id: CAMPAIGN_ID,
      ...(country && country !== 'ALL' ? { country } : {}),
      date_from: dateFrom,
      date_to:   dateTo,
    }),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const data = await res.json();
  if (!data.success) throw new Error('API returned success: false');

  // Map API shape → internal shape used by all 5 designs
  return (data.entries || []).map((e) => ({
    rank:          e.rank,
    name:          e.name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' '),
    phone:         maskPhone(e.phone),
    country:       e.country,
    timeInSeconds: e.duration,
    isWinner:      e.rank <= 5,
    audioUrl:      proxyAudioUrl(e.audio_url),
    analysis:      e.analysis  || null,
  }));
}
