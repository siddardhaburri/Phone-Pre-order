import React from 'react';
import { Table, Check, Zap, Sparkles } from 'lucide-react';

export default function ComparisonGrid({ catalog, onSelectPhoneForOrder }) {
  const comparisonRows = [
    {
      title: 'Display & Form Factor',
      render: (phone) => (
        <div>
          <div className="font-semibold text-white">{phone.specs.display}</div>
          <div className="text-slate-400 text-[11px] mt-0.5">{phone.specs.formFactor}</div>
        </div>
      )
    },
    {
      title: 'Processor / Chipset',
      render: (phone) => (
        <div>
          <div className="font-mono text-teal-300 font-semibold">{phone.specs.processor}</div>
          <div className="text-slate-400 text-[11px] mt-0.5">{phone.specs.weight}</div>
        </div>
      )
    },
    {
      title: 'Camera Setup',
      render: (phone) => (
        <div className="text-slate-300">
          {phone.specs.camera}
        </div>
      )
    },
    {
      title: 'Battery & Fast Charging',
      render: (phone) => (
        <div className="text-slate-300 font-mono">
          {phone.specs.battery}
        </div>
      )
    },
    {
      title: 'Estimated Delivery Month',
      render: (phone) => (
        <div className="font-mono font-bold text-teal-300">
          {phone.deliveryMonth}
        </div>
      )
    },
    {
      title: 'Pre-Order Bonus Included',
      render: (phone) => (
        <div className="text-emerald-400 text-xs">
          {phone.freePerk}
        </div>
      )
    }
  ];

  return (
    <section id="specs" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-mono text-teal-400">
          <Table className="w-3.5 h-3.5" />
          <span>SIDE-BY-SIDE BENCHMARK</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
          Flagship Comparison Matrix
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Evaluate form factors, camera hardware, and dispatch timelines across all four upcoming flagships.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="bg-slate-900/60 rounded-3xl border border-white/10 overflow-hidden backdrop-blur-md shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[850px]">
            <thead>
              <tr className="border-b border-white/10 bg-slate-900/90 text-slate-400 font-mono text-xs">
                <th className="p-4 sm:p-5 w-1/5">Specification</th>
                {catalog.map((phone) => (
                  <th key={phone.id} className="p-4 sm:p-5 w-1/5 text-left align-top">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase text-teal-400 block font-semibold">
                        {phone.brand}
                      </span>
                      <h4 className="text-base font-bold text-white leading-snug">{phone.name}</h4>
                      <div className="text-xs font-mono text-slate-300">
                        From ₹{phone.storageTiers[0].price.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] font-mono text-teal-300">
                        Token Deposit: ₹999 ($50)
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5 text-slate-300">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 sm:p-5 font-medium text-slate-400 font-mono text-xs">
                    {row.title}
                  </td>
                  {catalog.map((phone) => (
                    <td key={phone.id} className="p-4 sm:p-5">
                      {row.render(phone)}
                    </td>
                  ))}
                </tr>
              ))}

              {/* Action Button Row */}
              <tr className="bg-slate-900/40">
                <td className="p-4 sm:p-5 font-mono text-xs text-slate-400">Reserve Slot</td>
                {catalog.map((phone) => (
                  <td key={phone.id} className="p-4 sm:p-5">
                    <button
                      onClick={() => onSelectPhoneForOrder(phone.id)}
                      className="w-full py-2.5 px-3 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs font-mono uppercase transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      Configure
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

