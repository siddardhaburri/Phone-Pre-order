import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function CountdownTimer() {
  // Target pre-order window close date: 4 days, 16 hours, 28 minutes, 40 seconds from now
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 16,
    minutes: 28,
    seconds: 40
  });

  useEffect(() => {
    // 4 days from now as fixed reference
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 4);
    targetDate.setHours(targetDate.getHours() + 16);
    targetDate.setMinutes(targetDate.getMinutes() + 28);
    targetDate.setSeconds(targetDate.getSeconds() + 40);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, '0');

  const units = [
    { label: 'DAYS', value: formatNumber(timeLeft.days) },
    { label: 'HOURS', value: formatNumber(timeLeft.hours) },
    { label: 'MINUTES', value: formatNumber(timeLeft.minutes) },
    { label: 'SECONDS', value: formatNumber(timeLeft.seconds) },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 text-xs font-mono text-teal-400 font-semibold tracking-wider uppercase">
        <Clock className="w-3.5 h-3.5" />
        <span>Pre-Order Window Closes In</span>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {units.map((unit, index) => (
          <React.Fragment key={unit.label}>
            <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-2.5 sm:p-3 min-w-[62px] sm:min-w-[74px] text-center shadow-lg backdrop-blur-md">
              <div className="text-xl sm:text-2xl font-mono font-extrabold text-white tracking-tight">
                {unit.value}
              </div>
              <div className="text-[9px] sm:text-[10px] font-mono text-slate-400 mt-0.5 tracking-wider font-medium">
                {unit.label}
              </div>
            </div>

            {index < units.length - 1 && (
              <span className="text-slate-600 font-mono font-bold text-lg -mt-3">:</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

