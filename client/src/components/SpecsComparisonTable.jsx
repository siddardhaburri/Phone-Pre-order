import React from 'react';
import { Table, Check, Zap, Sparkles } from 'lucide-react';

export default function SpecsComparisonTable({ onPreOrderClick }) {
  const specs = [
    {
      feature: 'Display & Brightness',
      flagship: '6.82" 1-144Hz LTPO Micro-OLED (3,200 nits peak)',
      prevGen: '6.7" 120Hz AMOLED (2,400 nits)',
      competitor: '6.7" 120Hz OLED (2,600 nits)'
    },
    {
      feature: 'Chipset & Fabrication',
      flagship: 'Snapdragon 8 Gen 4 Extreme (3nm, 120 TOPS)',
      prevGen: 'Snapdragon 8 Gen 3 (4nm, 45 TOPS)',
      competitor: 'Dimensity 9300+ (4nm, 68 TOPS)'
    },
    {
      feature: 'Camera System',
      flagship: '200MP OIS + 50MP Periscope (100x Zoom) + 50MP UW',
      prevGen: '50MP OIS + 12MP 3x + 48MP UW',
      competitor: '50MP OIS + 50MP 5x + 50MP UW'
    },
    {
      feature: 'Battery & Endurance',
      flagship: '5,400mAh Silicon-Carbon Matrix (32+ hrs video)',
      prevGen: '4,800mAh Li-ion (24 hrs video)',
      competitor: '5,000mAh Li-ion (26 hrs video)'
    },
    {
      feature: 'Wired Charging Speed',
      flagship: '100W HyperCharge (0-100% in 22 mins, GaN charger in box)',
      prevGen: '65W Fast Charge (0-100% in 40 mins)',
      competitor: '45W (Charger not included)'
    },
    {
      feature: 'Wireless Charging',
      flagship: '50W Magnetic Zero-G AirCharge',
      prevGen: '15W Qi Standard',
      competitor: '15W Qi2'
    },
    {
      feature: 'Chassis & Protection',
      flagship: 'Grade 5 Aerospace Titanium, IP68 / IP69K',
      prevGen: 'Aluminum Armor, IP68',
      competitor: 'Aluminum Frame, IP68'
    },
    {
      feature: 'Pre-Order Launch Perks',
      flagship: 'Complimentary Earbuds (₹9,999) + 1-Yr Screen Care',
      prevGen: 'None',
      competitor: 'Store Voucher only'
    }
  ];

  return (
    <section id="specs" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-mono text-teal-400">
          <Table className="w-3.5 h-3.5" />
          <span>SPECIFICATIONS BENCHMARK</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
          How Apex 10 Outclasses the Competition
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Side-by-side technical specification comparison with previous generation and contemporary flagships.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="bg-slate-900/60 rounded-3xl border border-white/10 overflow-hidden backdrop-blur-md shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/10 bg-slate-900/90 text-slate-400 font-mono text-xs">
                <th className="p-4 sm:p-5 w-1/4">Feature</th>
                <th className="p-4 sm:p-5 w-2/5 bg-teal-950/40 text-teal-300 font-bold border-x border-teal-500/30">
                  <div className="flex items-center justify-between">
                    <span>Aether Apex 10 Pro</span>
                    <span className="px-2 py-0.5 rounded-full bg-teal-400 text-slate-950 text-[9px] font-extrabold uppercase">
                      New Flagship
                    </span>
                  </div>
                </th>
                <th className="p-4 sm:p-5 w-1/5 text-slate-300">Apex 9 (2025)</th>
                <th className="p-4 sm:p-5 w-1/5 text-slate-400">Other 2026 Flagships</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5 text-slate-300">
              {specs.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 sm:p-5 font-medium text-slate-400 font-mono text-xs">
                    {row.feature}
                  </td>
                  <td className="p-4 sm:p-5 font-semibold text-white bg-teal-950/20 border-x border-teal-500/20">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                      <span>{row.flagship}</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-slate-400">{row.prevGen}</td>
                  <td className="p-4 sm:p-5 text-slate-500">{row.competitor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer Callout */}
        <div className="p-5 sm:p-6 bg-slate-900/80 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 text-center sm:text-left">
            <span>Pre-order early to secure your guaranteed </span>
            <strong className="text-white">Batch 1 launch allocation</strong>
            <span> with complimentary AeroBuds Pro 2.</span>
          </div>

          <button
            onClick={onPreOrderClick}
            className="px-6 py-2.5 rounded-xl font-bold font-sans text-xs bg-teal-400 hover:bg-teal-300 text-slate-950 transition-all flex items-center gap-1.5 shadow-md shrink-0"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Pre-Order for ₹999</span>
          </button>
        </div>
      </div>
    </section>
  );
}

