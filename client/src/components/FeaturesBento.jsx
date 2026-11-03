import React from 'react';
import { 
  Cpu, 
  Camera, 
  BatteryCharging, 
  Monitor, 
  Shield, 
  Radio, 
  Sparkles, 
  Zap,
  Layers
} from 'lucide-react';

export default function FeaturesBento() {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-mono text-teal-400">
          <Layers className="w-3.5 h-3.5" />
          <span>BREAKTHROUGH HARDWARE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
          Engineered Without Compromise
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Every component has been redesigned to deliver unprecedented processing speed, optical fidelity, and enduring battery life.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {/* Card 1: Processor (Large 2-column) */}
        <div className="md:col-span-2 bg-slate-900/60 rounded-3xl p-7 sm:p-8 border border-white/10 relative overflow-hidden backdrop-blur-md flex flex-col justify-between group hover:border-teal-500/40 transition-colors">
          <div className="space-y-4 z-10">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <Cpu className="w-6 h-6" />
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase text-teal-400 tracking-wider font-semibold">
                3nm Neural Silicon
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                Snapdragon 8 Gen 4 Extreme
              </h3>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              Custom Oryon CPU cores clocked up to 4.32GHz paired with a 120 TOPS Neural NPU. Effortlessly renders ray-traced AAA games and local generative AI models with 45% greater energy efficiency.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-6 mt-6 border-t border-white/10 text-xs font-mono z-10">
            <div>
              <div className="text-xl font-bold text-white">4.32 GHz</div>
              <div className="text-slate-500 text-[10px]">Peak Clock Speed</div>
            </div>
            <div>
              <div className="text-xl font-bold text-teal-300">120 TOPS</div>
              <div className="text-slate-500 text-[10px]">On-Device AI NPU</div>
            </div>
            <div>
              <div className="text-xl font-bold text-white">+45%</div>
              <div className="text-slate-500 text-[10px]">Efficiency Gain</div>
            </div>
          </div>
        </div>

        {/* Card 2: 200MP Camera System (2-column) */}
        <div className="md:col-span-2 bg-slate-900/60 rounded-3xl p-7 sm:p-8 border border-white/10 relative overflow-hidden backdrop-blur-md flex flex-col justify-between group hover:border-teal-500/40 transition-colors">
          <div className="space-y-4 z-10">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <Camera className="w-6 h-6" />
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase text-teal-400 tracking-wider font-semibold">
                Quad-Periscope Optics
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                200MP Ultra-Precision Camera
              </h3>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              A massive 1/1.14-inch customized sensor with f/1.4 variable mechanical aperture and 100x Space Zoom. Cinematic 8K 60fps Dolby Vision video recording with hardware gyro OIS.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-6 mt-6 border-t border-white/10 text-xs font-mono z-10">
            <div>
              <div className="text-xl font-bold text-white">200 MP</div>
              <div className="text-slate-500 text-[10px]">Main Sensor</div>
            </div>
            <div>
              <div className="text-xl font-bold text-teal-300">100x</div>
              <div className="text-slate-500 text-[10px]">Optical Space Zoom</div>
            </div>
            <div>
              <div className="text-xl font-bold text-white">8K 60fps</div>
              <div className="text-slate-500 text-[10px]">Dolby Vision HDR</div>
            </div>
          </div>
        </div>

        {/* Card 3: Battery & Charging */}
        <div className="md:col-span-1 bg-slate-900/60 rounded-3xl p-6 border border-white/10 flex flex-col justify-between hover:border-teal-500/40 transition-colors">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <BatteryCharging className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-white">5,400mAh Silicon Battery</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Next-generation silicon-carbon anode delivers over 32 hours of continuous video playback.
            </p>
          </div>

          <div className="pt-4 border-t border-white/10 text-xs font-mono mt-4">
            <span className="text-teal-300 font-bold text-base">100W HyperCharge</span>
            <span className="text-slate-400 block text-[10px]">0 to 100% in 22 mins</span>
          </div>
        </div>

        {/* Card 4: Display */}
        <div className="md:col-span-1 bg-slate-900/60 rounded-3xl p-6 border border-white/10 flex flex-col justify-between hover:border-teal-500/40 transition-colors">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <Monitor className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-white">144Hz Micro-OLED</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              6.82-inch LTPO 1-144Hz panel with 3,200 nits peak outdoor brightness and Corning Gorilla Armor 2.
            </p>
          </div>

          <div className="pt-4 border-t border-white/10 text-xs font-mono mt-4">
            <span className="text-teal-300 font-bold text-base">3,200 Nits Peak</span>
            <span className="text-slate-400 block text-[10px]">Anti-Reflective Armor</span>
          </div>
        </div>

        {/* Card 5: Titanium Chassis */}
        <div className="md:col-span-1 bg-slate-900/60 rounded-3xl p-6 border border-white/10 flex flex-col justify-between hover:border-teal-500/40 transition-colors">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-white">Aerospace Titanium</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Grade 5 titanium alloy frame micro-blasted with satin finish. IP68 and IP69K waterproof protection.
            </p>
          </div>

          <div className="pt-4 border-t border-white/10 text-xs font-mono mt-4">
            <span className="text-teal-300 font-bold text-base">IP68 / IP69K</span>
            <span className="text-slate-400 block text-[10px]">Water & Dust Sealed</span>
          </div>
        </div>

        {/* Card 6: Satellite Connectivity */}
        <div className="md:col-span-1 bg-slate-900/60 rounded-3xl p-6 border border-white/10 flex flex-col justify-between hover:border-teal-500/40 transition-colors">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <Radio className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-white">Satellite SOS</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Two-way direct-to-satellite messaging for emergency rescue without cell coverage or Wi-Fi.
            </p>
          </div>

          <div className="pt-4 border-t border-white/10 text-xs font-mono mt-4">
            <span className="text-teal-300 font-bold text-base">Wi-Fi 7 + 5G SA</span>
            <span className="text-slate-400 block text-[10px]">Dual-frequency GNSS</span>
          </div>
        </div>
      </div>
    </section>
  );
}

