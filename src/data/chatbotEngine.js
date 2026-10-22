/**
 * Pure chat logic — React se independent, isliye test karna easy hai.
 * Booking inquiry localStorage me save hoti hai (neeche TODO dekho).
 */

import { getPackageById, packages } from './packages';
import { checkDateAvailability, formatNiceDate, getNextAvailableDates, studio } from './studio';
import { DEFAULT_QUICK_REPLIES, matchIntent } from './chatbotIntents';

const YES = /^\s*(y|yes|yeah|yep|yup|sure|ok|okay|confirm|confirmed|haan|han|ji|theek)\b/i;
const NO = /^\s*(n|no|nah|nope|not now|later)\b/i;
const SKIP = /^\s*(skip|none|no|n\/a|na|nothing)\s*$/i;
const CANCEL = /^\s*(cancel|stop|exit|quit|restart|reset)\b/i;
const NOT_SURE = /^\s*(any|not sure|unsure|don'?t know|no idea|koi bhi)\b/i;

const INQUIRY_STORAGE_KEY = 'studio_inquiries';

const bot = (text, extra = {}) => ({ type: 'text', text, ...extra });

export const createBooking = () => ({ active: false, step: null, data: {} });

function toTitleCase(value) {
  return value
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function packageName(id) {
  if (!id || id === 'not-sure') return 'Not sure yet';
  const pkg = getPackageById(id);
  return pkg ? pkg.name : 'Not sure yet';
}

function summary(data) {
  return [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Date: ${formatNiceDate(data.date)}`,
    `Package: ${packageName(data.packageId)}`,
    `Notes: ${data.notes || '—'}`,
  ].join('\n');
}

function setStep(booking, data, step, ...messages) {
  return { booking: { ...booking, active: true, step, data }, messages };
}

function makeRefId() {
  return `INQ-${Date.now().toString(36).toUpperCase()}`;
}

/** TODO: yahan real API call lagana hai. */
export function saveInquiry(inquiry) {
  try {
    const stored = JSON.parse(window.localStorage.getItem(INQUIRY_STORAGE_KEY) || '[]');
    window.localStorage.setItem(INQUIRY_STORAGE_KEY, JSON.stringify([...stored, inquiry]));
    return true;
  } catch (error) {
    console.error('[chatbot] inquiry save failed', error);
    return false;
  }
}

function fallbackMessages() {
  return [
    bot(
      `I'm not sure about that one 🤔 — but I can definitely help with:\n• Packages & pricing\n• Availability & dates\n• Booking an inquiry\n\nOr reach us directly at ${studio.whatsapp} / ${studio.email}.`,
      { quickReplies: DEFAULT_QUICK_REPLIES },
    ),
  ];
}

function handleBookingStep(input, booking) {
  const { step } = booking;
  const data = { ...booking.data };
  const lower = input.toLowerCase();

  switch (step) {
    case 'name': {
      if (input.length < 2 || !/[a-z]/i.test(input)) {
        return { booking, messages: [bot('Please share your full name (at least 2 letters).')] };
      }
      data.name = toTitleCase(input);
      return setStep(
        booking,
        data,
        'email',
        bot(`Thanks ${data.name.split(' ')[0]}! What's the best email to reach you on?`),
      );
    }

    case 'email': {
      if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(input)) {
        return { booking, messages: [bot('That email does not look right. Please type it again (e.g. ali@example.com).')] };
      }
      data.email = input;
      return setStep(booking, data, 'phone', bot('Got it. What is your phone number?'));
    }

    case 'phone': {
      const digits = input.replace(/\D/g, '');
      if (digits.length < 10 || digits.length > 15) {
        return {
          booking,
          messages: [bot('That number looks off. Please share a valid number, e.g. 0300 1234567 or +92 300 1234567.')],
        };
      }
      data.phone = input;

      if (data.packageId) {
        return setStep(
          booking,
          data,
          'date',
          bot('Which date do you have in mind? (e.g. 2025-12-20 or 20/12/2025)'),
        );
      }

      return setStep(
        booking,
        data,
        'package',
        bot('Which package are you interested in?', { quickReplies: packages.map((pkg) => pkg.name) }),
      );
    }

    case 'package': {
      if (NOT_SURE.test(input)) {
        data.packageId = 'not-sure';
        return setStep(
          booking,
          data,
          'date',
          bot('No problem — we can decide the package later. Which date do you have in mind?'),
        );
      }

      let pkg = null;
      const index = Number(input) - 1;
      if (Number.isInteger(index) && index >= 0 && packages[index]) {
        pkg = packages[index];
      } else {
        pkg = packages.find((item) => item.name.toLowerCase() === lower) || null;
        if (!pkg) {
          // fuzzy match ke liye intent-free helper
          pkg = packages.find((item) => item.keywords.some((keyword) => lower.includes(keyword))) || null;
        }
      }

      if (!pkg) {
        return {
          booking,
          messages: [
            bot("I didn't catch that package. Please pick one:", {
              quickReplies: packages.map((item) => item.name),
            }),
          ],
        };
      }

      data.packageId = pkg.id;
      return setStep(
        booking,
        data,
        'date',
        bot(`${pkg.name} — noted. ✅\nWhich date do you have in mind? (e.g. 2025-12-20)`),
      );
    }

    case 'date': {
      const result = checkDateAvailability(input);
      const dates = getNextAvailableDates(3);

      if (!result.ok) {
        const reasonText = {
          invalid: "I couldn't read that date. Please use a format like 2025-12-20 or 20/12/2025.",
          tooSoon: `We need at least ${studio.availability.leadTimeDays} days of lead time.`,
          blocked: 'Sorry, we are already booked on that date.',
          closed: 'We are closed that day (we shoot Monday–Saturday).',
        }[result.reason];

        return {
          booking,
          messages: [
            bot(`${reasonText}\nNext open dates: ${dates.map((d) => formatNiceDate(d)).join(', ')}.`, {
              quickReplies: dates,
            }),
          ],
        };
      }

      data.date = result.iso;
      return setStep(
        booking,
        data,
        'notes',
        bot(
          `${formatNiceDate(result.date)} — noted ✅\nAny special requests? (location, number of people, timings…) Type "skip" if nothing.`,
        ),
      );
    }

    case 'notes': {
      data.notes = SKIP.test(input) ? '' : input.slice(0, 300);
      return setStep(
        booking,
        data,
        'confirm',
        bot(`Here's your inquiry summary:\n\n${summary(data)}\n\nShall I submit it?`, {
          quickReplies: ['Yes, submit', 'No, cancel'],
        }),
      );
    }

    case 'confirm': {
      if (YES.test(input)) {
        const inquiry = {
          id: makeRefId(),
          ...data,
          packageName: packageName(data.packageId),
          createdAt: new Date().toISOString(),
        };
        const saved = saveInquiry(inquiry);

        return {
          booking: createBooking(),
          messages: [
            bot(
              `Done! 🎉 Your inquiry is submitted.${saved ? ` Reference: ${inquiry.id}` : ''}\n\nWe'll reply to ${data.email} within 24 hours to confirm your slot. Anything else I can help with?`,
              { quickReplies: DEFAULT_QUICK_REPLIES },
            ),
          ],
        };
      }

      if (NO.test(input)) {
        return {
          booking: createBooking(),
          messages: [
            bot('No worries — I cancelled that inquiry. Nothing was submitted. What else can I do for you?', {
              quickReplies: DEFAULT_QUICK_REPLIES,
            }),
          ],
        };
      }

      return {
        booking,
        messages: [
          bot('Just to confirm — shall I submit this booking inquiry?', {
            quickReplies: ['Yes, submit', 'No, cancel'],
          }),
        ],
      };
    }

    default:
      return { booking: createBooking(), messages: fallbackMessages() };
  }
}

