/**
 * Intent definitions + matching engine.
 * Naya intent add karna ho to bas is array me push karo.
 */

import { formatPrice, findPackageByText, describePackage, packages } from './packages';
import { formatNiceDate, getNextAvailableDates, studio } from './studio';

export const DEFAULT_QUICK_REPLIES = [
  'Packages & pricing',
  'Check availability',
  'Book a shoot',
  'Talk to a human',
];

export const intents = [
  {
    id: 'greeting',
    priority: 1,
    keywords: ['hi', 'hello', 'hey', 'helo', 'hlo', 'salam', 'salaam', 'assalam', 'assalamualaikum', 'aoa', 'hola'],
    respond: () => [
      {
        type: 'text',
        text: `Hi! 👋 Welcome to ${studio.name}.\nI can help you with packages & pricing, availability, or take your booking inquiry right here. What do you need?`,
        quickReplies: DEFAULT_QUICK_REPLIES,
      },
    ],
  },
  {
    id: 'pricing',
    priority: 5,
    keywords: [
      'price', 'prices', 'pricing', 'price list', 'pricelist', 'cost', 'costs', 'rate', 'rates',
      'charge', 'charges', 'fee', 'fees', 'package', 'packages', 'pkg', 'budget',
      'kitna', 'kitne', 'paisa', 'paise', 'how much',
    ],
    respond: (text) => {
      const pkg = findPackageByText(text);
      if (pkg) {
        return [
          {
            type: 'text',
            text: describePackage(pkg),
            quickReplies: ['Book this shoot', 'Check availability', 'See all packages'],
          },
        ];
      }
      return [
        { type: 'text', text: 'Here are our current packages 👇', cards: 'packages' },
        {
          type: 'text',
          text: 'All prices are starting prices and include professional editing. Tell me which one you like (e.g. "wedding") and I will share full details.',
          quickReplies: packages.map((item) => item.name),
        },
      ];
    },
  },
  {
    id: 'package_detail',
    priority: 6,
    keywords: [
      'wedding', 'shaadi', 'shadi', 'barat', 'baraat', 'walima', 'nikkah', 'nikah', 'mehndi', 'bridal',
      'portrait', 'headshot', 'couple', 'maternity', 'pre wedding', 'prewedding',
      'event', 'birthday', 'party', 'function', 'product', 'brand', 'ecommerce', 'catalogue', 'catalog', 'food', 'commercial',
    ],
    respond: (text) => {
      const pkg = findPackageByText(text);
      if (!pkg) return [];
      return [
        {
          type: 'text',
          text: describePackage(pkg),
          quickReplies: ['Book this shoot', 'Check availability', 'See all packages'],
        },
      ];
    },
  },
  {
    id: 'availability',
    priority: 6,
    keywords: ['available', 'availability', 'free', 'date', 'dates', 'slot', 'slots', 'schedule', 'calendar', 'kab', 'open'],
    respond: () => {
      const dates = getNextAvailableDates(3);
      return [
        {
          type: 'text',
          text: [
            `We shoot Monday–Saturday, ${studio.hours}.`,
            '',
            'Next open dates:',
            ...dates.map((date) => `• ${formatNiceDate(date)}`),
            '',
            `We take bookings at least ${studio.availability.leadTimeDays} days in advance.`,
            `Slots: ${studio.availability.slots.join(', ')}.`,
          ].join('\n'),
          quickReplies: ['Book a shoot', 'See all packages'],
        },
      ];
    },
  },
  {
    id: 'booking',
    priority: 7,
    keywords: [
      'book', 'books', 'booking', 'reserve', 'reservation', 'appointment', 'hire',
      'inquiry', 'enquiry', 'inquire', 'enquire', 'book a shoot', 'book now', 'book this shoot',
    ],
    respond: () => [
      { type: 'text', text: "Great — let's get your booking inquiry started. It takes about 30 seconds. 🎉" },
    ],
  },
  {
    id: 'services',
    priority: 3,
    keywords: ['services', 'service', 'what do you shoot', 'shoot types', 'types of shoot', 'offer', 'kya shoot'],
    respond: () => [
      {
        type: 'text',
        text: `We cover four main types of shoots:\n${packages
          .map((pkg) => `• ${pkg.name} — ${formatPrice(pkg.price)}`)
          .join('\n')}\n\nWant details on any of these?`,
        quickReplies: packages.map((item) => item.name),
      },
    ],
  },
  {
    id: 'turnaround',
    priority: 4,
    keywords: [
      'delivery', 'deliver', 'turnaround', 'how long', 'ready', 'when will i get',
      'editing', 'edit', 'timeline', 'processing', 'kab milege', 'photos kab',
    ],
    respond: () => [
      {
        type: 'text',
        text: 'Delivery timelines:\n• Portrait — 7 days\n• Event — 10 days\n• Product — 5 days\n• Wedding — 14 days\n\nA sneak peek of 10–15 photos is shared within 48 hours. 📸',
        quickReplies: DEFAULT_QUICK_REPLIES,
      },
    ],
  },
  {
    id: 'payment',
    priority: 4,
    keywords: ['payment', 'pay', 'advance', 'deposit', 'bank', 'easypaisa', 'jazzcash', 'installment', 'instalment', 'cash', 'card'],
    respond: () => [
      {
        type: 'text',
        text: 'Payment terms:\n• 40% advance to lock the date\n• 60% on the shoot day\n\nWe accept bank transfer, Easypaisa, JazzCash and cash. Bank details booking confirm hone ke baad share hoti hain.',
        quickReplies: DEFAULT_QUICK_REPLIES,
      },
    ],
  },
  {
    id: 'contact',
    priority: 4,
    keywords: ['contact', 'location', 'address', 'where are you', 'studio address', 'phone', 'call', 'whatsapp', 'email', 'visit', 'map', 'instagram'],
    respond: () => [
      {
        type: 'text',
        text: `You can reach us here:\n• Address: ${studio.address}\n• Phone: ${studio.phone}\n• WhatsApp: ${studio.whatsapp}\n• Email: ${studio.email}\n• Instagram: ${studio.instagram}\n• Hours: ${studio.hours}`,
        quickReplies: DEFAULT_QUICK_REPLIES,
      },
    ],
  },
  {
    id: 'human',
    priority: 6,
    keywords: ['human', 'agent', 'real person', 'talk to someone', 'talk to a human', 'call me', 'support', 'team'],
    respond: () => [
      {
        type: 'text',
        text: `Of course! You can reach the team directly:\n• WhatsApp: ${studio.whatsapp}\n• Phone: ${studio.phone}\n• Email: ${studio.email}\n\nWe usually reply within a few hours. 🙂`,
        quickReplies: DEFAULT_QUICK_REPLIES,
      },
    ],
  },
  {
    id: 'thanks',
    priority: 2,
    keywords: ['thanks', 'thank', 'thank you', 'shukriya', 'jazak', 'great', 'nice', 'awesome'],
    respond: () => [
      { type: 'text', text: 'Happy to help! 😊 Anything else you would like to know?', quickReplies: DEFAULT_QUICK_REPLIES },
    ],
  },
  {
    id: 'bye',
    priority: 2,
    keywords: ['bye', 'goodbye', 'see you', 'khuda hafiz', 'allah hafiz', 'later'],
    respond: () => [
      { type: 'text', text: 'Thanks for stopping by! Feel free to come back anytime. 📸' },
    ],
  },
];

export function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Keyword scoring ke zariye best intent return karta hai. */
export function matchIntent(value) {
  const normalized = normalizeText(value);
  if (!normalized) return null;

  const tokens = normalized.split(' ');
  const padded = ` ${normalized} `;

  let best = null;
  let bestScore = 0;

  for (const intent of intents) {
    let score = 0;

    for (const keyword of intent.keywords) {
      const clean = keyword.toLowerCase().trim();
      if (!clean) continue;

      if (clean.includes(' ')) {
        if (padded.includes(` ${clean} `)) score += clean.length + 4;
      } else if (tokens.includes(clean)) {
        score += clean.length;
      }
    }

    if (score === 0) continue;

    const isBetter = score > bestScore;
    const isTieBreak = score === bestScore && best && (intent.priority || 0) > (best.priority || 0);

    if (isBetter || isTieBreak) {
      bestScore = score;
      best = intent;
    }
  }

  return best;
}