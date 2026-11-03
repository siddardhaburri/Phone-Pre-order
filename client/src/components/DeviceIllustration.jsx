import React from 'react';

export default function DeviceIllustration({ deviceId, selectedColor, compact = false }) {
  const color = selectedColor || { hex: '#1c1d1f', border: '#374151' };

  if (deviceId === 'iphone-duo') {
    return (
      <div className={`relative flex items-center justify-center select-none ${compact ? 'py-4' : 'py-8'}`}>
        <div className="flex items-center gap-1">
          {/* Left Panel */}
          <div 
            className={`${compact ? 'w-20 h-36 rounded-l-2xl' : 'w-32 sm:w-36 h-56 sm:h-64 rounded-l-3xl'} border border-gray-300 p-1.5 flex flex-col justify-between transition-colors duration-300`}
            style={{ backgroundColor: color.hex }}
          >
            <div className="w-full h-full bg-slate-900 rounded-l-2xl p-2 flex flex-col justify-between text-white text-[9px] font-mono">
              <span className="text-slate-400">09:41</span>
              <div className="text-center font-sans font-medium text-slate-300">Inner Fold</div>
              <div className="w-8 h-0.5 bg-white/40 rounded-full mx-auto" />
            </div>
          </div>

          {/* Central Hinge Spine */}
          <div className={`${compact ? 'w-1 h-32' : 'w-1.5 h-52 sm:h-60'} bg-gray-400 rounded-full`} />

          {/* Right Panel */}
          <div 
            className={`${compact ? 'w-20 h-36 rounded-r-2xl' : 'w-32 sm:w-36 h-56 sm:h-64 rounded-r-3xl'} border border-gray-300 p-1.5 flex flex-col justify-between transition-colors duration-300`}
            style={{ backgroundColor: color.hex }}
          >
            <div className="w-full h-full bg-slate-900 rounded-r-2xl p-2 flex flex-col justify-between text-white text-[9px] font-mono">
              <div className="flex justify-end text-teal-400 font-bold">5G</div>
              <div className="text-center font-sans font-semibold text-white">7.9" ProMotion</div>
              <div className="w-8 h-0.5 bg-white/40 rounded-full mx-auto" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (deviceId === 'galaxy-s27-ultra') {
    return (
      <div className={`relative flex items-center justify-center select-none ${compact ? 'py-4' : 'py-8'}`}>
        <div 
          className={`${compact ? 'w-28 h-44 rounded-xl' : 'w-44 sm:w-52 h-72 sm:h-80 rounded-2xl'} border border-gray-300 p-1.5 transition-colors duration-300 relative shadow-sm`}
          style={{ backgroundColor: color.hex }}
        >
          {/* Inner Screen */}
          <div className="w-full h-full bg-slate-950 rounded-xl p-3 flex flex-col justify-between text-white">
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>09:41</span>
              <div className="w-2 h-2 rounded-full bg-black border border-gray-600" />
              <span className="text-teal-400 font-semibold">144Hz</span>
            </div>

            <div className="text-center space-y-1">
              <div className="text-xs font-semibold text-white">Galaxy S27 Ultra</div>
              <div className="text-[10px] text-slate-400 font-mono">200MP Quad • S-Pen</div>
            </div>

            <div className="flex justify-between items-center text-[9px] font-mono text-slate-400 border-t border-gray-800 pt-1">
              <span>Flat Armor</span>
              <span className="text-teal-400">5,500mAh</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (deviceId === 'iphone-18') {
    return (
      <div className={`relative flex items-center justify-center select-none ${compact ? 'py-4' : 'py-8'}`}>
        <div 
          className={`${compact ? 'w-28 h-44 rounded-3xl' : 'w-44 sm:w-50 h-72 sm:h-80 rounded-[38px]'} border border-gray-300 p-1.5 transition-colors duration-300 relative shadow-sm`}
          style={{ backgroundColor: color.hex }}
        >
          <div className="w-full h-full bg-slate-950 rounded-[32px] p-3 flex flex-col justify-between text-white">
            {/* Dynamic Island */}
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>09:41</span>
              <div className="w-10 h-3 bg-black rounded-full border border-gray-700" />
              <span className="text-teal-400 font-semibold">5G</span>
            </div>

            <div className="text-center space-y-1">
              <div className="text-xs font-semibold text-white">iPhone 18</div>
              <div className="text-[10px] text-slate-400">A19 Bionic • 6.3" Compact</div>
            </div>

            <div className="w-16 h-1 bg-white/40 rounded-full mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  // Motorola Signature 28
  return (
    <div className={`relative flex items-center justify-center select-none ${compact ? 'py-4' : 'py-8'}`}>
      <div 
        className={`${compact ? 'w-28 h-44 rounded-2xl' : 'w-44 sm:w-52 h-72 sm:h-80 rounded-3xl'} border border-gray-300 p-1.5 transition-colors duration-300 relative shadow-sm`}
        style={{ backgroundColor: color.hex }}
      >
        <div className="w-full h-full bg-slate-950 rounded-2xl p-3 flex flex-col justify-between text-white">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>09:41</span>
            <span className="text-[9px] px-1.5 py-0.2 bg-teal-900/60 text-teal-300 rounded font-mono">6.8mm</span>
          </div>

          <div className="text-center space-y-1">
            <div className="text-xs font-semibold text-white">Signature 28</div>
            <div className="text-[10px] text-slate-400">Vegan Leather • 1" Sony LYT</div>
          </div>

          <div className="flex justify-between items-center text-[9px] font-mono text-slate-400 border-t border-gray-800 pt-1">
            <span>125W Turbo</span>
            <span className="text-teal-400">165Hz pOLED</span>
          </div>
        </div>
      </div>
    </div>
  );
}

