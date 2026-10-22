/**
 * Photography packages — single source of truth.
 * Yahan package add/edit karo, chatbot automatically pick kar lega.
 */

export const packages = [
  {
    id: 'portrait',
    name: 'Portrait Session',
    tagline: 'Personal branding, headshots & couple portraits',
    price: 15000,
    duration: '1–2 hours',
    photos: '25 retouched photos',
    highlights: ['1 location', '2 outfit changes', 'Private online gallery', '7-day delivery'],
    keywords: ['portrait', 'portraits', 'headshot', 'headshots', 'solo', 'individual', 'couple', 'maternity', 'pre wedding', 'prewedding'],
  },
  {
    id: 'event',
    name: 'Event & Birthday',
    tagline: 'Birthdays, mehndi functions & corporate events',
    price: 35000,
    duration: 'Up to 4 hours',
    photos: '150+ edited photos',
    highlights: ['1 photographer', 'On-site coverage', 'Online gallery', '10-day delivery'],
    keywords: ['event', 'events', 'birthday', 'party', 'function', 'corporate', 'mehndi function'],
  },
  {
    id: 'product',
    name: 'Product & Brand',
    tagline: 'E-commerce catalogues, food & brand content',
    price: 25000,
    duration: 'Half day (4 hours)',
    photos: '50 retouched photos',
    highlights: ['3 studio setups', 'White background + lifestyle', 'Commercial usage rights', '5-day delivery'],
    keywords: ['product', 'products', 'brand', 'ecommerce', 'catalogue', 'catalog', 'food', 'commercial'],
  },
  {
    id: 'wedding',
    name: 'Wedding Coverage',
    tagline: 'Full-day shaadi coverage with cinematic edits',
    price: 120000,
    duration: 'Full day (up to 10 hours)',
    photos: '400+ edited photos',
    highlights: ['2 photographers', 'Nikkah + Walima coverage', 'Highlight album (30 pages)', '14-day delivery'],
    keywords: ['wedding', 'shaadi', 'shadi', 'barat', 'baraat', 'walima', 'nikkah', 'nikah', 'bridal'],
  },
];

export function formatPrice(value) {
  return `PKR ${Number(value).toLocaleString('en-PK')}`;
}

export function getPackageById(id) {
  return packages.find((pkg) => pkg.id === id) || null;
}

/** Free-text se package dhoondta hai (keyword scoring). */
export function findPackageByText(text) {
  const haystack = ` ${String(text || '').toLowerCase()} `;
  let best = null;
  let bestScore = 0;

  for (const pkg of packages) {
    let score = 0;

    for (const keyword of pkg.keywords) {
      if (haystack.includes(` ${keyword} `)) score += keyword.length;
    }

    for (const word of pkg.name.toLowerCase().split(/\s+/)) {
      if (word.length > 3 && haystack.includes(` ${word} `)) score += word.length - 2;
    }

    if (score > bestScore) {
      bestScore = score;
      best = pkg;
    }
  }

  return best;
}

/** Package ko readable multi-line text me convert karta hai. */
export function describePackage(pkg) {
  return [
    `${pkg.name} — ${formatPrice(pkg.price)}`,
    pkg.tagline,
    '',
    `• Duration: ${pkg.duration}`,
    `• Deliverables: ${pkg.photos}`,
    ...pkg.highlights.map((item) => `• ${item}`),
  ].join('\n');
}