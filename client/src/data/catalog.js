export const CATALOG = [
  {
    id: 'iphone-duo',
    name: 'iPhone Duo',
    badge: 'Dual-Screen Foldable',
    tagline: 'Dual-Screen Foldable Flagship with A19 Pro Silicon',
    brand: 'Apple',
    releaseWindow: 'Dec 15, 2026',
    deliveryMonth: 'December 2026',
    remainingSlots: 284,
    totalSlots: 2000,
    depositPrice: 999,
    dollarDeposit: 50,
    freePerk: 'Complimentary AirPods Pro 3 (Worth ₹24,900)',
    colors: [
      { id: 'titanium-space-black', name: 'Titanium Space Black', hex: '#111827', border: '#374151', accent: '#60a5fa' },
      { id: 'celestial-blue', name: 'Celestial Blue', hex: '#0f2942', border: '#0284c7', accent: '#38bdf8' },
      { id: 'silver-frost', name: 'Silver Frost', hex: '#334155', border: '#94a3b8', accent: '#e2e8f0' }
    ],
    storageTiers: [
      { id: '256gb', capacity: '256GB', price: 124999, emi: 10416 },
      { id: '512gb', capacity: '512GB', price: 139999, emi: 11666, popular: true },
      { id: '1tb', capacity: '1TB', price: 159999, emi: 13333 }
    ],
    specs: {
      display: '7.9" Foldable ProMotion 120Hz Inner + 6.3" Outer OLED (3,000 nits)',
      formFactor: 'Book-style Dual Screen with Zero-Crease Liquid Metal Hinge',
      processor: 'Apple A19 Pro (2nm TSMC) + 16-Core Neural Engine',
      camera: 'Triple 48MP Fusion (Main f/1.6, 5x Tetraprism Telephoto, Ultra-Wide with Macro)',
      battery: '4,850mAh Dual-Cell with 45W MagSafe Fast Charge',
      weight: '228g (Titanium Alloy Chassis)'
    }
  },
  {
    id: 'galaxy-s27-ultra',
    name: 'Samsung Galaxy S27 Ultra',
    badge: 'Built-in S-Pen & 200MP',
    tagline: 'Built-in S-Pen, Quad-Camera Beast with Snapdragon 8 Gen 5',
    brand: 'Samsung',
    releaseWindow: 'Jan 10, 2027',
    deliveryMonth: 'January 2027',
    remainingSlots: 340,
    totalSlots: 2500,
    depositPrice: 999,
    dollarDeposit: 50,
    freePerk: 'Complimentary Galaxy Buds3 Pro + 65W GaN Duo Charger',
    colors: [
      { id: 'phantom-titanium', name: 'Phantom Titanium', hex: '#1e293b', border: '#475569', accent: '#94a3b8' },
      { id: 'cobalt-violet', name: 'Cobalt Violet', hex: '#2e1065', border: '#7c3aed', accent: '#a855f7' },
      { id: 'amber-gold', name: 'Amber Gold', hex: '#451a03', border: '#d97706', accent: '#fbbf24' }
    ],
    storageTiers: [
      { id: '256gb', capacity: '256GB', price: 119999, emi: 9999 },
      { id: '512gb', capacity: '512GB', price: 134999, emi: 11249, popular: true },
      { id: '1tb', capacity: '1TB', price: 154999, emi: 12916 }
    ],
    specs: {
      display: '6.9" Dynamic AMOLED 2X Flat (1-144Hz, 3,200 nits, Anti-Glare Armor)',
      formFactor: 'Monolithic Titanium Slab with Silo S-Pen Stylus Slot',
      processor: 'Snapdragon 8 Gen 5 for Galaxy (3nm Extreme, 140 TOPS NPU)',
      camera: '200MP OIS Main + 50MP 5x Periscope + 50MP 3x Telephoto + 50MP Ultra-Wide',
      battery: '5,500mAh Silicon-Carbon with 65W Wired + 25W Fast Wireless',
      weight: '232g (Grade 5 Aerospace Titanium)'
    }
  },
  {
    id: 'iphone-18',
    name: 'iPhone 18',
    badge: 'Next-Gen Compact Power',
    tagline: 'Standard Next-Gen Compact Flagship with 120Hz Ceramic Shield',
    brand: 'Apple',
    releaseWindow: 'Nov 28, 2026',
    deliveryMonth: 'November 2026',
    remainingSlots: 412,
    totalSlots: 3000,
    depositPrice: 999,
    dollarDeposit: 50,
    freePerk: 'Complimentary 35W Dual USB-C Adapter + 1-Yr AppleCare+',
    colors: [
      { id: 'midnight', name: 'Midnight', hex: '#090d16', border: '#1e293b', accent: '#38bdf8' },
      { id: 'starlight', name: 'Starlight', hex: '#f8fafc', border: '#cbd5e1', accent: '#94a3b8' },
      { id: 'sunset-coral', name: 'Sunset Coral', hex: '#431407', border: '#ea580c', accent: '#fb923c' },
      { id: 'deep-marine', name: 'Deep Marine', hex: '#082f49', border: '#0284c7', accent: '#38bdf8' }
    ],
    storageTiers: [
      { id: '256gb', capacity: '256GB', price: 79999, emi: 6666, popular: true },
      { id: '512gb', capacity: '512GB', price: 89999, emi: 7500 },
      { id: '1tb', capacity: '1TB', price: 109999, emi: 9166 }
    ],
    specs: {
      display: '6.3" Super Retina XDR with 120Hz ProMotion & Always-On (2,500 nits)',
      formFactor: 'Ergonomic Compact Rounded Aluminum Frame with Matte Glass',
      processor: 'Apple A19 Bionic (3nm Next-Gen Efficiency)',
      camera: 'Dual 48MP Fusion (Main f/1.6 with 2x lossless + 48MP Ultra-Wide)',
      battery: '4,000mAh with 30W Fast Charge (50% in 25 mins)',
      weight: '172g (Lightweight Aerospace Aluminum)'
    }
  },
  {
    id: 'moto-signature-28',
    name: 'Motorola Signature 28',
    badge: 'Ultra-Slim Luxury',
    tagline: 'Ultra-Slim 6.8mm Luxury Performance Flagship with Pantone Finish',
    brand: 'Motorola',
    releaseWindow: 'Dec 22, 2026',
    deliveryMonth: 'December 2026',
    remainingSlots: 195,
    totalSlots: 1500,
    depositPrice: 999,
    dollarDeposit: 50,
    freePerk: 'Complimentary Moto Buds+ with Sound by Bose (₹11,999 Value)',
    colors: [
      { id: 'obsidian-leather', name: 'Obsidian Leather', hex: '#18181b', border: '#3f3f46', accent: '#71717a' },
      { id: 'pantone-olive', name: 'Pantone Classic Olive', hex: '#1c2d1b', border: '#4d7c0f', accent: '#84cc16' },
      { id: 'raw-aluminum', name: 'Raw Aluminum', hex: '#334155', border: '#94a3b8', accent: '#cbd5e1' }
    ],
    storageTiers: [
      { id: '256gb', capacity: '256GB', price: 84999, emi: 7083 },
      { id: '512gb', capacity: '512GB', price: 94999, emi: 7916, popular: true },
      { id: '1tb', capacity: '1TB', price: 114999, emi: 9583 }
    ],
    specs: {
      display: '6.78" Endless Edge pOLED 165Hz Curved (10-bit, 3,000 nits, Gorilla Glass Victus 2)',
      formFactor: '6.8mm Razor-Thin Luxury Vegan Leather with Brushed Aluminum Frame',
      processor: 'Snapdragon 8 Gen 5 Extreme AI Edition (3nm)',
      camera: '50MP Sony LYT-900 1-inch OIS Main + 50MP 3.5x Periscope + 50MP Macro UW',
      battery: '5,000mAh Ultra-Dense Silicon Cell with 125W TurboPower (100% in 18 mins)',
      weight: '179g (Featherweight Vegan Leather)'
    }
  }
];

