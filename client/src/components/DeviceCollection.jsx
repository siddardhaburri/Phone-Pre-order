import React from 'react';
import DeviceIllustration from './DeviceIllustration';
import { ArrowRight } from 'lucide-react';

export default function DeviceCollection({ devices, onConfigureDevice }) {
  return (
    <section id="collection" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200">
      {/* Section Header */}
      <div className="max-w-2xl mx-auto text-center mb-16 space-y-3">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
          The Smartphone Collection
        </h2>
        <p className="text-slate-600 text-sm sm:text-base">
          Four distinct hardware philosophies. Select any model to configure storage, colors, and reserve your launch spot.
        </p>
      </div>

      {/* 4-Card Clean Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {devices.map((device) => (
          <div
            key={device.id}
            className="rounded-3xl border border-gray-200 bg-white p-6 flex flex-col justify-between hover:border-gray-300 transition-all duration-200 group"
          >
            <div>
              {/* Device Visual Illustration */}
              <div className="bg-gray-50 rounded-2xl p-2 mb-6 flex items-center justify-center border border-gray-100 group-hover:bg-gray-100/60 transition-colors">
                <DeviceIllustration 
                  deviceId={device.id} 
                  selectedColor={device.colors[0]} 
                  compact={true} 
                />
              </div>

              {/* Brand and Model */}
              <div className="space-y-1 mb-2">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {device.brand}
                </span>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
                  {device.name}
                </h3>
              </div>

              {/* Starting Price */}
              <div className="text-base font-semibold text-slate-900 mb-3">
                From ₹{device.startingPrice.toLocaleString('en-IN')}
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                {device.description}
              </p>

              {/* Launch Bonus Pill */}
              <div className="mb-6 p-2 rounded-xl bg-teal-50 border border-teal-100 text-[11px] text-teal-800 leading-snug">
                <span className="font-semibold block text-teal-900">Launch Perk Included</span>
                <span className="text-teal-700">{device.launchBonus}</span>
              </div>
            </div>

            {/* Configure CTA Button */}
            <button
              onClick={() => onConfigureDevice(device.id)}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-gray-100 hover:bg-slate-900 hover:text-white text-slate-900 transition-all flex items-center justify-center gap-1.5"
            >
              <span>Configure & Reserve</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

