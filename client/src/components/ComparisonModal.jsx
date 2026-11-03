import React from 'react';
import { X, Scale, Zap, Check, Shield } from 'lucide-react';

export default function ComparisonModal({
  isOpen,
  onClose,
  phones,
  compareList,
  onRemoveFromCompare,
  onSelectForOrder
}) {
  if (!isOpen) return null;

  const comparedPhones = phones.filter(p => compareList.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="glass-panel w-full max-w-5xl rounded-3xl border border-white/15 p-6 sm:p-8 relative shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-neon-teal/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neon-cyan/15 border border-neon-cyan/30 flex items-center justify-center text-neon-cyan">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-display">Side-by-Side Flagship Comparison</h3>
              <p className="text-xs text-slate-400">Comparing {comparedPhones.length} next-generation devices</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Table / Cards */}
        <div className="overflow-x-auto overflow-y-auto py-6">
          {comparedPhones.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Scale className="w-10 h-10 mx-auto text-slate-600 mb-2" />
              <p>No phones selected for comparison. Add 2 or more from the catalog!</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr>
                  <th className="p-3 text-xs font-mono uppercase tracking-wider text-slate-500 w-1/4">Feature</th>
                  {comparedPhones.map(phone => (
                    <th key={phone.id} className="p-3 text-left w-1/4 align-top">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono text-neon-teal">{phone.brand}</span>
                          <button
                            onClick={() => onRemoveFromCompare(phone.id)}
                            className="text-slate-500 hover:text-rose-400 text-xs"
                            title="Remove"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <h4 className="text-sm font-bold text-white">{phone.name}</h4>
                        <div className="font-mono text-neon-cyan text-sm font-semibold">
                          from ${phone.basePrice}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          Deposit: ${phone.depositPrice}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs text-slate-300">
                <tr>
                  <td className="p-3 font-mono text-slate-400">Display</td>
                  {comparedPhones.map(p => (
                    <td key={p.id} className="p-3 font-medium text-white">{p.specs.display}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-mono text-slate-400">Processor / Silicon</td>
                  {comparedPhones.map(p => (
                    <td key={p.id} className="p-3 text-neon-cyan font-mono">{p.specs.chipset}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-mono text-slate-400">Camera System</td>
                  {comparedPhones.map(p => (
                    <td key={p.id} className="p-3">{p.specs.camera}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-mono text-slate-400">Battery & Charging</td>
                  {comparedPhones.map(p => (
                    <td key={p.id} className="p-3">{p.specs.battery}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-mono text-slate-400">Chassis & Durability</td>
                  {comparedPhones.map(p => (
                    <td key={p.id} className="p-3">{p.specs.build}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-mono text-slate-400">Operating System</td>
                  {comparedPhones.map(p => (
                    <td key={p.id} className="p-3 font-mono text-slate-300">{p.specs.os}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-mono text-slate-400">Estimated Delivery</td>
                  {comparedPhones.map(p => (
                    <td key={p.id} className="p-3 font-mono text-emerald-400 font-semibold">{p.releaseDate}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-mono text-slate-400">Action</td>
                  {comparedPhones.map(p => (
                    <td key={p.id} className="p-3">
                      <button
                        onClick={() => {
                          onSelectForOrder(p.id);
                          onClose();
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-neon-teal hover:bg-neon-cyan text-slate-950 font-bold text-xs font-mono uppercase transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <Zap className="w-3.5 h-3.5 fill-current" />
                        Configure
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

