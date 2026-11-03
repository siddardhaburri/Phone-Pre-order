export const SMARTPHONES = [
  {
    id: 'iphone-duo',
    name: 'iPhone Duo',
    brand: 'Apple',
    category: 'Dual-Screen Foldable Flagship',
    price: 124999,
    priceFormatted: '₹1,24,999',
    startingPrice: 'From ₹1,24,999',
    image: '/images/devices/iphone-duo.webp',
    conceptNotice: 'Estimated concept specifications based on industry forecasts.',
    headline: 'iPhone Duo. Fold into the impossible.',
    tagline: 'Two expansive Super Retina XDR displays. Aerospace Grade 5 Titanium. A zero-crease dual-screen architecture built for a whole new dimension of multitasking.',
    editorialStat: '2nm',
    editorialStatLabel: 'Next-Generation A19 Pro Bionic Silicon',
    colors: [
      { id: 'space-black', name: 'Space Black', hex: '#1c1d1f', finish: 'Satin micro-blasted Grade 5 titanium with PVD dark coating' },
      { id: 'celestial-blue', name: 'Celestial Blue', hex: '#1e3a5f', finish: 'Deep iridescent ocean tone with anti-glare frosted glass' },
      { id: 'silver-frost', name: 'Silver Frost', hex: '#e2e8f0', finish: 'Pure natural titanium luster with high-precision bead-blast finish' }
    ],
    highlights: [
      {
        id: 'display',
        category: 'Display Technology',
        stat: '3,000 nits',
        statLabel: 'Peak Outdoor Brightness',
        title: '7.9-inch Foldable Dynamic Super Retina XDR OLED',
        description: 'An expansive inner foldable canvas pairs with a responsive 6.3-inch cover screen. With adaptive 1–120Hz ProMotion LTPO technology and Dolby Vision certification, every interaction unfolds with breathtaking fluid clarity.'
      },
      {
        id: 'processor',
        category: 'Silicon Performance',
        stat: '2nm',
        statLabel: 'TSMC N2 Fabrication Node',
        title: 'Apple A19 Pro Bionic with 16-Core Neural Engine',
        description: 'Forged on the worlds most advanced 2-nanometer architecture, the 6-core CPU and 6-core ray tracing GPU deliver unprecedented energy efficiency and console-tier graphics for Apple Intelligence.'
      },
      {
        id: 'camera',
        category: 'Camera System',
        stat: '48MP',
        statLabel: 'Triple Sensor Array & 5x Optical',
        title: '48MP Fusion Camera with Tetraprism Periscope Zoom',
        description: 'Equipped with three dedicated 48MP sensors covering 13mm to 120mm focal lengths, sensor-shift optical image stabilization, 4K ProRes at 120 fps, and Spatial Video capture for Apple Vision Pro.'
      },
      {
        id: 'battery',
        category: 'Battery & Endurance',
        stat: '28 hrs',
        statLabel: 'Continuous Video Playback',
        title: '4,850 mAh Dual-Cell Split Anode Architecture',
        description: 'Intelligent split-cell thermal management provides power through grueling workloads. Recharges up to 50% in just 20 minutes with 45W MagSafe fast charging.'
      },
      {
        id: 'materials',
        category: 'Craftsmanship & Materials',
        stat: '5.4 mm',
        statLabel: 'Unfolded Chassis Profile',
        title: 'Aerospace Grade 5 Titanium & Liquidmetal Hinge',
        description: 'Precision CNC-machined titanium rails encase a friction-free multi-axis hinge certified for 500,000 folds, sealed with IPX8 underwater protection.'
      }
    ],
    galleryViews: [
      { id: 'duo-overview', label: 'Studio Duo', subtitle: 'Front Cover & Folded Rear Chassis' },
      { id: 'inner-canvas', label: 'Inner Display', subtitle: '7.9-inch Edge-to-Edge Foldable OLED' },
      { id: 'camera-module', label: 'Camera Array', subtitle: '48MP Triple Tetraprism Optics' },
      { id: 'titanium-hinge', label: 'Hinge Profile', subtitle: '5.4mm Ultra-Slim Liquidmetal Mechanism' }
    ],
    sections: {
      display: [
        { label: 'Inner Display', value: '7.9-inch Foldable Dynamic Super Retina XDR OLED' },
        { label: 'Outer Display', value: '6.3-inch Super Retina XDR Cover OLED' },
        { label: 'Resolution', value: '2488 x 2224 pixels (Inner) / 2556 x 1179 pixels (Cover)' },
        { label: 'Refresh Rate', value: '120Hz ProMotion with Adaptive 1-120Hz LTPO' },
        { label: 'Peak Brightness', value: '3,000 nits Peak Outdoor Brightness (HDR10+, Dolby Vision)' }
      ],
      processor: [
        { label: 'Chipset', value: 'Apple A19 Pro Bionic' },
        { label: 'Fabrication', value: '2nm TSMC Second-Generation N2 Node' },
        { label: 'CPU Architecture', value: '6-Core CPU (2 High-Performance + 4 High-Efficiency Cores)' },
        { label: 'GPU & Neural Engine', value: '6-Core Apple-Designed GPU with Ray Tracing & 16-Core Neural Engine' }
      ],
      ramStorage: [
        { label: 'Unified Memory (RAM)', value: '16GB LPDDR5T Unified High-Bandwidth Memory' },
        { label: 'Internal Storage', value: '256GB / 512GB / 1TB NVMe Solid-State Storage' },
        { label: 'Expandable Storage', value: 'No (Supports High-Speed iCloud & External USB-C SSDs)' }
      ],
      camera: [
        { label: 'Main Rear Camera', value: '48MP Fusion Camera, f/1.6 aperture, Sensor-Shift Optical Image Stabilization' },
        { label: 'Telephoto Lens', value: '48MP 5x Tetraprism Periscope Optical Zoom (120mm equivalent, f/2.8)' },
        { label: 'Ultra-Wide Lens', value: '48MP Ultra-Wide (120° FOV, f/2.2) with Dedicated Macro Mode' },
        { label: 'Front Camera', value: '12MP TrueDepth Camera with f/1.9 aperture and Autofocus' },
        { label: 'Video Recording', value: '4K ProRes at up to 120 fps, Spatial Video for Vision Pro, Action Mode' }
      ],
      battery: [
        { label: 'Battery Capacity', value: '4,850 mAh Dual-Cell Lithium-Silicon Battery' },
        { label: 'Video Playback Endurance', value: 'Up to 28 hours video playback (Cover) / 22 hours (Inner)' },
        { label: 'Battery Technology', value: 'Dual-Cell Split Anode with Smart Thermal Throttling' }
      ],
      charging: [
        { label: 'Wired Fast Charging', value: '45W MagSafe / USB-C Fast Charge (50% charge in 20 minutes)' },
        { label: 'Wireless Charging', value: '25W MagSafe & 15W Qi2 Universal Wireless Charging' },
        { label: 'Reverse Charging', value: '4.5W Reverse Wired USB-C Charging for AirPods & Apple Watch' }
      ],
      materials: [
        { label: 'Chassis Frame', value: 'Aerospace Grade 5 Titanium Alloy with Micro-Blasted Finish' },
        { label: 'Screen Protection', value: 'Ceramic Shield 2 Glass (Front & Back) + Ultra-Thin Glass (UTG Inner)' },
        { label: 'Hinge Mechanism', value: 'Zero-Crease Liquidmetal Multi-Axis Dual-Cam Hinge' },
        { label: 'Water & Dust Seal', value: 'IPX8 Water Resistance (Submersible up to 2 meters for 30 minutes)' }
      ],
      dimensions: [
        { label: 'Unfolded Dimensions', value: '154.2 mm (H) x 142.8 mm (W) x 5.4 mm (D)' },
        { label: 'Folded Dimensions', value: '154.2 mm (H) x 71.4 mm (W) x 11.2 mm (D)' },
        { label: 'Bezel Profile', value: '1.2 mm Uniform Edge-to-Edge Symmetric Border' }
      ],
      weight: [
        { label: 'Device Weight', value: '228 grams' },
        { label: 'Weight Distribution', value: 'Equally balanced 50:50 across dual titanium halves' }
      ],
      os: [
        { label: 'Operating System', value: 'iOS 20 with Foldable Canvas Multitasking' },
        { label: 'Multitasking Features', value: 'Side-by-Side Dual App View, Drag-and-Drop Split Screen, Continuum Cover' },
        { label: 'Software Updates', value: '7 Years of Guaranteed Major iOS Upgrades and Security Patches' }
      ]
    }
  },
  {
    id: 'galaxy-s27-ultra',
    name: 'Samsung Galaxy S27 Ultra',
    brand: 'Samsung',
    category: 'Ultra Productivity Flagship',
    price: 119999,
    priceFormatted: '₹1,19,999',
    startingPrice: 'From ₹1,19,999',
    image: '/images/devices/galaxy-s27-ultra.webp',
    conceptNotice: 'Estimated concept specifications based on industry forecasts.',
    headline: 'Galaxy S27 Ultra. Epic in every dimension.',
    tagline: '200MP ISOCELL optics, 140 TOPS on-device Galaxy AI, and integrated S-Pen built into an ultra-durable satin titanium frame.',
    editorialStat: '200MP',
    editorialStatLabel: 'Super Quad Pixel ISOCELL Optics',
    colors: [
      { id: 'titanium-gray', name: 'Titanium Gray', hex: '#374151', finish: 'Satin anodized titanium with fingerprint-resistant oleophobic coating' },
      { id: 'cobalt-violet', name: 'Cobalt Violet', hex: '#312e81', finish: 'Vibrant midnight violet with deep refraction ceramic back' },
      { id: 'amber-gold', name: 'Amber Gold', hex: '#78350f', finish: 'Warm brushed champagne titanium with gold-accented S-Pen' }
    ],
    highlights: [
      {
        id: 'display',
        category: 'Display Technology',
        stat: '3,200 nits',
        statLabel: 'Vision Booster Peak Brightness',
        title: '6.9-inch Dynamic AMOLED 2X Flat Panel',
        description: 'Quad HD+ resolution with 1–144Hz LTPO adaptive refresh rate and Corning Gorilla Armor 2 glass that cuts surface reflections by 75% for immaculate outdoor readability.'
      },
      {
        id: 'processor',
        category: 'Silicon & AI Performance',
        stat: '140 TOPS',
        statLabel: 'On-Device Hexagon NPU',
        title: 'Qualcomm Snapdragon 8 Gen 5 for Galaxy',
        description: 'Custom 3nm architecture clocking up to 4.4GHz on dual Oryon prime cores. Execute generative AI summarization, live 4K generative photo studio, and multi-app multitasking completely on-device.'
      },
      {
        id: 'camera',
        category: 'Pro Camera System',
        stat: '100x',
        statLabel: 'Space Zoom Optical Beast',
        title: '200MP Primary Sensor + Dual Periscope Zoom',
        description: 'Featuring the 200MP ISOCELL HP2SX with dual OIS, complemented by 50MP 5x periscope telephoto, 50MP 3x optical lens, and 50MP ultra-wide macro.'
      },
      {
        id: 'battery',
        category: 'Battery & Thermal',
        stat: '5,500 mAh',
        statLabel: 'High-Density Silicon-Carbon Anode',
        title: 'Up to 31 Hours Video Playback with 65W Fast Charge',
        description: 'Silicon-carbon cell chemistry fits maximum energy into an 8.4mm chassis. Charges from 0 to 100% in 35 minutes with bypass charging support for gaming.'
      },
      {
        id: 'materials',
        category: 'Craftsmanship & Pen',
        stat: '2.8 ms',
        statLabel: 'Ultra-Low S-Pen Latency',
        title: 'Aerospace Grade 5 Titanium with Integrated S-Pen',
        description: 'Built-in titanium S-Pen housed in an IP68-sealed silo. Write, sketch, and control camera triggers with featherweight natural feedback.'
      }
    ],
    galleryViews: [
      { id: 'ultra-overview', label: 'Studio Showcase', subtitle: 'Front Screen & Satin Titanium Back' },
      { id: 'spen-dock', label: 'S-Pen Silo', subtitle: 'Titanium Stylus with 2.8ms Ultra Latency' },
      { id: 'quad-camera', label: 'Quad Camera', subtitle: '200MP Sensor & Dual Periscope Zoom' },
      { id: 'flat-display', label: 'Anti-Reflective Panel', subtitle: 'Corning Gorilla Armor 2 Flat Glass' }
    ],
    sections: {
      display: [
        { label: 'Screen Size & Type', value: '6.9-inch Dynamic AMOLED 2X Flat Panel' },
        { label: 'Resolution', value: 'Quad HD+ (3120 x 1440 pixels, 498 ppi)' },
        { label: 'Refresh Rate', value: '1-144Hz LTPO Adaptive Refresh Rate' },
        { label: 'Peak Brightness', value: '3,200 nits Peak Outdoor Brightness with Vision Booster' },
        { label: 'Anti-Reflective Coating', value: 'Corning Gorilla Armor 2 with 75% Reflection Reduction' }
      ],
      processor: [
        { label: 'Chipset', value: 'Qualcomm Snapdragon 8 Gen 5 for Galaxy' },
        { label: 'Fabrication', value: '3nm TSMC Leading Node' },
        { label: 'CPU Cores', value: 'Octa-Core (2 Prime Oryon Cores @ 4.4GHz + 6 Performance Cores)' },
        { label: 'NPU / AI Engine', value: '140 TOPS Hexagon NPU for Generative AI & On-Device Vision' }
      ],
      ramStorage: [
        { label: 'RAM', value: '16GB LPDDR5X Ultra-High-Speed Memory' },
        { label: 'Internal Storage', value: '256GB / 512GB / 1TB UFS 4.1 High-Speed Flash' },
        { label: 'Storage Expansion', value: 'No MicroSD slot (Supports OTG Flash Drives via USB 3.2)' }
      ],
      camera: [
        { label: 'Primary Sensor', value: '200MP ISOCELL HP2SX (1/1.3", f/1.7, Dual OIS, Super Quad Pixel)' },
        { label: 'Periscope Telephoto', value: '50MP 5x Optical Periscope Zoom (10x Optical Quality, up to 100x Space Zoom)' },
        { label: 'Short Telephoto', value: '50MP 3x Optical Zoom Lens (f/2.4 OIS)' },
        { label: 'Ultra-Wide Camera', value: '50MP Ultra-Wide (120° FOV, Dual Pixel AF, Macro Mode)' },
        { label: 'Front Camera', value: '12MP Dual Pixel AF with f/2.2 aperture' },
        { label: 'Video Recording', value: '8K @ 60fps, 4K @ 120fps with HDR10+ and Audio Eraser' }
      ],
      battery: [
        { label: 'Battery Capacity', value: '5,500 mAh Silicon-Carbon High-Density Anode' },
        { label: 'Battery Endurance', value: 'Up to 31 hours of continuous video playback' },
        { label: 'Power Management', value: 'AI Battery Optimization with Bypass Charging for Gaming' }
      ],
      charging: [
        { label: 'Wired Fast Charging', value: '65W Super Fast Charging 2.0 (0 to 100% in 35 minutes)' },
        { label: 'Wireless Charging', value: '25W Fast Wireless Charging 2.0' },
        { label: 'Wireless PowerShare', value: '4.5W Reverse Wireless Charging for Earbuds and Smartwatches' }
      ],
      materials: [
        { label: 'Frame Material', value: 'Grade 5 Aerospace Titanium with Satin Anti-Fingerprint Finish' },
        { label: 'Glass Protection', value: 'Corning Gorilla Armor 2 (Front) & Satin Ceramic Glass (Back)' },
        { label: 'Stylus Housing', value: 'Integrated Titanium S-Pen Silo with IP68 Water Resistance' },
        { label: 'Water & Dust Rating', value: 'IP68 Certified (1.5 meters freshwater for up to 30 minutes)' }
      ],
      dimensions: [
        { label: 'Physical Dimensions', value: '162.8 mm (H) x 79.0 mm (W) x 8.4 mm (D)' },
        { label: 'Form Factor', value: 'Monolithic Flat-Screen Slab with Sharp Industrial Corners' }
      ],
      weight: [
        { label: 'Device Weight', value: '232 grams' },
        { label: 'S-Pen Weight', value: '3.04 grams' }
      ],
      os: [
        { label: 'Operating System', value: 'One UI 8.0 on top of Android 16' },
        { label: 'AI Features', value: 'Live Call Translate, Circle to Search, Note Assist, Generative Photo Studio' },
        { label: 'Software Support', value: '7 Generations of Android OS Upgrades and 7 Years of Security Patches' }
      ]
    }
  },
  {
    id: 'iphone-18',
    name: 'iPhone 18',
    brand: 'Apple',
    category: 'Compact Next-Gen Flagship',
    price: 79999,
    priceFormatted: '₹79,999',
    startingPrice: 'From ₹79,999',
    image: '/images/devices/iphone-18.webp',
    conceptNotice: 'Estimated concept specifications based on industry forecasts.',
    headline: 'iPhone 18. Pure power. Compact brilliance.',
    tagline: 'A refined 6.3-inch form factor housing the powerful A19 Bionic, 120Hz ProMotion display, and color-infused frosted ceramic glass.',
    editorialStat: '120Hz',
    editorialStatLabel: 'ProMotion Dynamic Retina XDR',
    colors: [
      { id: 'midnight', name: 'Midnight', hex: '#0f172a', finish: 'Deep ink black with matte frosted touch finish' },
      { id: 'starlight', name: 'Starlight', hex: '#f8fafc', finish: 'Warm luminous silver with subtle golden warmth' },
      { id: 'sunset-coral', name: 'Sunset Coral', hex: '#9a3412', finish: 'Rich saturated terracotta coral with tinted aluminum edge' },
      { id: 'deep-marine', name: 'Deep Marine', hex: '#0369a1', finish: 'Sleek ocean navy with anodized aerospace chassis' }
    ],
    highlights: [
      {
        id: 'display',
        category: 'Display Technology',
        stat: '120Hz',
        statLabel: 'Fluid Adaptive ProMotion',
        title: '6.3-inch Super Retina XDR with Always-On Display',
        description: 'For the first time on the standard iPhone, enjoy buttery 120Hz ProMotion technology with Always-On glanceable widgets and 2,500 nits outdoor peak brightness.'
      },
      {
        id: 'processor',
        category: 'Silicon Performance',
        stat: '3nm',
        statLabel: 'Next-Gen TSMC Architecture',
        title: 'Apple A19 Bionic with Hardware Ray Tracing',
        description: 'A breakthrough 6-core CPU configuration delivers console-tier gaming speeds, lightning responsiveness, and seamless Apple Intelligence privacy processing on device.'
      },
      {
        id: 'camera',
        category: 'Camera System',
        stat: '48MP',
        statLabel: 'Dual Fusion Lens with 2x Crop',
        title: '48MP Fusion Camera with Optical-Quality 2x Telephoto',
        description: 'High-resolution 48MP main sensor with sensor-shift OIS and lossless 2x optical zoom crop. Complemented by a 48MP ultra-wide sensor with macro photography.'
      },
      {
        id: 'battery',
        category: 'Endurance & Charging',
        stat: '24 hrs',
        statLabel: 'Continuous Video Streaming',
        title: '4,000 mAh High-Density Cell with 30W Fast Charge',
        description: 'All-day endurance in a compact 172g frame. MagSafe wireless charging at 25W and fast wired charging up to 50% in just 25 minutes.'
      },
      {
        id: 'materials',
        category: 'Form & Materials',
        stat: '172 g',
        statLabel: 'Featherweight Ergonomic Handfeel',
        title: '100% Recycled Aerospace Aluminum & Ceramic Shield 2',
        description: 'Contoured edges, soft-touch color-infused back glass, and Ceramic Shield 2 front protection that is tougher than any smartphone glass.'
      }
    ],
    galleryViews: [
      { id: 'compact-overview', label: 'Studio Showcase', subtitle: 'Front Screen & Frosted Color Glass Back' },
      { id: 'promotion-panel', label: '120Hz Display', subtitle: '6.3-inch Super Retina XDR OLED' },
      { id: 'fusion-camera', label: '48MP Fusion Lens', subtitle: 'Dual Diagonal Camera Housing' },
      { id: 'contoured-edge', label: 'Aluminum Frame', subtitle: 'Contoured Soft Ergonomic Edges' }
    ],
    sections: {
      display: [
        { label: 'Display Size & Type', value: '6.3-inch Super Retina XDR OLED Display' },
        { label: 'Resolution', value: '2622 x 1206 pixels at 460 ppi' },
        { label: 'Refresh Rate', value: '120Hz ProMotion with Always-On Display Mode' },
        { label: 'Peak Brightness', value: '2,500 nits Outdoor Peak Brightness (1,000 nits typical)' },
        { label: 'Haptic Touch & Contrast', value: 'Haptic Touch, 2,000,000:1 Contrast Ratio, True Tone' }
      ],
      processor: [
        { label: 'Processor Chipset', value: 'Apple A19 Bionic' },
        { label: 'Fabrication Node', value: '3nm TSMC Advanced Node' },
        { label: 'CPU Configuration', value: '6-Core CPU (2 Performance Cores + 4 Efficiency Cores)' },
        { label: 'GPU & Neural Core', value: '5-Core GPU with Hardware Ray Tracing + 16-Core Neural Engine' }
      ],
      ramStorage: [
        { label: 'Unified Memory', value: '8GB LPDDR5X Unified System Memory' },
        { label: 'Storage Tiers', value: '128GB / 256GB / 512GB NVMe Solid-State Storage' },
        { label: 'Expansion Support', value: 'No Physical Slot (High-Speed USB-C External Drive Compatible)' }
      ],
      camera: [
        { label: 'Rear Main Camera', value: '48MP Fusion Lens (24mm, f/1.6, Sensor-Shift OIS, 100% Focus Pixels)' },
        { label: 'Lossless Optical Zoom', value: '12MP 2x Telephoto (Enabled by quad-pixel sensor crop at 52mm)' },
        { label: 'Ultra-Wide Camera', value: '48MP Ultra-Wide (13mm, f/2.2, 120° Field of View)' },
        { label: 'Front TrueDepth Camera', value: '12MP f/1.9 with Autofocus & Retina Flash' },
        { label: 'Video Features', value: '4K Dolby Vision HDR at 60 fps, Cinematic Mode 4K at 30 fps, Spatial Audio' }
      ],
      battery: [
        { label: 'Battery Capacity', value: '4,000 mAh High-Density Lithium-Ion' },
        { label: 'Endurance Rating', value: 'Up to 24 hours continuous video playback' },
        { label: 'Audio Playback', value: 'Up to 90 hours continuous audio streaming' }
      ],
      charging: [
        { label: 'Wired USB-C Charging', value: '30W USB Power Delivery Fast Charge (50% charge in 25 minutes)' },
        { label: 'MagSafe Wireless', value: '25W MagSafe Wireless with 30W Power Adapter' },
        { label: 'Qi Standard Wireless', value: 'Up to 15W Qi2 Universal Wireless Charging' }
      ],
      materials: [
        { label: 'Frame Build', value: 'Aerospace-Grade 100% Recycled Aluminum Frame with Contoured Edges' },
        { label: 'Front Glass', value: 'Ceramic Shield 2 Front Cover (Tougher than any smartphone glass)' },
        { label: 'Back Surface', value: 'Color-Infused Matte Frosted Glass' },
        { label: 'Water & Dust Resistance', value: 'Rated IP68 under IEC standard 60529 (Max depth 6m up to 30 mins)' }
      ],
      dimensions: [
        { label: 'Dimensions (H x W x D)', value: '149.6 mm x 71.5 mm x 7.8 mm' },
        { label: 'Bezel Profile', value: 'Slim Uniform Rounded Ergonomic Corners' }
      ],
      weight: [
        { label: 'Total Weight', value: '172 grams' },
        { label: 'Handfeel', value: 'Featherweight compact balance designed for single-hand comfort' }
      ],
      os: [
        { label: 'Operating System', value: 'iOS 20 with On-Device Apple Intelligence' },
        { label: 'Key Capabilities', value: 'Siri with Personalized Context, Writing Tools, Genmoji, Image Playground' },
        { label: 'Support Lifecycle', value: '7+ Years of Comprehensive iOS Software & Security Updates' }
      ]
    }
  },
  {
    id: 'motorola-signature-28',
    name: 'Motorola Signature 28',
    brand: 'Motorola',
    category: 'Ultrathin Luxury Flagship',
    price: 84999,
    priceFormatted: '₹84,999',
    startingPrice: 'From ₹84,999',
    image: '/images/devices/motorola-signature-28.webp',
    conceptNotice: 'Estimated concept specifications based on industry forecasts.',
    headline: 'Motorola Signature 28. Ultrathin razor luxury.',
    tagline: 'At just 6.8mm thin, experiencing Snapdragon 8 Gen 5 power, 1-inch Sony LYT-900 camera optics, and 125W TurboPower charging.',
    editorialStat: '6.8 mm',
    editorialStatLabel: 'Ultrathin Razor Silhouette Profile',
    colors: [
      { id: 'obsidian-leather', name: 'Obsidian Leather', hex: '#27272a', finish: 'Handcrafted stain-resistant vegan leather with diamond-textured grain' },
      { id: 'pantone-olive', name: 'Pantone Classic Olive', hex: '#365314', finish: 'Pantone Color of the Year custom olive finish with matte gold accents' },
      { id: 'raw-aluminum', name: 'Raw Aluminum', hex: '#94a3b8', finish: 'Micro-milled aviation-grade aluminum with high-gloss mirror chamfers' }
    ],
    highlights: [
      {
        id: 'display',
        category: 'Display Technology',
        stat: '165Hz',
        statLabel: 'Ultra-Fast Gaming pOLED',
        title: '6.78-inch Endless Edge Quad-Curved pOLED Panel',
        description: 'Spectacular 1.5K Super HD resolution with buttery 165Hz LTPO refresh rate, 10-bit color (1.07 billion colors), and 3,000 nits peak brightness protected by Victus 2.'
      },
      {
        id: 'processor',
        category: 'Silicon Architecture',
        stat: '4.3 GHz',
        statLabel: 'Peak CPU Clock Speed',
        title: 'Qualcomm Snapdragon 8 Gen 5 AI Edition',
        description: 'Flagship 3nm processor with Adreno 840 GPU, AI frame interpolation for high-FPS gaming, and 16GB high-speed LPDDR5X RAM with virtual RAM Boost 3.0.'
      },
      {
        id: 'camera',
        category: 'Optics & Imaging',
        stat: '1-Inch',
        statLabel: 'Sony LYT-900 Camera Sensor',
        title: '50MP 1-Inch Variable Aperture Sensor (f/1.4 - f/4.0)',
        description: 'Industry-leading 1-inch Sony sensor with physical variable aperture, paired with a 50MP periscope zoom lens and Pantone-calibrated skin tone color science.'
      },
      {
        id: 'charging',
        category: 'Charging Speed',
        stat: '18 mins',
        statLabel: '0 to 100% Full Charge',
        title: '125W TurboPower Fast Charging with GaN Charger In-Box',
        description: 'Ultra-fast GaN charging reaches 100% in 18 minutes, complemented by 50W wireless charging and 10W reverse power sharing.'
      },
      {
        id: 'materials',
        category: 'Craftsmanship & Finish',
        stat: '179 g',
        statLabel: 'Curved Luxury Ergonomics',
        title: 'Pantone Curated Vegan Leather & Aviation Aluminum',
        description: 'Handcrafted vegan leather back with diamond-cut aviation-grade aluminum frame and full IP68 water and dust submersion protection.'
      }
    ],
    galleryViews: [
      { id: 'razor-overview', label: 'Studio Showcase', subtitle: 'Endless Edge Screen & Vegan Leather Back' },
      { id: 'curved-poled', label: 'Quad-Curved Display', subtitle: '165Hz Endless Edge pOLED Glass' },
      { id: 'one-inch-sensor', label: '1-Inch Optics', subtitle: '50MP Sony LYT-900 Camera Ring' },
      { id: 'thin-silhouette', label: '6.8mm Razor Profile', subtitle: 'Ultra-Slim Diamond-Cut Aviation Aluminum' }
    ],
    sections: {
      display: [
        { label: 'Display Size & Form', value: '6.78-inch Endless Edge Quad-Curved pOLED Panel' },
        { label: 'Resolution', value: '1.5K Super HD (2712 x 1220 pixels, 446 ppi)' },
        { label: 'Refresh Rate', value: '165Hz LTPO Ultra-Smooth Adaptive Gaming Rate' },
        { label: 'Color & Brightness', value: '10-bit Color (1.07 Billion Colors), DCI-P3 100%, 3,000 nits Peak Brightness' },
        { label: 'Glass Armor', value: 'Corning Gorilla Glass Victus 2 with Anti-Fingerprint Hydrophobic Coating' }
      ],
      processor: [
        { label: 'Processor Platform', value: 'Qualcomm Snapdragon 8 Gen 5 AI Edition' },
        { label: 'Process Technology', value: '3nm Ultra-Dense Architecture' },
        { label: 'CPU Architecture', value: 'Octa-Core Oryon Architecture with Core Speeds up to 4.3GHz' },
        { label: 'Graphics & AI', value: 'Adreno 840 GPU with AI Frame Interpolation & Snapdragon Neural Processing' }
      ],
      ramStorage: [
        { label: 'System Memory (RAM)', value: '16GB LPDDR5X RAM + RAM Boost 3.0 Virtual Extension' },
        { label: 'Internal Storage', value: '256GB / 512GB / 1TB UFS 4.1 High-Efficiency Storage' },
        { label: 'Card Slot', value: 'No MicroSD Card Slot (Dual Physical Nano-SIM + eSIM)' }
      ],
      camera: [
        { label: 'Primary 1-Inch Camera', value: '50MP Sony LYT-900 1-Inch Sensor (f/1.4 Variable Aperture, 23mm, OIS)' },
        { label: 'Periscope Telephoto', value: '50MP Periscope Telephoto (3.5x Optical Zoom, up to 100x Hybrid Super Zoom, OIS)' },
        { label: 'Macro & Ultra-Wide', value: '50MP Ultra-Wide Angle Lens (122° FOV, Macro Vision at 2.5cm distance)' },
        { label: 'Front Selfie Camera', value: '50MP Quad Pixel Front Camera with f/2.0 aperture and 4K Video' },
        { label: 'Camera Color Science', value: 'Pantone Validated Color & Skin Tone Reproduction with 8K Video Capture' }
      ],
      battery: [
        { label: 'Battery Capacity', value: '5,000 mAh Ultra-Dense Silicon Anode Battery' },
        { label: 'Battery Profile', value: 'Ultra-thin cell architecture enabling the 6.8mm chassis' },
        { label: 'Battery Longevity', value: 'Up to 34 hours of mixed daily productivity usage' }
      ],
      charging: [
        { label: 'Wired Fast Charging', value: '125W TurboPower Fast Charging (100% full charge in 18 minutes)' },
        { label: 'In-Box Charger', value: '125W Gallium-Nitride (GaN) Charger included inside retail packaging' },
        { label: 'Wireless Charging', value: '50W Wireless AirCharge & 10W Reverse Wireless Power Sharing' }
      ],
      materials: [
        { label: 'Back Cover Material', value: 'Handcrafted Pantone-Curated Vegan Leather with Stain-Resistant Coating' },
        { label: 'Frame Metallurgy', value: 'Precision CNC-Milled Aviation Grade Aluminum with Diamond-Cut Chamfers' },
        { label: 'Chassis Profile', value: 'Ultra-Slim 6.8mm Razor Silhouette' },
        { label: 'Water & Dust Rating', value: 'IP68 Underwater Submersible Protection (1.5m up to 30 mins)' }
      ],
      dimensions: [
        { label: 'Dimensions (H x W x D)', value: '161.4 mm x 74.2 mm x 6.8 mm' },
        { label: 'Form Factor', value: 'Quad-Curved Symmetric Waterfall Profile with Zero Sharp Edges' }
      ],
      weight: [
        { label: 'Total Weight', value: '179 grams' },
        { label: 'Handfeel', value: 'Featherweight luxury textured grip preventing accidental slips' }
      ],
      os: [
        { label: 'Operating System', value: 'Hello UI on top of Android 16' },
        { label: 'Desktop & Connectivity', value: 'Moto Connect Ready For Wireless PC/Mac Desktop Mode & Smart Connect' },
        { label: 'Security & Updates', value: 'ThinkShield for Mobile Enterprise Security & 5 Years of OS Updates' }
      ]
    }
  }
];
