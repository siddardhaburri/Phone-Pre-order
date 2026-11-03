import React from 'react';
import { Sparkles, Shield, Wifi, BatteryCharging } from 'lucide-react';

export default function PhoneStudioMockup({ selectedColor }) {
  return (
    <div className="relative flex flex-col items-center justify-center select-none w-full max-w-sm mx-auto">
      {/* Soft Ambient Studio Glow */}
      <div 
        className="absolute -inset-6 rounded-full blur-3xl opacity-35 transition-all duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${selectedColor.accent} 0%, ${selectedColor.border} 40%, transparent 70%)`
        }}
      />

      {/* 2D Studio Phone Mockup */}
      <div 
        className="relative w-[280px] sm:w-[310px] h-[580px] sm:h-[620px] rounded-[52px] p-[10px] transition-all duration-500 shadow-2xl"
        style={{
          background: `linear-gradient(145deg, #475569 0%, ${selectedColor.border} 45%, #0f172a 100%)`,
          boxShadow: `
            0 25px 60px -15px rgba(0, 0, 0, 0.9),
            0 0 35px -5px ${selectedColor.accent}33,
            inset 0 1px 2px rgba(255, 255, 255, 0.4),
            inset 0 -2px 4px rgba(0, 0, 0, 0.8)
          `
        }}
      >
        {/* Antenna bands */}
        <div className="absolute -left-[2px] top-28 w-[3px] h-10 bg-black/40 rounded-l" />
        <div className="absolute -left-[2px] top-44 w-[3px] h-10 bg-black/40 rounded-l" />
        <div className="absolute -right-[2px] top-32 w-[3px] h-14 bg-black/40 rounded-r" />

        {/* Inner Screen Bezel */}
        <div className="w-full h-full rounded-[44px] overflow-hidden relative bg-[#070a0f] border border-white/10 flex flex-col justify-between p-5 text-white">
          {/* Glass Specular Reflection */}
          <div 
            className="absolute inset-0 pointer-events-none z-30 opacity-40"
            style={{
              background: 'linear-gradient(125deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.02) 40%, transparent 60%)'
            }}
          />

          {/* Wallpaper dynamic gradient reflecting color */}
          <div 
            className="absolute inset-0 transition-all duration-700 opacity-80"
            style={{
              background: `
                radial-gradient(circle at 50% 15%, ${selectedColor.hex} 0%, #06090e 75%),
                radial-gradient(circle at 90% 85%, ${selectedColor.border}44 0%, transparent 55%)
              `
            }}
          />

          {/* Top Status Bar & Dynamic Pill */}
          <div className="relative z-20 flex items-center justify-between text-xs font-mono pt-1 text-slate-300">
            <span className="font-semibold text-[11px] tracking-tight">09:41</span>

            {/* Dynamic Camera Cutout Pill */}
            <div className="px-3 py-1 bg-black/90 rounded-full border border-white/10 flex items-center gap-1.5 shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-75" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 -ml-2" />
              <span className="text-[9px] font-mono tracking-wider text-emerald-300 font-bold">APEX 10</span>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] text-slate-300">
              <span className="font-bold text-teal-400">5G+</span>
              <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>

          {/* Studio Phone Center Graphic */}
          <div className="relative z-20 my-auto text-center space-y-4 py-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-teal-300 font-mono">
              <Sparkles className="w-3 h-3 text-teal-400" />
              AETHER APEX // 2026 EDITION
            </div>

            <div className="space-y-1">
              <h4 className="text-2xl font-extrabold tracking-tight text-white font-display">
                APEX 10 PRO
              </h4>
              <p className="text-xs text-slate-400">
                Aerospace Titanium • {selectedColor.name}
              </p>
            </div>

            {/* Futuristic Iris / Camera graphic */}
            <div className="relative mx-auto w-24 h-24 rounded-full border border-white/15 p-2 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div 
                className="w-16 h-16 rounded-full border-2 flex items-center justify-center transition-colors duration-500"
                style={{ borderColor: selectedColor.accent }}
              >
                <div 
                  className="w-8 h-8 rounded-full shadow-lg"
                  style={{ backgroundColor: selectedColor.accent }}
                />
              </div>
            </div>

            <div className="text-[11px] font-mono text-teal-400 font-medium">
              Snapdragon 8 Gen 4 Extreme
            </div>
          </div>

          {/* Screen Bottom Dock */}
          <div className="relative z-20 space-y-3">
            <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] py-2 px-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-slate-300">
              <div>
                <div className="font-bold text-white">200MP</div>
                <div className="text-[9px] text-slate-400">Periscope</div>
              </div>
              <div className="border-x border-white/10">
                <div className="font-bold text-teal-300">144Hz</div>
                <div className="text-[9px] text-slate-400">Micro-OLED</div>
              </div>
              <div>
                <div className="font-bold text-white">100W</div>
                <div className="text-[9px] text-slate-400">HyperCharge</div>
              </div>
            </div>

            {/* Home gesture bar */}
            <div className="w-28 h-1 bg-white/40 rounded-full mx-auto" />
          </div>
        </div>
      </div>

      {/* Realistic Shadow beneath phone */}
      <div className="w-64 h-6 rounded-[100%] bg-black/70 blur-xl mt-3 mx-auto" />
    </div>
  );
}

