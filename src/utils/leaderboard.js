// ─── Countries ───────────────────────────────────────────────────────────────

export const COUNTRIES = [
  { code: 'KSA', label: 'Saudi Arabia' },
  { code: 'UAE', label: 'UAE' },
  { code: 'KWT', label: 'Kuwait' },
  { code: 'QAT', label: 'Qatar' },
  { code: 'BAH', label: 'Bahrain' },
];

// ─── Phone masking ────────────────────────────────────────────────────────────

export function maskPhone(raw) {
  const s = String(raw).replace(/\D/g, '');
  const cc = s.slice(0, 3);
  const sub = s.slice(3);
  if (!sub) return '+' + cc;
  const last3 = sub.slice(-3);
  const hiddenLen = sub.length - 3;
  const stars = '*'.repeat(Math.max(hiddenLen, 0));
  const groups = stars.match(/.{1,3}/g) || [];
  return '+' + cc + ' ' + (groups.length ? groups.join('-') + '-' : '') + last3;
}

// ─── Week generation ──────────────────────────────────────────────────────────

const CAMPAIGN_START = '2026-04-10'; // Friday
const CAMPAIGN_END   = '2026-05-30'; // Saturday

function parseDate(str) {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatLabel(date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function generateWeeks() {
  const weeks = [];
  const end = parseDate(CAMPAIGN_END);
  let cursor = parseDate(CAMPAIGN_START);

  while (cursor <= end) {
    const from = new Date(cursor);
    // Thursday = 6 days after Friday
    const to = new Date(cursor);
    to.setDate(to.getDate() + 6);
    // Cap at campaign end
    const cappedTo = to > end ? end : to;

    weeks.push({
      dateFrom: formatDate(from),
      dateTo:   formatDate(cappedTo),
      label:    `${formatLabel(from)} – ${formatLabel(cappedTo)}`,
    });

    // Next Friday
    cursor.setDate(cursor.getDate() + 7);
  }

  return weeks;
}

export function getDefaultWeek(weeks) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const week of weeks) {
    const from = parseDate(week.dateFrom);
    const to   = parseDate(week.dateTo);
    if (today >= from && today <= to) return week;
  }

  // If today is before campaign start, return first week
  const first = parseDate(weeks[0].dateFrom);
  if (today < first) return weeks[0];

  // If today is after campaign end, return last week
  return weeks[weeks.length - 1];
}
