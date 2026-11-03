export const PHONES = [
  {
    id: "aether-nova-titan",
    name: "Aether Nova Titan 10 Ultra",
    tagline: "The World's First Antigravity Flagship",
    brand: "Aether",
    isHero: true,
    badge: "Flagship Hero",
    basePrice: 1199,
    depositPrice: 99,
    releaseDate: "Dec 15, 2026",
    batchName: "Global Batch 1",
    totalBatchUnits: 500,
    reservedUnits: 442,
    rating: 4.96,
    reviewsCount: 1240,
    shortDescription: "Forged from Grade 5 Aerospace Titanium with an integrated zero-gravity stabilization core and Snapdragon 8 Gen 4.",
    colors: [
      { id: "obsidian", name: "Obsidian Black", hex: "#0f172a", border: "#334155", accent: "#38bdf8" },
      { id: "cosmic-teal", name: "Cosmic Neon Teal", hex: "#0d3935", border: "#34A89A", accent: "#00f5d4" },
      { id: "titanium-violet", name: "Titanium Violet", hex: "#2e1065", border: "#7c3aed", accent: "#a855f7" },
      { id: "stellar-white", name: "Stellar Ceramic White", hex: "#f8fafc", border: "#cbd5e1", accent: "#94a3b8" }
    ],
    storageTiers: [
      { id: "256gb", capacity: "256GB", price: 1199, label: "Standard Ultra" },
      { id: "512gb", capacity: "512GB", price: 1349, popular: true, label: "Creator Tier" },
      { id: "1tb", capacity: "1TB", price: 1599, label: "Maximum Quantum" }
    ],
    carriers: [
      { id: "unlocked", name: "Unlocked (Worldwide 5G eSIM + Dual SIM)" },
      { id: "verizon", name: "Verizon 5G Ultra Wideband" },
      { id: "att", name: "AT&T 5G NextGen" },
      { id: "tmobile", name: "T-Mobile Ultra Capacity" }
    ],
    floatingChips: [
      "Snapdragon 8 Gen 4 Extreme",
      "200MP Quad-Periscope 100x",
      "5400mAh Graphene Battery",
      "Aerospace Titanium Frame",
      "Zero-G Gyroscopic Core",
      "3200 nits Micro-OLED",
      "Satellite SOS",
      "Free AeroBuds Pro Gift"
    ],
    specs: {
      display: "6.82\" 1-144Hz LTPO Micro-OLED (3200 nits peak, HDR Vivid)",
      chipset: "Snapdragon 8 Gen 4 Extreme 3nm Neural Processor",
      camera: "200MP OIS Main + 50MP Periscope 100x + 50MP Ultra-Wide + 3D LiDAR",
      battery: "5,400mAh Graphene Solid-State (100W Wired, 65W Wireless)",
      build: "Aerospace Grade 5 Titanium Frame with Ceramic Crystal Shield",
      durability: "IP68 / IP69K Waterproof up to 6 meters for 60 mins",
      connectivity: "Wi-Fi 7, Dual 5G SA/NSA, Ultra-Wideband 2, Two-way Satellite",
      os: "AetherOS 4.0 Neural Core with 7 years of instant OS updates"
    },
    preorderPerks: [
      { id: "earbuds", name: "Complimentary AeroBuds Pro 2 ($199 Value)", included: true },
      { id: "dock", name: "65W Magnetic Zero-G Floating Dock ($79 Value)", included: true },
      { id: "care", name: "1-Year AetherCare+ Damage Protection (Free during Pre-order)", included: true }
    ]
  },
  {
    id: "cyberphone-quantum",
    name: "CyberPhone Quantum Z",
    tagline: "Engineered for Neural Synthetics & Transparent Tech",
    brand: "CyberTech",
    isHero: false,
    badge: "Transparent Cyber",
    basePrice: 1099,
    depositPrice: 99,
    releaseDate: "Jan 10, 2027",
    batchName: "Global Batch 1",
    totalBatchUnits: 400,
    reservedUnits: 304,
    rating: 4.88,
    reviewsCount: 820,
    shortDescription: "A striking see-through ceramic glass chassis with addressable LED glyph arrays and 6000mAh battery.",
    colors: [
      { id: "matrix-green", name: "Matrix Cyber Neon", hex: "#064e3b", border: "#10b981", accent: "#34d399" },
      { id: "void-black", name: "Void Transparent Dark", hex: "#0f172a", border: "#475569", accent: "#64748b" },
      { id: "plasma-cyan", name: "Plasma Cyan", hex: "#083344", border: "#06b6d4", accent: "#22d3ee" }
    ],
    storageTiers: [
      { id: "256gb", capacity: "256GB", price: 1099 },
      { id: "512gb", capacity: "512GB", price: 1249, popular: true },
      { id: "1tb", capacity: "1TB", price: 1499 }
    ],
    carriers: [
      { id: "unlocked", name: "Unlocked (Worldwide 5G)" },
      { id: "verizon", name: "Verizon 5G" },
      { id: "tmobile", name: "T-Mobile 5G" }
    ],
    floatingChips: [
      "Quantum NPU 900",
      "Transparent Glyph LEDs",
      "6000mAh Dual-Cell",
      "Corning Gorilla Armor 2",
      "108MP Low-Light CyberEye"
    ],
    specs: {
      display: "6.7\" 120Hz Curved AMOLED with Under-Display Camera",
      chipset: "Quantum Neural NPU-900 (120 TOPS AI Performance)",
      camera: "108MP f/1.6 Main + 64MP Telephoto 5x + 48MP Macro",
      battery: "6,000mAh Solid-State with 120W Warp Charge",
      build: "Anti-Scratch Transparent Ceramic Sapphire Glass",
      durability: "IP68 Water and Dust Resistance",
      connectivity: "Wi-Fi 7, 5G Dual-SIM, NFC, Bluetooth 5.4",
      os: "CyberOS 3.5 Neon"
    },
    preorderPerks: [
      { id: "case", name: "Custom Cyber Holographic Bumper Case ($49 Value)", included: true },
      { id: "cable", name: "Braided 120W LED Warp Cable ($35 Value)", included: true }
    ]
  },
  {
    id: "vanguard-apex-fold",
    name: "Vanguard Apex Fold 6",
    tagline: "Zero-Crease Titanium Dual-Screen Horizon",
    brand: "Vanguard",
    isHero: false,
    badge: "Ultra Foldable",
    basePrice: 1699,
    depositPrice: 149,
    releaseDate: "Dec 28, 2026",
    batchName: "Founder's Batch 1",
    totalBatchUnits: 300,
    reservedUnits: 278,
    rating: 4.92,
    reviewsCount: 650,
    shortDescription: "Ultra-thin 4.6mm unfolded silhouette, zero-crease titanium micro-hinge, and expansive 8.0-inch canvas.",
    colors: [
      { id: "phantom-silver", name: "Phantom Liquid Silver", hex: "#334155", border: "#94a3b8", accent: "#e2e8f0" },
      { id: "cosmic-emerald", name: "Cosmic Emerald", hex: "#022c22", border: "#059669", accent: "#10b981" },
      { id: "carbon-shadow", name: "Carbon Shadow", hex: "#18181b", border: "#3f3f46", accent: "#71717a" }
    ],
    storageTiers: [
      { id: "512gb", capacity: "512GB", price: 1699, popular: true },
      { id: "1tb", capacity: "1TB", price: 1899 }
    ],
    carriers: [
      { id: "unlocked", name: "Unlocked (Worldwide 5G)" },
      { id: "att", name: "AT&T 5G" },
      { id: "verizon", name: "Verizon 5G" }
    ],
    floatingChips: [
      "Zero-Crease Titanium Hinge",
      "8.0\" 144Hz Foldable Canvas",
      "Snapdragon 8 Gen 4 Elite",
      "Integrated S-Pen Stylus",
      "Ultra-Thin 4.6mm Profile"
    ],
    specs: {
      display: "8.0\" Inner 1-144Hz Foldable LTPO + 6.5\" 120Hz Outer OLED",
      chipset: "Snapdragon 8 Gen 4 Elite Multi-Tasking Engine",
      camera: "50MP Dual-Pixel Main + 50MP 5x Periscope + 50MP Ultrawide",
      battery: "5,000mAh Dual-Cell with 80W Fast Charge",
      build: "Titanium Alloy Hinge tested for 600,000 folds",
      durability: "IPX8 Water Resistant",
      connectivity: "Wi-Fi 7, Ultra-Wideband, 5G Sub-6 & mmWave",
      os: "Vanguard CanvasOS with Desktop Split-Screen Mode"
    },
    preorderPerks: [
      { id: "stylus", name: "Vanguard Precision Stylus Pen ($129 Value)", included: true },
      { id: "kickstand", name: "Aramid Fiber Magnetic Stand Cover ($89 Value)", included: true }
    ]
  },
  {
    id: "luminary-aura-pro",
    name: "Luminary Aura Studio Pro",
    tagline: "Master-Grade Optics with Hasselblad Color Science",
    brand: "Luminary",
    isHero: false,
    badge: "Cinema Optics",
    basePrice: 999,
    depositPrice: 89,
    releaseDate: "Jan 05, 2027",
    batchName: "Global Batch 1",
    totalBatchUnits: 350,
    reservedUnits: 225,
    rating: 4.85,
    reviewsCount: 510,
    shortDescription: "A dedicated 1-inch Sony sensor paired with mechanical lens aperture and cinematic 8K HDR recording.",
    colors: [
      { id: "arctic-mist", name: "Arctic Blue Mist", hex: "#1e293b", border: "#38bdf8", accent: "#7dd3fc" },
      { id: "sunset-gold", name: "Champagne Horizon", hex: "#451a03", border: "#d97706", accent: "#f59e0b" },
      { id: "midnight-slate", name: "Midnight Ceramic", hex: "#0f172a", border: "#334155", accent: "#64748b" }
    ],
    storageTiers: [
      { id: "256gb", capacity: "256GB", price: 999, popular: true },
      { id: "512gb", capacity: "512GB", price: 1149 }
    ],
    carriers: [
      { id: "unlocked", name: "Unlocked (Worldwide 5G)" },
      { id: "tmobile", name: "T-Mobile 5G" },
      { id: "att", name: "AT&T 5G" }
    ],
    floatingChips: [
      "1-Inch Sony LYT Sensor",
      "Hasselblad Optics",
      "5200mAh Silicon-Carbon",
      "4500 nits ProXDR",
      "Mechanical Variable Aperture"
    ],
    specs: {
      display: "6.78\" 1.5K ProXDR Display (4,500 nits peak, 120Hz)",
      chipset: "MediaTek Dimensity 9400 AI Ultra (3nm)",
      camera: "50MP 1-inch Sony LYT-900 (f/1.4-f/4.0) + 50MP 3x + 50MP Ultrawide",
      battery: "5,200mAh Silicon-Carbon (100W Wired, 50W Wireless AirCharge)",
      build: "Matte Frosted Glass with Aviation Aluminum Edge",
      durability: "IP68 / IP69 Dust and Water Resistant",
      connectivity: "Wi-Fi 7, 5G, Bluetooth 5.4, Infrared Blaster",
      os: "AuraOS 5.0 with Master Photography Suite"
    },
    preorderPerks: [
      { id: "filter", name: "Pro Magnetic ND Filter Lens Kit ($119 Value)", included: true },
      { id: "charger", name: "100W Gallium-Nitride GaN Travel Charger ($69 Value)", included: true }
    ]
  }
];

