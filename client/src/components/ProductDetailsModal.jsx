import React, { useState } from 'react';
import PhoneImage from './PhoneImage';
import { X, Check, Monitor, Cpu, Camera, BatteryCharging, HardDrive, Shield, Ruler, Weight, Layers } from 'lucide-react';

export default function ProductDetailsModal({ phone, initialColor, onClose }) {
  const [activeColor, setActiveColor] = useState(initialColor || phone?.colors[0]);

  if (!phone) return null;

  const specRows = [
    { label: 'Display', value: phone.display, icon: Monitor },
    { label: 'Processor', value: phone.processor, icon: Cpu },
    { label: 'RAM & Storage', value: phone.ramStorage, icon: HardDrive },
    { label: 'Camera System', value: phone.camera, icon: Camera },
    { label: 'Battery Capacity', value: phone.battery, icon: BatteryCharging },
    { label: 'Charging Speed', value: phone.charging, icon: BatteryCharging },
    { label: 'Materials & Build', value: phone.buildMaterials, icon: Shield },
    { label: 'Dimensions', value: phone.dimensions, icon: Ruler },
    { label: 'Weight', value: phone.weight, icon: Weight },
    { label: 'Operating System', value: phone.os, icon: Layers },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-4xl bg-white rounded-3xl border border-gray-200 p-6 sm:p-10 relative shadow-xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 text-slate-400 hover:text-slate-900 transition-colors z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto pr-1 space-y-8">
          {/* Header Area */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200 pb-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold block">
                {phone.brand}
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mt-0.5">
                {phone.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                {phone.tagline}
              </p>
            </div>

            <div className="sm:text-right">
              <span className="text-xs uppercase font-mono text-slate-400 block">Starting Price</span>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-950">
                {phone.priceFormatted}
              </div>
            </div>
          </div>

          {/* Product Visual & Color Switcher */}
          <div className="bg-[#F5F5F7] rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center border border-gray-100">
            <PhoneImage phone={phone} selectedColor={activeColor} size="large" />

            <div className="mt-4 flex flex-col items-center gap-2">
              <div className="text-xs text-slate-600">
                Finish: <strong className="text-slate-900">{activeColor.name}</strong>
              </div>

              {/* Color Swatch Radios */}
              <div className="flex items-center gap-3">
                {phone.colors.map((c) => {
                  const isSelected = activeColor.id === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setActiveColor(c)}
                      className={`p-1 rounded-full border transition-all ${
                        isSelected ? 'border-slate-900 ring-1 ring-slate-900' : 'border-transparent hover:scale-105'
                      }`}
                      title={c.name}
                    >
                      <div 
                        className="w-6 h-6 rounded-full border border-gray-300"
                        style={{ backgroundColor: c.hex }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Overview Section */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Product Overview
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {phone.overview}
            </p>
          </div>

          {/* Complete Technical Specifications Table */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Complete Technical Specifications
            </h4>

            <div className="rounded-2xl border border-gray-200 overflow-hidden divide-y divide-gray-200">
              {specRows.map((spec, index) => {
                const IconComponent = spec.icon;
                return (
                  <div 
                    key={index} 
                    className="p-4 sm:p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 bg-white hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 sm:w-1/3 text-xs font-semibold text-slate-700">
                      <IconComponent className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{spec.label}</span>
                    </div>

                    <div className="sm:w-2/3 text-xs sm:text-sm text-slate-900 font-medium leading-snug">
                      {spec.value}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Unconfirmed Concept Notice Banner */}
          {phone.isConcept && (
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-slate-500 leading-relaxed">
              <strong className="text-slate-700 block mb-0.5">Specification Notice:</strong>
              {phone.conceptNotice} Technical features, pricing, and launch dates represent concept projections and may be subject to manufacturer confirmation upon formal announcement.
            </div>
          )}

          {/* Bottom Actions */}
          <div className="pt-4 flex justify-end border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-colors"
            >
              Close Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

