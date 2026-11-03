import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Choose your smartphone.',
      description: 'Explore the 2026–2027 flagship collection and select your preferred device, color finish, and storage tier.'
    },
    {
      num: '02',
      title: 'Reserve with ₹999.',
      description: 'Lock in your place in the priority manufacturing batch with an unconditionally refundable ₹999 token deposit.'
    },
    {
      num: '03',
      title: 'Confirm your order when ready.',
      description: 'When your device is calibrated and prepared for courier dispatch, settle the remaining balance via card, EMI, or UPI.'
    },
    {
      num: '04',
      title: 'Receive your smartphone on launch.',
      description: 'Enjoy guaranteed launch-day insured express air delivery to your doorstep along with your complimentary audio perks.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-200">
      <div className="max-w-2xl mx-auto text-center mb-16 space-y-3">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
          How It Works
        </h2>
        <p className="text-slate-600 text-sm sm:text-base">
          A straightforward four-step reservation process designed for complete peace of mind.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step) => (
          <div
            key={step.num}
            className="rounded-3xl border border-gray-200 bg-white p-7 flex flex-col justify-between"
          >
            <div>
              <span className="font-mono text-xs font-bold text-teal-600 block mb-4">
                STEP {step.num}
              </span>
              <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                {step.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-gray-100 flex items-center text-[11px] text-slate-500 font-medium">
              <span>Guaranteed Allocation</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
