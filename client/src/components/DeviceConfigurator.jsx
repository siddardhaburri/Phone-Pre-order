import React from 'react';
import DeviceIllustration from './DeviceIllustration';
import { Check, ShieldCheck, Truck, RotateCcw, ArrowRight } from 'lucide-react';

export default function DeviceConfigurator({
  devices,
  activeDeviceId,
  onSelectDevice,
  selectedColor,
  onColorChange,
  selectedStorage,
  onStorageChange,
  onOpenReservation
}) {
  const activeDevice = devices.find(d => d.id === activeDeviceId) || devices[0];
  const activeStorageTier = activeDevice.storageTiers.find(t => t.id === selectedStorage) || activeDevice.storageTiers[0];

  const tokenDeposit = 999;
  const balanceDue = activeStorageTier.price - tokenDeposit;

  return (
    <section id="configurator" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200">
      {/* Section Header */}
      <div className="max-w-2xl mx-auto text-center mb-12 space-y-3">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
          Device Configurator
        </h2>
        <p className="text-slate-600 text-sm sm:text-base">
          Customize your finish and storage capacity. Secure your place in the priority launch batch with a ₹999 refundable token deposit.
        </p>
      </div>

      {/* Model Switcher Tabs */}
      <div className="max-w-3xl mx-auto mb-14">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 rounded-2xl bg-gray-100 border border-gray-200">
          {devices.map((device) => {
            const isActive = device.id === activeDeviceId;
            return (
              <button
                key={device.id}
                onClick={() => onSelectDevice(device.id)}
                className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 flex flex-col items-center justify-center text-center ${
                  isActive
                    ? 'bg-white text-slate-950 shadow-sm border border-gray-200/80 font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="truncate w-full">{device.name}</span>
                <span className="text-[11px] font-mono text-slate-500 font-normal">
                  From ₹{device.startingPrice.toLocaleString('en-IN')}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Configurator 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Device Visual Stage */}
        <div className="lg:col-span-5 bg-gray-50 rounded-3xl p-8 border border-gray-200 flex flex-col items-center justify-between text-center min-h-[440px]">
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-500 font-medium block">
              {activeDevice.brand}
            </span>
            <h3 className="text-xl font-bold text-slate-900 mt-1">
              {activeDevice.name}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Finish: <strong className="text-slate-800">{selectedColor.name}</strong>
            </p>
          </div>

          {/* Clean Device Visual */}
          <div className="my-auto py-4">
            <DeviceIllustration 
              deviceId={activeDevice.id} 
              selectedColor={selectedColor} 
            />
          </div>

          {/* Estimated dispatch tag */}
          <div className="text-xs text-slate-500">
            Estimated Launch: <strong className="text-slate-800">{activeDevice.specs.launchDate}</strong>
          </div>
        </div>

        {/* Right Column: Customization Controls */}
        <div className="lg:col-span-7 space-y-8">
          {/* 1. Color Selector */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  1. Choose Finish
                </h4>
                <p className="text-xs text-slate-500">Precision aerospace finish</p>
              </div>
              <span className="text-xs font-semibold text-slate-700">{selectedColor.name}</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {activeDevice.colors.map((c) => {
                const isSelected = selectedColor.id === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => onColorChange(c)}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col items-start gap-2.5 ${
                      isSelected
                        ? 'border-teal-600 bg-teal-50/30 ring-1 ring-teal-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div 
                        className="w-6 h-6 rounded-full border border-gray-300 shadow-sm"
                        style={{ backgroundColor: c.hex }}
                      />
                      {isSelected && <Check className="w-4 h-4 text-teal-600" />}
                    </div>
                    <span className="text-xs font-semibold text-slate-900 leading-snug">{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Storage Selector */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200 space-y-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                2. Choose Storage Capacity
              </h4>
              <p className="text-xs text-slate-500">High-speed NVMe flash storage with estimated monthly EMI</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {activeDevice.storageTiers.map((tier) => {
                const isSelected = selectedStorage === tier.id;
                return (
                  <button
                    key={tier.id}
                    onClick={() => onStorageChange(tier.id)}
                    className={`p-4 rounded-2xl border text-left transition-all relative ${
                      isSelected
                        ? 'border-teal-600 bg-teal-50/30 ring-1 ring-teal-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {tier.popular && (
                      <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-slate-900 text-white text-[9px] font-semibold uppercase tracking-wider">
                        Popular
                      </span>
                    )}

                    <div className="text-lg font-bold text-slate-900 font-mono mb-1">
                      {tier.capacity}
                    </div>

                    <div className="text-sm font-bold text-slate-900 font-mono">
                      ₹{tier.price.toLocaleString('en-IN')}
                    </div>

                    <div className="text-[11px] text-teal-700 font-medium mt-0.5">
                      or ₹{tier.emi.toLocaleString('en-IN')}/mo
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Reservation Breakdown Card */}
          <div className="bg-gray-50 rounded-3xl p-6 sm:p-7 border border-gray-200 space-y-5">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs sm:text-sm text-slate-600">
                <span>Selected Configuration</span>
                <span className="font-semibold text-slate-900">
                  {activeDevice.name} ({selectedColor.name}, {activeStorageTier.capacity})
                </span>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm text-slate-600">
                <span>Total Retail Price</span>
                <span className="font-mono text-slate-900 font-semibold">
                  ₹{activeStorageTier.price.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-teal-700 font-medium">
                <span>Launch Day Perk</span>
                <span>{activeDevice.launchBonus}</span>
              </div>

              {/* Price Split */}
              <div className="pt-3 border-t border-gray-200 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">
                    Token Deposit Due Today
                  </div>
                  <div className="text-3xl font-bold font-mono text-slate-900">
                    ₹{tokenDeposit.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="text-left sm:text-right text-xs text-slate-500">
                  <div>Remaining balance upon dispatch:</div>
                  <div className="font-mono text-base font-bold text-slate-800">
                    ₹{balanceDue.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={onOpenReservation}
              className="w-full py-4 rounded-full font-semibold text-sm bg-slate-950 hover:bg-slate-800 text-white transition-all shadow-sm flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              <span>Reserve Slot for ₹999</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Assurances */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-teal-600" />
                100% Refundable
              </span>
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-teal-600" />
                Free Priority Air Freight
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                Official Warranty
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
