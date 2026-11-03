import React, { useState } from 'react';
import PhoneRender3D from './PhoneRender3D';
import { 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  ArrowRight, 
  RefreshCw, 
  Zap, 
  Clock, 
  BadgePercent,
  CheckCircle2
} from 'lucide-react';

export default function InteractiveCustomizer({
  phone,
  selectedColor,
  onColorChange,
  selectedStorage,
  onStorageChange,
  selectedCarrier,
  onCarrierChange,
  selectedPaymentType,
  onPaymentTypeChange,
  tradeInCredit = 0,
  tradeInDevice = null,
  onOpenTradeIn,
  onProceedPreOrder
}) {
  const [selectedPerk, setSelectedPerk] = useState('earbuds');

  if (!phone) return null;

  // Pricing calculations
  const storageOption = phone.storageTiers.find(s => s.id === selectedStorage) || phone.storageTiers[0];
  const baseDevicePrice = storageOption.price;
  const priceAfterTradeIn = Math.max(0, baseDevicePrice - tradeInCredit);
  
  // Early bird 5% discount for full payment
  const fullPaymentDiscount = Math.round(priceAfterTradeIn * 0.05);
  const fullPaymentTotal = priceAfterTradeIn - fullPaymentDiscount;

  const dueToday = selectedPaymentType === 'deposit' 
    ? phone.depositPrice 
    : fullPaymentTotal;

  const balanceLater = selectedPaymentType === 'deposit' 
    ? priceAfterTradeIn - phone.depositPrice 
    : 0;

  const reservationPercent = Math.round((phone.reservedUnits / phone.totalBatchUnits) * 100);

  return (
    <section id="customizer-section" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neon-teal">
          <Sparkles className="w-3.5 h-3.5" />
          <span>BESPOKE HARDWARE STUDIO</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight">
          Configure Your <span className="bg-gradient-to-r from-neon-teal to-neon-cyan bg-clip-text text-transparent">{phone.name}</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Tailor your chassis finish, storage tier, and carrier. Trade in your current phone for up to $750 instant credit toward your reservation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Interactive 3D Phone Preview with live chosen color */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col items-center">
          <div className="glass-panel w-full rounded-3xl p-8 flex flex-col items-center border border-white/10 relative overflow-hidden">
            {/* Ambient background glow */}
            <div 
              className="absolute -top-10 -left-10 w-72 h-72 rounded-full blur-3xl opacity-25 pointer-events-none"
              style={{ backgroundColor: selectedColor.accent }}
            />

            {/* Current Color Label */}
            <div className="mb-6 text-center z-10">
              <span className="text-xs uppercase font-mono tracking-widest text-slate-400">Selected Finish</span>
              <h3 className="text-lg font-bold text-white flex items-center justify-center gap-2">
                <span 
                  className="w-3 h-3 rounded-full border border-white/30"
                  style={{ backgroundColor: selectedColor.border }}
                />
                {selectedColor.name}
              </h3>
            </div>

            {/* 3D Phone Render */}
            <div className="py-2">
              <PhoneRender3D 
                color={selectedColor}
                scale={0.92}
                interactive={true}
                showScreen={true}
              />
            </div>

            {/* Micro spec bar */}
            <div className="w-full mt-6 grid grid-cols-3 gap-2 text-center pt-4 border-t border-white/10 text-xs text-slate-300">
              <div>
                <div className="font-mono text-neon-cyan font-bold">144Hz</div>
                <div className="text-[10px] text-slate-400">Micro-OLED</div>
              </div>
              <div>
                <div className="font-mono text-white font-bold">200MP</div>
                <div className="text-[10px] text-slate-400">100x Zoom</div>
              </div>
              <div>
                <div className="font-mono text-neon-teal font-bold">Zero-G</div>
                <div className="text-[10px] text-slate-400">Core Active</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Customization Controls */}
        <div className="lg:col-span-7 space-y-8">
          {/* 1. Color Selection */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-white">1. Choose Chassis Finish</h4>
                <p className="text-xs text-slate-400">Space-grade Grade 5 titanium with ceramic vapor deposition</p>
              </div>
              <span className="text-xs font-mono text-neon-teal font-semibold">{selectedColor.name}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {phone.colors.map((c) => {
                const isSelected = selectedColor.id === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => onColorChange(c)}
                    className={`relative p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col items-center gap-2.5 ${
                      isSelected
                        ? 'border-neon-teal bg-teal-950/40 shadow-neon-teal ring-1 ring-neon-teal'
                        : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <div 
                      className="w-10 h-10 rounded-full border-2 shadow-inner transition-transform"
                      style={{ 
                        backgroundColor: c.hex, 
                        borderColor: isSelected ? '#00f5d4' : c.border 
                      }}
                    />
                    <span className="text-xs font-medium text-slate-200 text-center leading-snug">
                      {c.name}
                    </span>
                    {isSelected && (
                      <span className="absolute top-2 right-2 text-neon-cyan">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Storage Tier Selection */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-white">2. Select Storage Capacity</h4>
                <p className="text-xs text-slate-400">Ultra-fast UFS 4.1 NVMe flash storage with zero latency</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {phone.storageTiers.map((tier) => {
                const isSelected = selectedStorage === tier.id;
                return (
                  <button
                    key={tier.id}
                    onClick={() => onStorageChange(tier.id)}
                    className={`relative p-4 rounded-2xl border text-left transition-all duration-200 ${
                      isSelected
                        ? 'border-neon-cyan bg-teal-950/40 shadow-neon-cyan ring-1 ring-neon-cyan'
                        : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    {tier.popular && (
                      <span className="absolute -top-2.5 left-4 px-2 py-0.5 rounded-full bg-gradient-to-r from-neon-teal to-neon-cyan text-slate-950 text-[9px] font-mono font-bold uppercase">
                        Most Popular
                      </span>
                    )}
                    <div className="text-xl font-bold font-mono text-white">{tier.capacity}</div>
                    <div className="text-xs text-slate-400 mb-2">{tier.label || 'High Capacity'}</div>
                    <div className="text-sm font-semibold text-neon-teal font-mono">
                      ${tier.price.toLocaleString()}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Carrier Selection */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 space-y-4">
            <h4 className="text-base font-bold text-white">3. Network & Carrier Connectivity</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {phone.carriers.map((carrier) => {
                const isSelected = selectedCarrier === carrier.id;
                return (
                  <button
                    key={carrier.id}
                    onClick={() => onCarrierChange(carrier.id)}
                    className={`p-3.5 rounded-2xl border text-left text-xs font-medium transition-all duration-200 flex items-center justify-between ${
                      isSelected
                        ? 'border-neon-teal bg-teal-950/40 shadow-neon-teal text-white ring-1 ring-neon-teal'
                        : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <span>{carrier.name}</span>
                    {isSelected && <Check className="w-4 h-4 text-neon-cyan shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Trade-In Valuation Drawer Trigger */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-teal-500/30 bg-teal-950/20 space-y-3 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-neon-cyan" />
                  <h4 className="text-base font-bold text-white">4. Aether Trade-In Program</h4>
                </div>
                <p className="text-xs text-slate-300">
                  {tradeInCredit > 0 ? (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Applied: {tradeInDevice?.modelName} (-${tradeInCredit} credit)
                    </span>
                  ) : (
                    'Trade in your current iPhone, Galaxy, or Pixel for up to $750 credit instantly.'
                  )}
                </p>
              </div>

              <button
                onClick={onOpenTradeIn}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold font-mono uppercase bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all flex items-center gap-1.5 shrink-0"
              >
                {tradeInCredit > 0 ? 'Change Device' : 'Estimate Trade-In'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 5. Pre-Order Payment Option */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 space-y-4">
            <h4 className="text-base font-bold text-white">5. Choose Reservation Terms</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option A: Refundable Deposit */}
              <button
                onClick={() => onPaymentTypeChange('deposit')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  selectedPaymentType === 'deposit'
                    ? 'border-neon-cyan bg-teal-950/40 shadow-neon-cyan ring-1 ring-neon-cyan'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold text-neon-cyan uppercase">Hold Queue Spot</span>
                  {selectedPaymentType === 'deposit' && <Check className="w-4 h-4 text-neon-cyan" />}
                </div>
                <div className="text-2xl font-bold font-mono text-white">${phone.depositPrice}</div>
                <p className="text-xs text-slate-400 mt-1">
                  100% Refundable pre-order deposit. Lock in priority Batch 1 allocation. Remaining balance due before shipment.
                </p>
              </button>

              {/* Option B: Full Prepayment */}
              <button
                onClick={() => onPaymentTypeChange('full')}
                className={`p-4 rounded-2xl border text-left transition-all relative ${
                  selectedPaymentType === 'full'
                    ? 'border-neon-teal bg-teal-950/40 shadow-neon-teal ring-1 ring-neon-teal'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <div className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[9px] font-mono font-bold uppercase flex items-center gap-1">
                  <BadgePercent className="w-3 h-3" />
                  Save 5% (${fullPaymentDiscount})
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Pay in Full</span>
                  {selectedPaymentType === 'full' && <Check className="w-4 h-4 text-neon-teal" />}
                </div>
                <div className="text-2xl font-bold font-mono text-white">${fullPaymentTotal.toLocaleString()}</div>
                <p className="text-xs text-slate-400 mt-1">
                  Includes 5% early-bird discount and VIP expedited overnight shipping on launch day.
                </p>
              </button>
            </div>
          </div>

          {/* 6. Batch Reservation Stock Progress */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-neon-teal" />
                {phone.batchName} Reservation Status
              </span>
              <span className="text-neon-cyan font-bold">{reservationPercent}% Claimed</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-white/10 p-[1px]">
              <div 
                className="h-full bg-gradient-to-r from-neon-teal via-teal-400 to-neon-cyan rounded-full transition-all duration-1000"
                style={{ width: `${reservationPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>{phone.reservedUnits} of {phone.totalBatchUnits} units secured</span>
              <span className="text-emerald-400">Guaranteed Delivery: {phone.releaseDate}</span>
            </div>
          </div>

          {/* 7. Summary & Sticky Checkout Bar */}
          <div className="glass-panel-glow p-6 sm:p-7 rounded-3xl border border-neon-teal/40 space-y-5">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-slate-300">
                <span>{phone.name} ({storageOption.capacity})</span>
                <span className="font-mono text-white">${baseDevicePrice.toLocaleString()}</span>
              </div>
              {tradeInCredit > 0 && (
                <div className="flex justify-between text-sm text-emerald-400 font-mono">
                  <span>Trade-In Credit ({tradeInDevice?.modelName})</span>
                  <span>-${tradeInCredit.toLocaleString()}</span>
                </div>
              )}
              {selectedPaymentType === 'full' && (
                <div className="flex justify-between text-sm text-emerald-400 font-mono">
                  <span>Early-Bird 5% Savings</span>
                  <span>-${fullPaymentDiscount.toLocaleString()}</span>
                </div>
              )}
              <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400">Due Today</div>
                  <div className="text-3xl font-extrabold font-mono text-white">
                    ${dueToday.toLocaleString()}
                  </div>
                </div>
                {selectedPaymentType === 'deposit' && (
                  <div className="text-right text-xs text-slate-400">
                    <div>Balance due at dispatch:</div>
                    <div className="font-mono font-semibold text-slate-200">${balanceLater.toLocaleString()}</div>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={onProceedPreOrder}
              className="w-full py-4 rounded-2xl font-bold font-sans text-base bg-gradient-to-r from-neon-teal via-teal-300 to-neon-cyan text-slate-950 shadow-neon-teal hover:shadow-neon-cyan hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 group"
            >
              <Zap className="w-5 h-5 fill-current" />
              <span>Lock In Pre-Order Reservation</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center gap-6 text-[11px] text-slate-400 pt-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-neon-teal" />
                100% Refundable Deposit
              </span>
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-neon-teal" />
                Insured Priority Express Air
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

