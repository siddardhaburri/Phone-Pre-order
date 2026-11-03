import React, { useState } from 'react';

export default function PhoneImage({ phone, selectedColor, size = 'medium' }) {
  const [hasError, setHasError] = useState(false);
  const color = selectedColor || phone.colors[0];
  const isLarge = size === 'large';

  return (
    <div className={`w-full flex items-center justify-center relative select-none ${isLarge ? 'h-72 sm:h-96' : 'h-52 sm:h-60'}`}>
      {!hasError && phone.image ? (
        <img
          src={phone.image}
          alt={`${phone.name} Front and Rear View`}
          onError={() => setHasError(true)}
          className={`object-contain max-h-full max-w-full drop-shadow-sm transition-transform duration-300 ${
            !isLarge ? 'group-hover:scale-105' : ''
          }`}
          loading="lazy"
        />
      ) : (
        /* Graceful fallback SVG/CSS illustration */
        <div className="flex items-center justify-center gap-2">
          {/* Front View */}
          <div 
            className={`${isLarge ? 'w-28 sm:w-36 h-56 sm:h-68 rounded-2xl' : 'w-20 sm:w-24 h-40 sm:h-44 rounded-xl'} border border-gray-300 p-1 bg-slate-950 flex flex-col justify-between text-white shadow-sm`}
          >
            <div className="flex justify-between items-center text-[9px] font-mono text-slate-400 px-1 pt-0.5">
              <span>09:41</span>
              <span className="text-teal-400 font-bold">5G</span>
            </div>
            <div className="text-center">
              <span className="text-[10px] font-semibold text-white block">{phone.name}</span>
              <span className="text-[8px] text-slate-400">Front Display</span>
            </div>
            <div className="w-10 h-0.5 bg-white/40 rounded-full mx-auto mb-0.5" />
          </div>

          {/* Back View */}
          <div 
            className={`${isLarge ? 'w-28 sm:w-36 h-56 sm:h-68 rounded-2xl' : 'w-20 sm:w-24 h-40 sm:h-44 rounded-xl'} border border-gray-300 p-2 flex flex-col justify-between shadow-sm transition-colors duration-200`}
            style={{ backgroundColor: color.hex }}
          >
            <div className="w-6 h-6 rounded-lg bg-black/40 border border-white/20 p-1 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-white/40" />
            </div>
            <div className="text-center text-[9px] font-mono text-slate-400">
              {color.name}
            </div>
            <div className="text-center font-bold text-[9px] text-white">
              {phone.brand}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
