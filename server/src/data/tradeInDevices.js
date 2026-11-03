export const TRADE_IN_CATALOG = [
  {
    brand: "Apple",
    models: [
      { id: "iphone-15-pro-max", name: "iPhone 15 Pro Max", maxCredit: 750 },
      { id: "iphone-15-pro", name: "iPhone 15 Pro", maxCredit: 650 },
      { id: "iphone-15", name: "iPhone 15 / 15 Plus", maxCredit: 500 },
      { id: "iphone-14-pro-max", name: "iPhone 14 Pro Max", maxCredit: 550 },
      { id: "iphone-14-pro", name: "iPhone 14 Pro", maxCredit: 480 },
      { id: "iphone-13-pro", name: "iPhone 13 Pro", maxCredit: 380 },
      { id: "iphone-12", name: "iPhone 12 / 12 Pro", maxCredit: 250 }
    ]
  },
  {
    brand: "Samsung",
    models: [
      { id: "galaxy-s24-ultra", name: "Galaxy S24 Ultra", maxCredit: 720 },
      { id: "galaxy-s24-plus", name: "Galaxy S24 / S24+", maxCredit: 520 },
      { id: "galaxy-z-fold-5", name: "Galaxy Z Fold 5", maxCredit: 680 },
      { id: "galaxy-s23-ultra", name: "Galaxy S23 Ultra", maxCredit: 480 },
      { id: "galaxy-s22-ultra", name: "Galaxy S22 Ultra", maxCredit: 340 }
    ]
  },
  {
    brand: "Google",
    models: [
      { id: "pixel-9-pro", name: "Pixel 9 Pro / XL", maxCredit: 620 },
      { id: "pixel-8-pro", name: "Pixel 8 Pro", maxCredit: 450 },
      { id: "pixel-7-pro", name: "Pixel 7 Pro", maxCredit: 280 }
    ]
  },
  {
    brand: "Other Brand",
    models: [
      { id: "flagship-recent", name: "Other 2024-2025 Flagship (OnePlus, Xiaomi, etc.)", maxCredit: 400 },
      { id: "flagship-older", name: "Older Smartphone (2022-2023)", maxCredit: 200 }
    ]
  }
];

export const CONDITION_MULTIPLIERS = {
  flawless: { multiplier: 1.0, label: "Flawless (No scratches, perfect screen and battery)" },
  good: { multiplier: 0.85, label: "Good (Minor cosmetic wear, fully functional)" },
  fair: { multiplier: 0.65, label: "Fair (Visible scratches or dents, fully working)" },
  cracked: { multiplier: 0.35, label: "Cracked Glass (Powers on, touch works, cracked screen/back)" }
};

export function calculateTradeInValue(modelId, conditionKey) {
  for (const group of TRADE_IN_CATALOG) {
    const match = group.models.find(m => m.id === modelId);
    if (match) {
      const cond = CONDITION_MULTIPLIERS[conditionKey] || CONDITION_MULTIPLIERS.good;
      const estimatedValue = Math.round(match.maxCredit * cond.multiplier);
      return {
        modelName: match.name,
        brand: group.brand,
        maxCredit: match.maxCredit,
        condition: cond.label,
        estimatedCredit: estimatedValue
      };
    }
  }
  return null;
}

