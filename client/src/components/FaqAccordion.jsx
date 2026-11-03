import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ShieldCheck, RotateCcw } from 'lucide-react';

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0); // First question open by default

  const faqs = [
    {
      question: "Is the ₹999 pre-order deposit refundable if I change my mind?",
      answer: "Yes, 100% unconditionally refundable. If you decide not to proceed with the purchase for any reason prior to dispatch, simply click 'Cancel Reservation' in your booking tracker or email support. Your full ₹999 / $50 token deposit will be instantly processed and credited back to your original payment method within 24 to 48 hours."
    },
    {
      question: "When do I pay the remaining balance?",
      answer: "You only pay the remaining balance when your chosen device has passed final factory quality verification and is packaged for courier dispatch (approximately 3 to 5 days before your estimated dispatch window). You will receive an SMS and email notification with an encrypted payment link supporting Credit Card EMI, UPI, or Net Banking."
    },
    {
      question: "What free gifts or early-bird perks come with the pre-order?",
      answer: "Every priority pre-order includes our exclusive Early Bird Launch Bundle: 1) Model-specific wireless audio gear (e.g., AirPods Pro 3 for iPhone Duo, Galaxy Buds3 Pro for Galaxy S27 Ultra, or Moto Buds+ with Sound by Bose), 2) 1-Year Comprehensive Screen Damage Care with doorstep pickup, and 3) Guaranteed launch-day priority air delivery with loss insurance."
    },
    {
      question: "Can I change my color or storage choice later?",
      answer: "Yes. Up until 14 days before your scheduled dispatch window, you can modify your color finish or upgrade your storage capacity directly from your reservation management portal, subject to remaining batch availability."
    }
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-white/5">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-xs font-mono text-teal-400">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>TRANSPARENT RESERVATIONS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
          Pre-Order Policy & FAQ
        </h2>
        <p className="text-slate-400 text-sm">
          Everything you need to know about the ₹999 refundable token deposit, dispatch schedules, and perks.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3.5">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen 
                  ? 'border-teal-500/40 bg-slate-900/80 shadow-lg' 
                  : 'border-white/10 bg-slate-900/40 hover:border-white/20'
              }`}
            >
              <button
                onClick={() => handleToggle(index)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 select-none"
              >
                <span className="text-sm sm:text-base font-bold text-white leading-snug">
                  {faq.question}
                </span>

                <div 
                  className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-teal-500/20 text-teal-300 border-teal-500/30' : 'text-slate-400'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3 animate-in fade-in duration-200">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
