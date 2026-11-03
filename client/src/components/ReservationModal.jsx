import React, { useState } from 'react';
import { X, Check, Copy, AlertCircle, ArrowRight, ShieldCheck, QrCode, CreditCard, Building2, CheckCircle2 } from 'lucide-react';

export default function ReservationModal({
  isOpen,
  onClose,
  device,
  selectedColor,
  selectedStorageTier
}) {
  const [step, setStep] = useState(1); // 1 = Details, 2 = Payment, 3 = Confirmation
  const [formData, setFormData] = useState({
    fullName: 'Arjun Mehra',
    email: 'arjun.mehra@example.com',
    phone: '+91 98100 12345',
    pinCode: '560001',
    paymentMethod: 'upi'
  });

  const [bookingId, setBookingId] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !device || !selectedColor || !selectedStorageTier) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.pinCode.trim()) {
      setError('Please fill in all required customer details.');
      return;
    }
    if (formData.pinCode.trim().length !== 6) {
      setError('PIN Code must be a 6-digit number.');
      return;
    }
    setStep(2);
  };

  const handleStep2Submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call backend API to record demo reservation
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            pinCode: formData.pinCode,
            city: 'India'
          },
          deviceId: device.id,
          colorName: selectedColor.name,
          storageId: selectedStorageTier.id,
          paymentMethod: `${formData.paymentMethod.toUpperCase()} (Demo Simulation)`
        })
      });

      const data = await res.json();
      if (data.success && data.data?.bookingId) {
        setBookingId(data.data.bookingId);
      } else {
        // Fallback demo ID
        const prefix = device.id.includes('duo') ? 'DUO' : device.id.includes('s27') ? '27U' : device.id.includes('18') ? 'IP18' : 'M28';
        setBookingId(`#NXG-${prefix}-${Math.floor(1000 + Math.random() * 9000)}`);
      }

      setStep(3);
    } catch (err) {
      console.warn('Backend reservation fallback:', err);
      const prefix = device.id.includes('duo') ? 'DUO' : device.id.includes('s27') ? '27U' : device.id.includes('18') ? 'IP18' : 'M28';
      setBookingId(`#NXG-${prefix}-${Math.floor(1000 + Math.random() * 9000)}`);
      setStep(3);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(bookingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-lg bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 relative shadow-xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-gray-200 shrink-0">
          <div>
            <div className="text-[11px] font-semibold text-teal-600 uppercase tracking-wider">
              {step === 3 ? 'Reservation Confirmed' : `Step ${step} of 2 — Token Reservation`}
            </div>
            <h3 className="text-xl font-bold text-slate-950 mt-0.5">
              {step === 1 && 'Customer Details'}
              {step === 2 && 'Payment Method'}
              {step === 3 && 'Reservation Receipt'}
            </h3>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-gray-100 text-slate-400 hover:text-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Notice Banner */}
        <div className="mt-4 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-800 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
          <span>Demo Reservation: This is a simulated checkout. No real financial transaction will occur.</span>
        </div>

        {/* Selected Phone Summary Strip */}
        <div className="my-4 p-3 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between text-xs">
          <div>
            <span className="font-semibold text-slate-900">{device.name}</span>
            <span className="text-slate-500 block">{selectedColor.name} • {selectedStorageTier.capacity}</span>
          </div>
          <div className="text-right">
            <span className="text-slate-500 block text-[10px] uppercase font-mono">Token Due</span>
            <span className="font-mono font-bold text-slate-900">₹999</span>
          </div>
        </div>

        {/* STEP 1: Customer Details */}
        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="space-y-4 overflow-y-auto pr-1">
            {error && (
              <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                {error}
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name</label>
              <input
                type="text"
                required
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-slate-900 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address</label>
              <input
                type="email"
                required
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-slate-900 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-slate-900 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Delivery PIN Code</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-slate-900 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 font-mono"
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-200">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full text-xs font-semibold bg-slate-950 hover:bg-slate-800 text-white transition-all flex items-center gap-1.5"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Payment Method Selector */}
        {step === 2 && (
          <form onSubmit={handleStep2Submit} className="space-y-4 overflow-y-auto pr-1">
            <p className="text-xs text-slate-500">
              Select a simulated payment method for the ₹999 refundable token deposit:
            </p>

            <div className="space-y-2.5">
              {[
                { id: 'upi', label: 'UPI / QR Code', sub: 'Instant Demo QR or UPI ID', icon: QrCode },
                { id: 'card', label: 'Credit / Debit Card', sub: 'Visa, Mastercard, RuPay', icon: CreditCard },
                { id: 'netbanking', label: 'Net Banking', sub: 'All major Indian banks', icon: Building2 },
              ].map((m) => {
                const isSelected = formData.paymentMethod === m.id;
                return (
                  <label
                    key={m.id}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-teal-600 bg-teal-50/30 ring-1 ring-teal-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <m.icon className={`w-4 h-4 ${isSelected ? 'text-teal-600' : 'text-slate-500'}`} />
                      <div>
                        <div className="text-xs font-bold text-slate-900">{m.label}</div>
                        <div className="text-[11px] text-slate-500">{m.sub}</div>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={m.id}
                      checked={isSelected}
                      onChange={handleInputChange}
                      className="text-teal-600 focus:ring-teal-600"
                    />
                  </label>
                );
              })}
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-gray-200">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Back
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-full text-xs font-semibold bg-slate-950 hover:bg-slate-800 text-white transition-all flex items-center gap-1.5"
              >
                {loading ? 'Processing Demo...' : 'Pay ₹999 & Confirm'}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Confirmation State */}
        {step === 3 && (
          <div className="space-y-5 overflow-y-auto py-2 pr-1">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-full bg-teal-50 border border-teal-200 text-teal-600 flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-950">Reservation Confirmed</h4>
              <p className="text-xs text-slate-500">
                Your reservation for <strong className="text-slate-900">{device.name}</strong> has been confirmed.
              </p>
            </div>

            {/* Receipt Card */}
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 space-y-3 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <div>
                  <span className="text-[10px] uppercase text-slate-500 font-mono">Unique Booking ID</span>
                  <div className="flex items-center gap-2 mt-0.5 font-mono font-bold text-slate-900 text-sm">
                    <span>{bookingId}</span>
                    <button
                      onClick={handleCopyId}
                      className="p-1 rounded hover:bg-gray-200 text-slate-500"
                      title="Copy"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase text-slate-500 font-mono">Status</span>
                  <div className="font-semibold text-teal-700">Priority Batch 1</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-mono">Smartphone</span>
                  <span className="font-semibold text-slate-900">{device.name}</span>
                </div>

                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-mono">Configuration</span>
                  <span className="font-semibold text-slate-900">{selectedColor.name} • {selectedStorageTier.capacity}</span>
                </div>

                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-mono">Deposit Paid</span>
                  <span className="font-mono font-bold text-slate-900">₹999 (100% Refundable)</span>
                </div>

                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-mono">Estimated Delivery</span>
                  <span className="font-semibold text-slate-900">{device.estimatedDelivery}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-200 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Perk: {device.launchBonus}</span>
                <span>PIN: {formData.pinCode}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleClose}
                className="w-full py-3 rounded-full text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-colors"
              >
                Close & Return to Collection
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
