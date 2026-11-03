export const DEVICES = [
  {
    id: 'iphone-duo',
    name: 'iPhone Duo',
    brand: 'Apple',
    startingPrice: 124999,
    tagline: 'Dual-screen foldable flagship engineered with liquid-metal hinge and A19 Pro silicon.',
    description: 'A revolutionary book-style dual ProMotion display that unfolds into a seamless 7.9-inch workspace with zero crease visibility.',
    launchBonus: 'Complimentary AirPods Pro (Worth ₹24,900)',
    estimatedDelivery: 'December 2026',
    colors: [
      { id: 'space-black', name: 'Space Black', hex: '#1c1d1f', border: '#374151' },
      { id: 'celestial-blue', name: 'Celestial Blue', hex: '#1e3a5f', border: '#2563eb' },
      { id: 'silver-frost', name: 'Silver Frost', hex: '#e2e8f0', border: '#cbd5e1' }
    ],
    storageTiers: [
      { id: '256gb', capacity: '256GB', price: 124999, emi: 10416 },
      { id: '512gb', capacity: '512GB', price: 139999, emi: 11666, popular: true },
      { id: '1tb', capacity: '1TB', price: 159999, emi: 13333 }
    ],
    specs: {
      display: '7.9" Foldable ProMotion 120Hz + 6.3" Outer OLED',
      processor: 'Apple A19 Pro (2nm TSMC)',
      camera: 'Triple 48MP Fusion (Main, 5x Telephoto, Ultra-Wide)',
      battery: '4,850 mAh Dual-Cell',
      charging: '45W MagSafe Fast Charge',
      storage: '256GB / 512GB / 1TB',
      launchDate: 'Dec 15, 2026'
    }
  },
  {
    id: 'galaxy-s27-ultra',
    name: 'Samsung Galaxy S27 Ultra',
    brand: 'Samsung',
    startingPrice: 119999,
    tagline: 'Monolithic titanium flagship with integrated S-Pen stylus and 200MP quad-camera.',
    description: 'Precision aerospace titanium frame housing a 200MP Quad-Vision sensor and integrated latency-free S-Pen productivity suite.',
    launchBonus: 'Complimentary Galaxy Buds3 Pro + 65W GaN Charger',
    estimatedDelivery: 'January 2027',
    colors: [
      { id: 'titanium-gray', name: 'Titanium Gray', hex: '#374151', border: '#4b5563' },
      { id: 'cobalt-violet', name: 'Cobalt Violet', hex: '#312e81', border: '#4f46e5' },
      { id: 'amber-gold', name: 'Amber Gold', hex: '#78350f', border: '#d97706' }
    ],
    storageTiers: [
      { id: '256gb', capacity: '256GB', price: 119999, emi: 9999 },
      { id: '512gb', capacity: '512GB', price: 134999, emi: 11249, popular: true },
      { id: '1tb', capacity: '1TB', price: 154999, emi: 12916 }
    ],
    specs: {
      display: '6.9" Dynamic AMOLED 2X Flat (1-144Hz, Anti-Reflective)',
      processor: 'Snapdragon 8 Gen 5 for Galaxy (3nm)',
      camera: '200MP OIS + 50MP 5x Periscope + 50MP 3x + 50MP Ultra-Wide',
      battery: '5,500 mAh Silicon-Carbon',
      charging: '65W Wired + 25W Fast Wireless',
      storage: '256GB / 512GB / 1TB',
      launchDate: 'Jan 10, 2027'
    }
  },
  {
    id: 'iphone-18',
    name: 'iPhone 18',
    brand: 'Apple',
    startingPrice: 79999,
    tagline: 'Compact 6.3" powerhouse with 120Hz ProMotion and A19 Bionic architecture.',
    description: 'Ergonomic aerospace aluminum chassis paired with second-generation Ceramic Shield and dual 48MP computational photography.',
    launchBonus: 'Complimentary 35W Dual USB-C Adapter + 1-Yr AppleCare+',
    estimatedDelivery: 'November 2026',
    colors: [
      { id: 'midnight', name: 'Midnight', hex: '#0f172a', border: '#1e293b' },
      { id: 'starlight', name: 'Starlight', hex: '#f8fafc', border: '#cbd5e1' },
      { id: 'sunset-coral', name: 'Sunset Coral', hex: '#9a3412', border: '#ea580c' },
      { id: 'deep-marine', name: 'Deep Marine', hex: '#0369a1', border: '#0284c7' }
    ],
    storageTiers: [
      { id: '256gb', capacity: '256GB', price: 79999, emi: 6666, popular: true },
      { id: '512gb', capacity: '512GB', price: 89999, emi: 7500 },
      { id: '1tb', capacity: '1TB', price: 109999, emi: 9166 }
    ],
    specs: {
      display: '6.3" Super Retina XDR with 120Hz ProMotion',
      processor: 'Apple A19 Bionic (3nm)',
      camera: 'Dual 48MP Fusion (Main f/1.6, 2x Lossless + 48MP UW)',
      battery: '4,000 mAh High-Density',
      charging: '30W Fast Charge (50% in 25 mins)',
      storage: '256GB / 512GB / 1TB',
      launchDate: 'Nov 28, 2026'
    }
  },
  {
    id: 'moto-signature-28',
    name: 'Motorola Signature 28',
    brand: 'Motorola',
    startingPrice: 84999,
    tagline: 'Ultra-slim 6.8mm luxury flagship with Pantone vegan leather and 1-inch optics.',
    description: 'Featherweight 179g profile enveloped in handcrafted vegan leather with a 1-inch Sony LYT-900 camera sensor and 125W TurboPower.',
    launchBonus: 'Complimentary Moto Buds+ with Sound by Bose (₹11,999 Value)',
    estimatedDelivery: 'December 2026',
    colors: [
      { id: 'obsidian-leather', name: 'Obsidian Leather', hex: '#27272a', border: '#3f3f46' },
      { id: 'pantone-olive', name: 'Pantone Classic Olive', hex: '#365314', border: '#4d7c0f' },
      { id: 'raw-aluminum', name: 'Raw Aluminum', hex: '#94a3b8', border: '#cbd5e1' }
    ],
    storageTiers: [
      { id: '256gb', capacity: '256GB', price: 84999, emi: 7083 },
      { id: '512gb', capacity: '512GB', price: 94999, emi: 7916, popular: true },
      { id: '1tb', capacity: '1TB', price: 114999, emi: 9583 }
    ],
    specs: {
      display: '6.78" Endless Edge pOLED 165Hz Curved',
      processor: 'Snapdragon 8 Gen 5 AI Edition',
      camera: '50MP 1-inch Sony LYT-900 + 50MP 3.5x Periscope + 50MP UW',
      battery: '5,000 mAh Silicon Anode',
      charging: '125W TurboPower (100% in 18 mins)',
      storage: '256GB / 512GB / 1TB',
      launchDate: 'Dec 22, 2026'
    }
  }
];

