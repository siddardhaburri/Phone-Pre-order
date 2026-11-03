import React from 'react';
import { Sparkles, Layers, PenTool, Flame, BatteryCharging, Radio } from 'lucide-react';

export default function PhoneShowcaseGraphic({ phone, selectedColor }) {
  if (!phone || !selectedColor) return null;

  return (
    <div className="relative flex flex-col items-center justify-center select-none w-full max-w-sm sm:max-w-md mx-auto">
      {/* Ambient Floor Glow matching selected color */}
      <div 
        className="absolute -inset-6 rounded-full blur-3xl opacity-40 transition-all duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${selectedColor.accent}44 0%, ${selectedColor.border}22 50%, transparent 75%)`
        }}
      />

      {/* RENDER VARIATION BASED ON PHONE TYPE */}
      {phone.id === 'iphone-duo' && (
        /* iPhone Duo Foldable Silhouette */
        <div className="relative flex items-center justify-center gap-1.5 p-3">
          {/* Left Screen Panel */}
          <div 
            className="w-[155px] sm:w-[175px] h-[340px] sm:h-[370px] rounded-l-[32px] rounded-r-[8px] p-[6px] border-y border-l transition-all duration-500 shadow-2xl relative overflow-hidden"
            style={{
              backgroundColor: '#0a0e17',
              borderColor: selectedColor.border,
              boxShadow: `0 20px 50px -10px rgba(0,0,0,0.9), 0 0 20px ${selectedColor.accent}22`
            }}
          >
            {/* Screen Wallpaper */}
            <div 
              className="w-full h-full rounded-l-[26px] rounded-r-[4px] p-3 flex flex-col justify-between relative overflow-hidden"
              style={{
                background: `radial-gradient(circle at 10% 20%, ${selectedColor.hex} 0%, #06090f 90%)`
              }}
            >
              <div className="text-[10px] font-mono text-slate-400">09:41</div>
              <div className="text-center space-y-1 my-auto">
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-sky-300">
                  A19 PRO
                </span>
                <div className="text-sm font-bold text-white leading-tight">DUO CANVAS</div>
                <div className="text-[9px] text-slate-400">Foldable 7.9" Display</div>
              </div>
              <div className="w-12 h-1 bg-white/30 rounded-full mx-auto" />
            </div>
          </div>

          {/* Central Liquid Metal Hinge Spine */}
          <div 
            className="w-[5px] h-[310px] sm:h-[340px] rounded-full shadow-inner"
            style={{
              backgroundColor: selectedColor.border,
              boxShadow: `inset 0 0 4px rgba(0,0,0,0.8)`
            }}
          />

          {/* Right Screen Panel */}
          <div 
            className="w-[155px] sm:w-[175px] h-[340px] sm:h-[370px] rounded-r-[32px] rounded-l-[8px] p-[6px] border-y border-r transition-all duration-500 shadow-2xl relative overflow-hidden"
            style={{
              backgroundColor: '#0a0e17',
              borderColor: selectedColor.border,
              boxShadow: `0 20px 50px -10px rgba(0,0,0,0.9), 0 0 20px ${selectedColor.accent}22`
            }}
          >
            {/* Screen Wallpaper */}
            <div 
              className="w-full h-full rounded-r-[26px] rounded-l-[4px] p-3 flex flex-col justify-between relative overflow-hidden"
              style={{
                background: `radial-gradient(circle at 90% 80%, ${selectedColor.hex} 0%, #06090f 90%)`
              }}
            >
              <div className="flex justify-end text-[10px] font-bold text-teal-400 font-mono">5G+</div>
              <div className="my-auto space-y-2 text-center">
                {/* Dual App Preview */}
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-[9px] text-slate-300">
                  <div className="text-teal-300 font-mono font-bold">Split Screen Mode</div>
                  <div>Liquid Metal Spine</div>
                </div>
              </div>
              <div className="w-12 h-1 bg-white/30 rounded-full mx-auto" />
            </div>
          </div>
        </div>
      )}

      {phone.id === 'galaxy-s27-ultra' && (
        /* Samsung Galaxy S27 Ultra Boxy Monolith with S-Pen tip */
        <div 
          className="relative w-[270px] sm:w-[290px] h-[480px] sm:h-[520px] rounded-[24px] p-[8px] transition-all duration-500 shadow-2xl border-2"
          style={{
            backgroundColor: '#070a0f',
            borderColor: selectedColor.border,
            boxShadow: `0 25px 60px -15px rgba(0,0,0,0.9), 0 0 35px ${selectedColor.accent}33`
          }}
        >
          {/* Inner Screen Bezel */}
          <div 
            className="w-full h-full rounded-[18px] p-4 flex flex-col justify-between text-white relative overflow-hidden border border-white/10"
            style={{
              background: `
                radial-gradient(circle at 50% 10%, ${selectedColor.hex} 0%, #06090e 80%),
                radial-gradient(circle at 80% 80%, ${selectedColor.border}33 0%, transparent 60%)
              `
            }}
          >
            {/* Dynamic Status Bar */}
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>09:41</span>
              {/* Punch hole camera */}
              <div className="w-3.5 h-3.5 rounded-full bg-black border border-white/20 mx-auto" />
              <span className="text-teal-400 font-bold">S27 ULTRA</span>
            </div>

            {/* Quad Camera Cluster & S-Pen Floating preview */}
            <div className="my-auto text-center space-y-3 py-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-amber-300">
                <PenTool className="w-3 h-3" />
                INTEGRATED S-PEN ACTIVE
              </div>

              <div className="text-xl sm:text-2xl font-extrabold font-display tracking-tight text-white">
                200MP QUAD OPTICS
              </div>

              <p className="text-xs text-slate-300">
                100x Space Zoom • Snapdragon 8 Gen 5
              </p>

              {/* Floating Camera Lenses Mock */}
              <div className="flex justify-center gap-2 pt-2">
                <div className="w-7 h-7 rounded-full bg-black/80 border-2 border-slate-500 shadow-lg flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-teal-400/80" />
                </div>
                <div className="w-7 h-7 rounded-full bg-black/80 border-2 border-slate-500 shadow-lg flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-cyan-400/80" />
                </div>
                <div className="w-7 h-7 rounded-full bg-black/80 border-2 border-slate-500 shadow-lg flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-purple-400/80" />
                </div>
              </div>
            </div>

            {/* Bottom Bar with S-Pen Silo Indicator */}
            <div className="flex items-center justify-between text-[10px] font-mono pt-3 border-t border-white/10 text-slate-400">
              <span>6.9" 144Hz AMOLED</span>
              <span className="text-emerald-400">5,500mAh</span>
            </div>
          </div>
        </div>
      )}

      {phone.id === 'iphone-18' && (
        /* iPhone 18 Compact Rounded Flagship */
        <div 
          className="relative w-[260px] sm:w-[280px] h-[480px] sm:h-[510px] rounded-[48px] p-[9px] transition-all duration-500 shadow-2xl border"
          style={{
            backgroundColor: '#070a0f',
            borderColor: selectedColor.border,
            boxShadow: `0 25px 60px -15px rgba(0,0,0,0.9), 0 0 35px ${selectedColor.accent}33`
          }}
        >
          {/* Inner Screen */}
          <div 
            className="w-full h-full rounded-[40px] p-4 flex flex-col justify-between text-white relative overflow-hidden border border-white/10"
            style={{
              background: `
                radial-gradient(circle at 50% 25%, ${selectedColor.hex} 0%, #05070c 80%)
              `
            }}
          >
            {/* Dynamic Island Pill */}
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
              <span>09:41</span>
              <div className="px-3 py-1 bg-black rounded-full border border-white/15 flex items-center gap-1.5 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                <span className="text-[9px] font-mono text-teal-300">DYNAMIC ISLAND</span>
              </div>
              <span className="text-teal-400 font-bold">5G</span>
            </div>

            {/* Center Content */}
            <div className="my-auto text-center space-y-3 py-4">
              <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                Compact Flagship 6.3"
              </span>

              <h4 className="text-2xl font-extrabold font-display text-white">
                iPhone 18
              </h4>

              <p className="text-xs text-slate-400">
                120Hz ProMotion • A19 Bionic Silicon
              </p>

              <div className="w-20 h-20 rounded-full border border-white/15 mx-auto flex items-center justify-center p-2 bg-black/40">
                <div 
                  className="w-12 h-12 rounded-full border-2 transition-colors duration-500 flex items-center justify-center"
                  style={{ borderColor: selectedColor.accent }}
                >
                  <div 
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: selectedColor.accent }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 px-2 py-1 bg-white/5 rounded-xl">
                <span>Dual 48MP Fusion</span>
                <span className="text-teal-300">172g Featherweight</span>
              </div>
              <div className="w-24 h-1 bg-white/40 rounded-full mx-auto" />
            </div>
          </div>
        </div>
      )}

      {phone.id === 'moto-signature-28' && (
        /* Motorola Signature 28 Ultra-Slim Luxury */
        <div 
          className="relative w-[265px] sm:w-[285px] h-[490px] sm:h-[530px] rounded-[36px] p-[8px] transition-all duration-500 shadow-2xl border-2"
          style={{
            backgroundColor: '#0a0d14',
            borderColor: selectedColor.border,
            boxShadow: `0 25px 60px -15px rgba(0,0,0,0.9), 0 0 35px ${selectedColor.accent}33`
          }}
        >
          {/* Inner Screen */}
          <div 
            className="w-full h-full rounded-[30px] p-4 flex flex-col justify-between text-white relative overflow-hidden border border-white/10"
            style={{
              background: `
                radial-gradient(circle at 50% 15%, ${selectedColor.hex} 0%, #06090e 85%)
              `
            }}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
              <span>09:41</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-lime-500/10 text-lime-400 border border-lime-500/20">
                6.8mm RAZOR
              </span>
              <span className="text-teal-400 font-bold">165Hz</span>
            </div>

            {/* Center Content */}
            <div className="my-auto text-center space-y-3 py-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300">
                <Sparkles className="w-3 h-3 text-teal-400" />
                PANTONE LUXURY VEGAN LEATHER
              </div>

              <h4 className="text-2xl font-extrabold font-display text-white">
                SIGNATURE 28
              </h4>

              <p className="text-xs text-slate-400">
                1-Inch Sony LYT-900 Optics • 125W TurboPower
              </p>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
                <div>0 to 100% in 18 Minutes</div>
                <div className="text-teal-300 text-[10px]">Endless Edge pOLED</div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex items-center justify-between text-[10px] font-mono pt-3 border-t border-white/10 text-slate-400">
              <span>Featherweight 179g</span>
              <span className="text-emerald-400">Snapdragon 8 Gen 5</span>
            </div>
          </div>
        </div>
      )}

      {/* Realistic Shadow beneath phone */}
      <div className="w-60 h-5 rounded-[100%] bg-black/75 blur-xl mt-3 mx-auto" />
    </div>
  );
}

