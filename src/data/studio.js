/**
 * Studio info + availability rules.
 */

export const studio = {
  name: 'Lens & Light Studio',
  tagline: 'Weddings, portraits & brand photography',
  city: 'Lahore, Pakistan',
  address: '12-C, Gulberg III, Lahore',
  phone: '+92 300 1234567',
  whatsapp: '+92 300 1234567',
  email: 'hello@lensandlight.studio',
  instagram: '@lensandlight.studio',
  hours: 'Mon–Sat, 10:00 AM – 7:00 PM',
  availability: {
    workingDays: [1, 2, 3, 4, 5, 6], // 0 = Sunday
    blockedDates: ['2026-01-01', '2026-03-23', '2026-08-14'],
    leadTimeDays: 5,
    slots: ['Morning (9 AM – 12 PM)', 'Afternoon (12 PM – 4 PM)', 'Evening (4 PM – 8 PM)'],
  },
};

const pad = (value) => String(value).padStart(2, '0');

export function toISODate(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function makeDate(year, month, day) {
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }
  date.setHours(0, 0, 0, 0);
  return date;
}

/** "2025-12-20", "20/12/2025", "20 Dec 2025" — sab accept karta hai. */
export function parseDateInput(input) {
  const raw = String(input || '').trim();
  if (!raw) return null;

  let match = raw.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/);
  if (match) return makeDate(Number(match[1]), Number(match[2]), Number(match[3]));

  match = raw.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{2,4})$/);
  if (match) {
    let year = Number(match[3]);
    if (year < 100) year += 2000;
    return makeDate(year, Number(match[2]), Number(match[1]));
  }

  const parsed = new Date(raw);
  if (!Number.isNaN(parsed.getTime())) {
    return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
  }
  return null;
}

export function formatNiceDate(input) {
  const date = input instanceof Date ? input : parseDateInput(input);
  if (!date) return String(input);
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/** Aaj se next N available dates (ISO strings). */
export function getNextAvailableDates(count = 3, from = new Date()) {
  const { workingDays, blockedDates, leadTimeDays } = studio.availability;
  const blocked = new Set(blockedDates);
  const results = [];

  const cursor = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  cursor.setDate(cursor.getDate() + leadTimeDays);

  for (let i = 0; i < 180 && results.length < count; i += 1) {
    const iso = toISODate(cursor);
    if (workingDays.includes(cursor.getDay()) && !blocked.has(iso)) results.push(iso);
    cursor.setDate(cursor.getDate() + 1);
  }

  return results;
}

/** Booking ke liye date validate karta hai. */
export function checkDateAvailability(input) {
  const date = parseDateInput(input);
  if (!date) return { ok: false, reason: 'invalid' };

  const { workingDays, blockedDates, leadTimeDays } = studio.availability;
  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  minDate.setDate(minDate.getDate() + leadTimeDays);

  if (date < minDate) return { ok: false, reason: 'tooSoon' };
  if (blockedDates.includes(toISODate(date))) return { ok: false, reason: 'blocked' };
  if (!workingDays.includes(date.getDay())) return { ok: false, reason: 'closed' };

  return { ok: true, date, iso: toISODate(date) };
}