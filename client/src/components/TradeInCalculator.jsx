import React, { useState, useEffect } from 'react';
import { X, RefreshCw, Check, AlertCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { fetchTradeInCatalog, getTradeInQuote } from '../utils/api';

const DEFAULT_BRANDS = [
  {
    brand: "Apple",
    models: [
      { id: "iphone-15-pro-max", name: "iPhone 15 Pro Max", maxCredit: 750 },
      { id: "iphone-15-pro", name: "iPhone 15 Pro", maxCredit: 650 },
      { id: "iphone-15", name: "iPhone 15 / 15 Plus", maxCredit: 500 },
      { id: "iphone-14-pro-max", name: "iPhone 14 Pro Max", maxCredit: 550 },
      { id: "iphone-14-pro", name: "iPhone 14 Pro", maxCredit: 480 },
      { id: "iphone-13-pro", name: "iPhone 13 Pro", maxCredit: 380 }
    ]
  },
  {
    brand: "Samsung",
    models: [
      { id: "galaxy-s24-ultra", name: "Galaxy S24 Ultra", maxCredit: 720 },
      { id: "galaxy-s24-plus", name: "Galaxy S24 / S24+", maxCredit: 520 },
      { id: "galaxy-z-fold-5", name: "Galaxy Z Fold 5", maxCredit: 680 },
      { id: "galaxy-s23-ultra", name: "Galaxy S23 Ultra", maxCredit: 480 }
    ]
  },
  {
    brand: "Google",
    models: [
      { id: "pixel-9-pro", name: "Pixel 9 Pro / XL", maxCredit: 620 },
      { id: "pixel-8-pro", name: "Pixel 8 Pro", maxCredit: 450 },
      { id: "pixel-7-pro", name: "Pixel 7 Pro", maxCredit: 280 }
    ]
  }
];

const CONDITIONS = [
  { key: 'flawless', label: 'Flawless', desc: 'No scratches, 100% perfect screen and battery', mult: 1.0 },
  { key: 'good', label: 'Good', desc: 'Light signs of normal daily use, fully functional', mult: 0.85 },
  { key: 'fair', label: 'Fair', desc: 'Visible scuffs, micro-scratches on glass, works well', mult: 0.65 },
  { key: 'cracked', label: 'Cracked Glass', desc: 'Screen/back glass cracked, but powers on & touches', mult: 0.35 }
];

export default function TradeInCalculator({ isOpen, onClose, onApplyCredit, currentApplied }) {
  const [catalog, setCatalog] = useState(DEFAULT_BRANDS);
  const [selectedBrand, setSelectedBrand] = useState('Apple');
  const [selectedModelId, setSelectedModelId] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('good');
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadCatalog() {
      const data = await fetchTradeInCatalog();
      if (data && data.length > 0) {
        setCatalog(data);
      }
    }
    loadCatalog();
  }, []);

  const activeBrandGroup = catalog.find(c => c.brand.toLowerCase() === selectedBrand.toLowerCase()) || catalog[0];

  // Auto-select first model when brand changes
  useEffect(() => {
    if (activeBrandGroup?.models?.length > 0) {
      setSelectedModelId(activeBrandGroup.models[0].id);
    }
  }, [selectedBrand, catalog]);

  // Recalculate quote whenever model or condition changes
  useEffect(() => {
    if (!selectedModelId) return;
    async function updateQuote() {
      setLoading(true);
      try {
        const res = await getTradeInQuote(selectedModelId, selectedCondition);
        if (res) {
          setQuote(res);
        } else {
          // Client calculation fallback
          const model = activeBrandGroup.models.find(m => m.id === selectedModelId);
          const cond = CONDITIONS.find(c => c.key === selectedCondition) || CONDITIONS[1];
          if (model) {
            setQuote({
              modelName: model.name,
              brand: activeBrandGroup.brand,
              maxCredit: model.maxCredit,
              condition: cond.label,
              estimatedCredit: Math.round(model.maxCredit * cond.mult)
            });
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    updateQuote();
  }, [selectedModelId, selectedCondition, activeBrandGroup]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="glass-panel w-full max-w-2xl rounded-3xl border border-white/15 p-6 sm:p-8 relative shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neon-teal/15 border border-neon-teal/30 flex items-center justify-center text-neon-cyan">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-display">Aether Trade-In Valuation</h3>
              <p className="text-xs text-slate-400">Get an instant pre-order discount by trading in your current phone</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto space-y-6 py-5 pr-1">
          {/* Brand Tabs */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
              Select Device Brand
            </label>
            <div className="flex flex-wrap gap-2">
              {catalog.map((b) => (
                <button
                  key={b.brand}
                  onClick={() => setSelectedBrand(b.brand)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedBrand.toLowerCase() === b.brand.toLowerCase()
                      ? 'bg-neon-teal text-slate-950 font-bold shadow-neon-teal'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {b.brand}
                </button>
              ))}
            </div>
          </div>

          {/* Model Selection */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
              Select Current Model
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {activeBrandGroup.models.map((model) => (
                <button
                  key={model.id}
                  onClick={() => setSelectedModelId(model.id)}
                  className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                    selectedModelId === model.id
                      ? 'border-neon-cyan bg-teal-950/40 text-white ring-1 ring-neon-cyan shadow-sm'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <span className="font-medium truncate">{model.name}</span>
                  <span className="font-mono text-[11px] text-slate-400 shrink-0 ml-2">
                    Up to ${model.maxCredit}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Condition Selection */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
              Assess Condition
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {CONDITIONS.map((cond) => (
                <button
                  key={cond.key}
                  onClick={() => setSelectedCondition(cond.key)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedCondition === cond.key
                      ? 'border-neon-teal bg-teal-950/40 ring-1 ring-neon-teal'
                      : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-white mb-0.5">
                    <span>{cond.label}</span>
                    {selectedCondition === cond.key && <Check className="w-3.5 h-3.5 text-neon-cyan" />}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">{cond.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Live Valuation Output Box */}
          {quote && (
            <div className="glass-panel-glow p-5 rounded-2xl border border-neon-cyan/40 bg-teal-950/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neon-cyan font-bold">
                  Estimated Trade-In Credit
                </span>
                <div className="text-3xl font-extrabold font-mono text-white mt-0.5">
                  ${quote.estimatedCredit}
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  For your <strong className="text-white">{quote.modelName}</strong> ({quote.condition})
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Locked in for 30 days upon pre-order reservation</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between shrink-0 gap-3">
          {currentApplied > 0 ? (
            <button
              onClick={() => {
                onApplyCredit(null, 0);
                onClose();
              }}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              Remove Trade-In
            </button>
          ) : <div />}

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={!quote}
              onClick={() => {
                if (quote) {
                  onApplyCredit(quote, quote.estimatedCredit);
                  onClose();
                }
              }}
              className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase font-mono bg-gradient-to-r from-neon-teal to-neon-cyan text-slate-950 shadow-neon-teal hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Apply ${quote?.estimatedCredit || 0} Credit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

