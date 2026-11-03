import React, { useState } from 'react';

export default function PhoneRender3D({ 
  color = { hex: '#0d3935', border: '#34A89A', accent: '#00f5d4', name: 'Cosmic Neon Teal' },
  interactive = true,
  scale = 1.0,
  showScreen = true
}) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Limit rotation angle to smooth subtle 3D tilt
    const rotateY = (x / (rect.width / 2)) * 16;
    const rotateX = -(y / (rect.height / 2)) * 16;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div 
      className="relative flex items-center justify-center select-none"
      style={{ perspective: '1200px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Outer Zero-G Ambient Glow */}
      <div 
        className="absolute -inset-10 rounded-full blur-3xl opacity-40 transition-all duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${color.accent}66 0%, ${color.border}22 50%, transparent 75%)`,
          transform: isHovered ? 'scale(1.15)' : 'scale(1.0)'
        }}
      />

      {/* 3D Phone Body Container */}
      <div 
        className="relative transition-transform duration-200 ease-out cursor-grab active:cursor-grabbing"
        style={{
          transform: `scale(${scale}) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transformStyle: 'preserve-3d',
          width: '280px',
          height: '560px',
        }}
      >
        {/* Chassis Outer Rim / Titanium Frame */}
        <div 
          className="absolute inset-0 rounded-[48px] p-[3px] shadow-2xl transition-all duration-500"
          style={{
            background: `linear-gradient(135deg, #64748b 0%, ${color.border} 50%, #1e293b 100%)`,
            boxShadow: `
              0 25px 60px -15px rgba(0, 0, 0, 0.9),
              0 0 40px -10px ${color.border}55,
              inset 0 1px 2px rgba(255, 255, 255, 0.4),
              inset 0 -2px 4px rgba(0, 0, 0, 0.8)
            `
          }}
        >
          {/* Inner Bezel */}
          <div 
            className="w-full h-full rounded-[45px] p-[10px] overflow-hidden relative flex flex-col justify-between"
            style={{
              backgroundColor: '#05070b',
              border: `1px solid rgba(255,255,255,0.1)`
            }}
          >
            {/* Screen Glass Reflection Layer */}
            <div 
              className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
              style={{
                background: `linear-gradient(
                  115deg,
                  rgba(255,255,255,0.18) 0%,
                  rgba(255,255,255,0.05) 30%,
                  transparent 50%,
                  rgba(0, 245, 212, 0.08) 80%,
                  rgba(255,255,255,0.12) 100%
                )`,
                transform: `translateX(${rotate.y * 2}px) translateY(${rotate.x * 2}px)`
              }}
            />

            {/* Front Screen Content */}
            {showScreen && (
              <div className="relative w-full h-full rounded-[38px] overflow-hidden flex flex-col justify-between p-4 z-20 text-white font-sans bg-[#090d14]">
                {/* Dynamic Screen Wallpaper Pattern */}
                <div 
                  className="absolute inset-0 opacity-80"
                  style={{
                    background: `
                      radial-gradient(circle at 50% 20%, ${color.hex} 0%, #06090e 85%),
                      radial-gradient(circle at 80% 80%, ${color.border}33 0%, transparent 60%)
                    `
                  }}
                />
                
                {/* Antigravity Holographic Grid line */}
                <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

                {/* Dynamic Island / Zero-G Sensor Pill */}
                <div className="relative z-20 flex items-center justify-between pt-1 px-1">
                  <span className="text-[11px] font-mono font-medium tracking-tight text-slate-300">09:42</span>
                  
                  {/* Dynamic Island Pill */}
                  <div className="px-3 py-1 bg-black/80 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-1.5 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-75" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 -ml-2.5" />
                    <span className="text-[9px] font-mono tracking-wider text-emerald-400 font-semibold">ZERO-G</span>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-slate-300">
                    <span className="text-[9px] font-bold text-neon-teal">5G+</span>
                    <div className="w-4 h-2 rounded-sm border border-slate-400 p-[1px] flex items-center">
                      <div className="w-full h-full bg-neon-cyan rounded-[1px]" />
                    </div>
                  </div>
                </div>

                {/* Central Screen UI: AETHER Core Live Monitor */}
                <div className="relative z-20 my-auto text-center space-y-3 py-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-neon-cyan font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
                    GRAV-STABILIZER // ACTIVE
                  </div>

                  <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
                    {/* Concentric Gyro Rings */}
                    <div 
                      className="absolute inset-0 rounded-full border border-dashed border-teal-500/40 animate-spin"
                      style={{ animationDuration: '14s' }}
                    />
                    <div 
                      className="absolute inset-2 rounded-full border border-teal-400/30 animate-spin"
                      style={{ animationDuration: '8s', animationDirection: 'reverse' }}
                    />
                    <div className="text-center">
                      <div className="text-xl font-bold font-mono tracking-tighter text-white">0.00g</div>
                      <div className="text-[8px] font-mono uppercase tracking-widest text-slate-400">Micro-G</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold tracking-wide text-slate-200">AETHER NOVA TITAN</h4>
                    <p className="text-[10px] text-slate-400">Quantum Neural Sync 99.8%</p>
                  </div>
                </div>

                {/* Bottom Screen Bar */}
                <div className="relative z-20 flex flex-col items-center gap-2">
                  <div className="flex items-center justify-around w-full px-2 py-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <span className="text-[10px] text-slate-400">Snapdragon 8G4</span>
                    <span className="text-[10px] text-neon-teal font-medium">3nm Silicon</span>
                    <span className="text-[10px] text-slate-400">200MP OIS</span>
                  </div>
                  {/* Home Indicator Bar */}
                  <div className="w-24 h-1 bg-white/40 rounded-full" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Realistic Volume & Power Buttons on Sides */}
        <div 
          className="absolute -left-[4px] top-28 w-[3px] h-12 rounded-l-sm transition-colors duration-300"
          style={{ backgroundColor: color.border }}
        />
        <div 
          className="absolute -left-[4px] top-44 w-[3px] h-12 rounded-l-sm transition-colors duration-300"
          style={{ backgroundColor: color.border }}
        />
        <div 
          className="absolute -right-[4px] top-32 w-[3px] h-16 rounded-r-sm transition-colors duration-300"
          style={{ backgroundColor: color.border }}
        />

        {/* Back Camera Bump Hologram (visible when rotated or hovering) */}
        <div 
          className="absolute -top-2 -right-2 w-28 h-32 rounded-3xl p-2 opacity-25 pointer-events-none -z-10 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(0,0,0,0.8))',
            border: `1px solid ${color.border}66`,
            boxShadow: `0 0 20px ${color.border}44`
          }}
        />
      </div>
    </div>
  );
}

