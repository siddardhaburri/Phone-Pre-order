import React, { useState } from 'react';
import PhoneImage from './PhoneImage';
import { ArrowRight, Cpu, Monitor, Camera, BatteryCharging, HardDrive, Zap } from 'lucide-react';

export default function SmartphoneCard({ phone, onSelectPhone }) {
  const [selectedColor, setSelectedColor] = useState(phone.colors[0]);

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-7 flex flex-col justify-between hover:border-gray-300 transition-all duration-200 shadow-sm group">
      <div>
        {/* Top Header: Brand, Name & Price */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              {phone.brand}
            </span>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
              {phone.name}
            </h3>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 font-mono uppercase block">Starting at</span>
            <span className="text-lg font-bold text-slate-900 font-mono">
              {phone.priceFormatted}
            </span>
          </div>
        </div>

        {/* Product Visual Container */}
        <div 
          onClick={() => onSelectPhone(phone, selectedColor)}
          className="bg-[#F5F5F7] rounded-2xl p-4 mb-6 cursor-pointer hover:bg-gray-100 transition-colors flex items-center justify-center relative overflow-hidden"
          title="Click to view complete specifications"
        >
          <PhoneImage phone={phone} selectedColor={selectedColor} size="medium" />
        </div>

        {/* Color Swatches */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <span className="text-xs text-slate-500">
            Colour: <strong className="text-slate-800 font-medium">{selectedColor.name}</strong>
          </span>

          <div className="flex items-center gap-2">
            {phone.colors.map((c) => {
              const isSelected = selectedColor.id === c.id;
              return (
                <button
                  key={c.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(c);
                  }}
                  title={c.name}
                  className={`w-5 h-5 rounded-full border transition-all ${
                    isSelected ? 'ring-2 ring-slate-900 ring-offset-1 scale-110' : 'border-gray-300 hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              );
            })}
          </div>
        </div>

        {/* Specifications List */}
        <div className="space-y-3 text-xs text-slate-600 mb-6">
          {/* Display */}
          <div className="flex items-start gap-2.5">
            <Monitor className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <span className="text-slate-400 text-[10px] uppercase font-mono block">Display</span>
              <span className="font-medium text-slate-800 leading-snug">{phone.display}</span>
            </div>
          </div>

          {/* Processor */}
          <div className="flex items-start gap-2.5">
            <Cpu className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <span className="text-slate-400 text-[10px] uppercase font-mono block">Processor</span>
              <span className="font-medium text-slate-800 leading-snug">{phone.processor}</span>
            </div>
          </div>

          {/* RAM & Storage */}
          <div className="flex items-start gap-2.5">
            <HardDrive className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <span className="text-slate-400 text-[10px] uppercase font-mono block">RAM & Storage</span>
              <span className="font-medium text-slate-800 leading-snug">{phone.ramStorage}</span>
            </div>
          </div>

          {/* Camera */}
          <div className="flex items-start gap-2.5">
            <Camera className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <span className="text-slate-400 text-[10px] uppercase font-mono block">Camera System</span>
              <span className="font-medium text-slate-800 leading-snug">{phone.camera}</span>
            </div>
          </div>

          {/* Battery & Charging */}
          <div className="flex items-start gap-2.5">
            <BatteryCharging className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <span className="text-slate-400 text-[10px] uppercase font-mono block">Battery & Charging</span>
              <span className="font-medium text-slate-800 leading-snug">{phone.battery} • {phone.charging}</span>
            </div>
          </div>
        </div>

        {/* Concept Notice */}
        {phone.isConcept && (
          <div className="mb-6 p-2 rounded-xl bg-gray-50 border border-gray-200 text-[11px] text-slate-500">
            {phone.conceptNotice}
          </div>
        )}
      </div>

      {/* View Details Action */}
      <button
        onClick={() => onSelectPhone(phone, selectedColor)}
        className="w-full py-3 px-4 rounded-full text-xs font-semibold bg-gray-100 hover:bg-slate-900 hover:text-white text-slate-900 transition-all flex items-center justify-center gap-1.5"
      >
        <span>View Complete Details</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

