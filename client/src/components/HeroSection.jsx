import React, { useState, useEffect } from 'react';
import { ArrowRight, Clock } from 'lucide-react';

export default function HeroSection({ onExploreClick, onReserveClick }) {
  // Clean minimal countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 14,
    minutes: 32,
    seconds: 18
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (n) => String(n).padStart(2, '0');

  return (
    <section className="pt-20 pb-20 sm:pt-28 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
      {/* Sub-headline Tag */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 text-xs font-medium text-slate-600 mb-6 bg-gray-50">
        <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
        <span>2026–2027 Flagship Pre-Orders Open</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-950 max-w-4xl mx-auto leading-[1.08]">
        The Next Generation Starts Here.
      </h1>

      {/* Subtitle */}
      <p className="mt-6 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
        Explore four upcoming flagship smartphones from Apple, Samsung, and Motorola. Reserve your preferred device today with a 100% refundable token deposit of ₹999.
      </p>

      {/* Action Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={onReserveClick}
          className="w-full sm:w-auto px-7 py-3.5 rounded-full font-semibold text-sm bg-slate-950 hover:bg-slate-800 text-white transition-all shadow-sm flex items-center justify-center gap-2"
        >
          <span>Reserve Your Device</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={onExploreClick}
          className="w-full sm:w-auto px-7 py-3.5 rounded-full font-semibold text-sm bg-white hover:bg-gray-50 border border-gray-200 text-slate-700 transition-all"
        >
          Explore Devices
        </button>
      </div>

      {/* Small Clean Reservation Countdown */}
      <div className="mt-14 inline-flex flex-col sm:flex-row items-center gap-3 p-3 rounded-2xl border border-gray-200 bg-gray-50/70 text-slate-600">
        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700 px-2">
          <Clock className="w-3.5 h-3.5 text-teal-600" />
          <span>Priority Reservation Window:</span>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs font-semibold text-slate-900">
          <span className="px-2 py-1 bg-white border border-gray-200 rounded-md">{format(timeLeft.days)}d</span>
          <span>:</span>
          <span className="px-2 py-1 bg-white border border-gray-200 rounded-md">{format(timeLeft.hours)}h</span>
          <span>:</span>
          <span className="px-2 py-1 bg-white border border-gray-200 rounded-md">{format(timeLeft.minutes)}m</span>
          <span>:</span>
          <span className="px-2 py-1 bg-white border border-gray-200 rounded-md text-teal-600">{format(timeLeft.seconds)}s</span>
        </div>
      </div>
    </section>
  );
}