/**
 * Main entry point — har user message yahan se guzarta hai.
 * @returns {{ booking: object, messages: object[] }}
 */
export function respond(rawInput, booking = createBooking()) {
  const input = String(rawInput ?? '').trim();
  if (!input) return { booking, messages: [] };

  if (booking.active && CANCEL.test(input)) {
    return {
      booking: createBooking(),
      messages: [
        bot('Okay, I stopped that inquiry. Nothing was submitted. What else can I help you with?', {
          quickReplies: DEFAULT_QUICK_REPLIES,
        }),
      ],
    };
  }

  if (booking.active) return handleBookingStep(input, booking);

  const intent = matchIntent(input);

  if (!intent) return { booking, messages: fallbackMessages() };

  if (intent.id === 'booking') {
    const pkg = packages.find((item) => item.keywords.some((keyword) => input.toLowerCase().includes(keyword)));
    const nextBooking = {
      active: true,
      step: 'name',
      data: pkg ? { packageId: pkg.id } : {},
    };

    return {
      booking: nextBooking,
      messages: [
        ...(intent.respond ? intent.respond(input) : []),
        ...(pkg ? [bot(`I've noted the ${pkg.name} package. 📸`)] : []),
        bot('First, what is your full name?'),
      ],
    };
  }

  const messages = intent.respond ? intent.respond(input) : [];
  return { booking, messages: messages.length ? messages : fallbackMessages() };
}