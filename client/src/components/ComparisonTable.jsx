import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function ComparisonTable({ devices, onSelectDevice }) {
  const specRows = [
    { label: 'Display', key: 'display' },
    { label: 'Processor', key: 'processor' },
    { label: 'Camera', key: 'camera' },
    { label: 'Battery', key: 'battery' },
    { label: 'Charging', key: 'charging' },
    { label: 'Storage', key: 'storage' },
    { label: 'Estimated Launch', key: 'launchDate' },
  ];

  return (
    <section id="compare" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200">
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-14 space-y-3">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
          Compare All Flagships
        </h2>
        <p className="text-slate-600 text-sm sm:text-base">
          A side-by-side benchmark of form factors, processors, optical hardware, and launch pricing.
        </p>
      </div>

      {/* Clean Table Container */}
      <div className="rounded-3xl border border-gray-200 bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[750px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/70 text-slate-500 font-medium">
                <th className="p-4 sm:p-5 w-1/5 text-xs uppercase tracking-wider">Specification</th>
                {devices.map((device) => (
                  <th key={device.id} className="p-4 sm:p-5 w-1/5 align-top">
                    <span className="text-[10px] uppercase font-semibold text-teal-700 block tracking-wider">
                      {device.brand}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                      {device.name}
                    </h4>
                    <div className="text-xs font-semibold text-slate-700 font-mono mt-1">
                      From ₹{device.startingPrice.toLocaleString('en-IN')}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-slate-700">
              {specRows.map((row) => (
                <tr key={row.key} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 sm:p-5 font-medium text-slate-900 text-xs">
                    {row.label}
                  </td>
                  {devices.map((device) => (
                    <td key={device.id} className="p-4 sm:p-5 text-slate-600 leading-snug">
                      {device.specs[row.key]}
                    </td>
                  ))}
                </tr>
              ))}

              {/* Price row */}
              <tr className="hover:bg-gray-50/50">
                <td className="p-4 sm:p-5 font-medium text-slate-900 text-xs">
                  Deposit / Starting Price
                </td>
                {devices.map((device) => (
                  <td key={device.id} className="p-4 sm:p-5">
                    <div className="font-mono text-xs font-bold text-slate-900">
                      ₹999 Token Deposit
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      Retail: ₹{device.startingPrice.toLocaleString('en-IN')}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Configure Action Row */}
              <tr className="bg-gray-50/40">
                <td className="p-4 sm:p-5 text-xs text-slate-500">Configure Device</td>
                {devices.map((device) => (
                  <td key={device.id} className="p-4 sm:p-5">
                    <button
                      onClick={() => onSelectDevice(device.id)}
                      className="w-full py-2 px-3 rounded-full text-xs font-semibold bg-white hover:bg-slate-900 hover:text-white border border-gray-300 text-slate-800 transition-all flex items-center justify-center gap-1"
                    >
                      <span>Configure</span>
                      <ArrowRight className="w-3 h-3" />
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

