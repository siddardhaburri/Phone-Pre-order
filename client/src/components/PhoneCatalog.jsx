import React, { useState } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  Zap, 
  ArrowRight, 
  Check, 
  Scale, 
  Clock, 
  Sparkles,
  Layers
} from 'lucide-react';

export default function PhoneCatalog({
  phones,
  activePhoneId,
  onSelectPhone,
  onOpenCompare,
  compareList,
  onToggleCompare
}) {
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const brands = ['all', 'Aether', 'CyberTech', 'Vanguard', 'Luminary'];

  const filteredPhones = phones.filter((phone) => {
    const matchesBrand = selectedBrand === 'all' || phone.brand.toLowerCase() === selectedBrand.toLowerCase();
    const matchesSearch = 
      phone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      phone.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      phone.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBrand && matchesSearch;
  });

  return (
    <section id="catalog-section" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      {/* Catalog Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neon-teal mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>GLOBAL LAUNCH CATALOG // 2026-2027</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Upcoming Flagship Pre-Orders
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mt-1">
            Browse next-generation smartphones. Reserve your manufacturing batch position with a fully refundable deposit.
          </p>
        </div>

        {/* Comparison Trigger Pill if phones are selected */}
        {compareList.length > 0 && (
          <div className="glass-panel-glow px-4 py-2.5 rounded-2xl border border-neon-cyan/40 flex items-center gap-3">
            <span className="text-xs font-mono text-slate-300">
              <strong className="text-neon-cyan">{compareList.length}</strong> phones queued for comparison
            </span>
            <button
              onClick={onOpenCompare}
              className="px-3.5 py-1.5 rounded-xl bg-neon-cyan text-slate-950 text-xs font-bold font-mono flex items-center gap-1.5 hover:brightness-110 active:scale-95 transition-all shadow-neon-cyan"
            >
              <Scale className="w-3.5 h-3.5" />
              Compare Now
            </button>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBrand(b)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedBrand === b
                  ? 'bg-neon-teal text-slate-950 font-bold shadow-neon-teal'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {b === 'all' ? 'All Flagships' : b}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search phones, specs, brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-neon-teal transition-colors"
          />
        </div>
      </div>

      {/* Phone Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPhones.map((phone) => {
          const isActive = phone.id === activePhoneId;
          const isCompared = compareList.includes(phone.id);
          const percentClaimed = Math.round((phone.reservedUnits / phone.totalBatchUnits) * 100);

          return (
            <div
              key={phone.id}
              className={`glass-panel rounded-3xl p-6 border flex flex-col justify-between transition-all duration-300 relative group hover:border-neon-teal/50 ${
                isActive
                  ? 'border-neon-teal bg-teal-950/20 shadow-neon-teal'
                  : 'border-white/10 bg-slate-900/40'
              }`}
            >
              {/* Badge & Compare toggle */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-wider text-neon-teal font-semibold">
                  {phone.badge || phone.brand}
                </span>

                <button
                  onClick={() => onToggleCompare(phone.id)}
                  title="Compare specs"
                  className={`p-1.5 rounded-lg border text-[11px] font-mono transition-colors flex items-center gap-1 ${
                    isCompared
                      ? 'border-neon-cyan bg-neon-cyan/20 text-neon-cyan'
                      : 'border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span className="text-[10px]">{isCompared ? 'Added' : 'Compare'}</span>
                </button>
              </div>

              {/* Minimal Phone Mockup Vignette */}
              <div 
                className="my-3 py-6 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden transition-transform duration-300 group-hover:scale-105"
                style={{
                  background: `radial-gradient(circle, ${phone.colors[0]?.hex}33 0%, transparent 70%)`
                }}
              >
                {/* Mini CSS Phone Representation */}
                <div 
                  className="w-24 h-44 rounded-2xl border-2 p-1.5 shadow-xl flex flex-col justify-between relative transition-colors"
                  style={{
                    backgroundColor: '#070a0f',
                    borderColor: phone.colors[0]?.border || '#34A89A'
                  }}
                >
                  <div className="w-6 h-1 bg-white/20 rounded-full mx-auto" />
                  <div className="text-center font-mono text-[8px] text-neon-teal font-semibold">
                    {phone.brand.toUpperCase()}
                  </div>
                  <div className="w-8 h-0.5 bg-white/30 rounded-full mx-auto" />
                </div>
              </div>

              {/* Title & Info */}
              <div className="space-y-2 mb-4">
                <div className="text-xs font-mono text-slate-400">{phone.brand}</div>
                <h3 className="text-lg font-bold text-white group-hover:text-neon-cyan transition-colors leading-snug">
                  {phone.name}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {phone.shortDescription}
                </p>
              </div>

              {/* Mini Color Swatches */}
              <div className="flex items-center gap-1.5 mb-4">
                {phone.colors.map((c) => (
                  <span
                    key={c.id}
                    className="w-3.5 h-3.5 rounded-full border border-white/20"
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
                <span className="text-[11px] text-slate-400 font-mono ml-1">
                  {phone.colors.length} Finishes
                </span>
              </div>

              {/* Key Specs Pills */}
              <div className="space-y-1.5 py-3 border-t border-b border-white/10 mb-4 text-[11px] text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Camera</span>
                  <span className="font-mono text-slate-200">{phone.specs.camera.split('+')[0]}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Chipset</span>
                  <span className="font-mono text-slate-200">{phone.specs.chipset.split('(')[0]}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Ship Date</span>
                  <span className="font-mono text-neon-teal">{phone.releaseDate}</span>
                </div>
              </div>

              {/* Batch Fill Rate */}
              <div className="space-y-1 mb-5">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>{phone.batchName}</span>
                  <span className="text-neon-cyan font-bold">{percentClaimed}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-neon-teal rounded-full"
                    style={{ width: `${percentClaimed}%` }}
                  />
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="pt-2">
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">Deposit</span>
                    <span className="text-xl font-bold font-mono text-white">${phone.depositPrice}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-400 block">Full Price</span>
                    <span className="text-xs font-mono text-slate-300">from ${phone.basePrice}</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectPhone(phone.id)}
                  className={`w-full py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-1.5 ${
                    isActive
                      ? 'bg-gradient-to-r from-neon-teal to-neon-cyan text-slate-950 font-bold shadow-neon-teal'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>{isActive ? 'Currently Customizing' : 'Customize & Reserve'}</span>
                  {!isActive && <ArrowRight className="w-3.5 h-3.5 ml-1" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

