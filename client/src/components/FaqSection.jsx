import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Is the ₹999 deposit fully refundable if I change my mind?",
      answer: "Yes, 100% unconditionally refundable. If you choose not to complete your order prior to dispatch, you can request an instant cancellation directly from your confirmation email or portal. Your ₹999 token deposit will be credited back to your original payment method within 24 to 48 business hours with zero cancellation fees."
    },
    {
      question: "When and how do I pay the remaining balance?",
      answer: "You only pay the remaining balance when your chosen smartphone has cleared final factory quality testing and is ready for courier dispatch (approximately 3 to 5 business days before the official launch). You will receive an encrypted checkout link with options for No-Cost EMI, Credit/Debit Card, UPI, and Net Banking."
    },
    {
      question: "What launch bonuses are included with my reservation?",
      answer: "All priority reservation holders receive the official Early-Bird Launch Pack for their specific device: complimentary flagship wireless earbuds (such as AirPods Pro for iPhone Duo, Galaxy Buds3 Pro for Galaxy S27 Ultra, or Moto Buds+ for Signature 28), 1 year of comprehensive screen protection, and priority insured air delivery."
    },
    {
      question: "Can I change my color or storage choice later?",
      answer: "Yes. You can modify your color finish or upgrade your storage tier up to 14 days prior to your estimated dispatch window, subject to inventory availability in the priority batch."
    }
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-gray-200">
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-14 space-y-3">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-600 text-sm sm:text-base">
          Clear, straightforward details regarding the ₹999 token deposit, delivery schedules, and guarantees.
        </p>
      </div>

      {/* Clean Accordion */}
      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 bg-white overflow-hidden transition-all duration-150"
            >
              <button
                onClick={() => handleToggle(index)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 select-none hover:bg-gray-50/50"
              >
                <span className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                  {faq.question}
                </span>

                <div 
                  className={`w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-gray-100 text-slate-900' : 'text-slate-500'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-gray-100 pt-3">
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

