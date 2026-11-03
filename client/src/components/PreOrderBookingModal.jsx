import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Check, 
  Copy, 
  ShieldCheck, 
  Lock, 
  Zap, 
  ArrowRight, 
  Smartphone, 
  QrCode, 
  CreditCard,
  Building2,
  CheckCircle2,
  MapPin,
  Calendar,
  Layers
} from 'lucide-react';

export default function PreOrderBookingModal({
  isOpen,
  onClose,
  phone,
  selectedColor,
  selectedStorageTier
}) {
  const [step, setStep] = useState('form'); // 'form' | 'confirmed'
  const [formData, setFormData] = useState({
    fullName: 'Rahul Deshmukh',
    email: 'rahul.deshmukh@cybercraft.in',
    phone: '+91 98201 54321',
    pinCode: '400001',
    city: 'Mumbai, Maharashtra',
    paymentMethod: 'upi' // 'upi' | 'card' | 'netbanking'
  });

  const [bookingId, setBookingId] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen || !phone || !selectedColor || !selectedStorageTier) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Instant city detection helper
    if (name === 'pinCode') {
      if (value.startsWith('400')) setFormData(prev => ({ ...prev, pinCode: value, city: 'Mumbai, Maharashtra' }));
      else if (value.startsWith('560')) setFormData(prev => ({ ...prev, pinCode: value, city: 'Bengaluru, Karnataka' }));
      else if (value.startsWith('110')) setFormData(prev => ({ ...prev, pinCode: value, city: 'New Delhi, Delhi' }));
      else if (value.startsWith('500')) setFormData(prev => ({ ...prev, pinCode: value, city: 'Hyderabad, Telangana' }));
      else if (value.startsWith('600')) setFormData(prev => ({ ...prev, pinCode: value, city: 'Chennai, Tamil Nadu' }));
      else if (value.length === 6) setFormData(prev => ({ ...prev, pinCode: value, city: 'Priority Delivery Hub' }));
    }
  };

  const handleAutoFill = () => {
    setFormData({
      fullName: 'Ananya Sen',
      email: 'ananya.sen@technova.org',
      phone: '+91 98300 87654',
      pinCode: '560001',
      city: 'Bengaluru, Karnataka',
      paymentMethod: 'upi'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      // Generate realistic booking ID e.g., #PRE-27U-8942 or #PRE-DUO-1042
      const prefix = phone.id.includes('duo') ? 'DUO' : phone.id.includes('s27') ? '27U' : phone.id.includes('18') ? 'IP18' : 'M28';
      const randNum = Math.floor(1000 + Math.random() * 9000);
      const generatedId = `#PRE-${prefix}-${randNum}`;

      setBookingId(generatedId);
      setLoading(false);
      setStep('confirmed');

      // Trigger celebratory confetti
      confetti({
        particleCount: 110,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#2dd4bf', '#34A89A', '#ffffff', '#38bdf8']
      });
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(bookingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setStep('form');
    onClose();
  };

  const balanceDue = selectedStorageTier.price - phone.depositPrice;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-slate-900 border border-white/15 rounded-3xl p-6 sm:p-8 relative shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400 font-bold">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-display">
                {step === 'form' ? 'Pre-Order Slot Reservation' : 'Reservation Secured!'}
              </h3>
              <p className="text-xs text-slate-400">
                {step === 'form' 
                  ? `Pay ₹999 ($50) token deposit to lock your ${phone.name} spot` 
                  : `Your priority reservation for ${phone.name} is confirmed`}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="overflow-y-auto space-y-6 py-5 pr-1">
            {/* Quick Demo Autofill helper */}
            <div className="flex items-center justify-between bg-white/5 px-3.5 py-2 rounded-xl text-xs">
              <span className="text-slate-400">Quick test checkout?</span>
              <button
                type="button"
                onClick={handleAutoFill}
                className="text-teal-400 font-semibold hover:underline font-mono"
              >
                Auto-fill Demo Details
              </button>
            </div>

            {/* Selected Device Badge */}
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl border flex items-center justify-center shadow-inner"
                  style={{ backgroundColor: selectedColor.hex, borderColor: selectedColor.border }}
                >
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{phone.name}</h4>
                  <p className="text-xs text-slate-400">
                    {selectedColor.name} • {selectedStorageTier.capacity}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] font-mono uppercase text-slate-400">Token Deposit</div>
                <div className="text-xl font-bold font-mono text-teal-300">₹999</div>
              </div>
            </div>

            {/* Step 1: Contact Details */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                1. Contact & Priority Dispatch Address
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-[11px] text-slate-400 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Mobile Number (+91)</label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Delivery PIN Code</label>
                  <input
                    type="text"
                    required
                    name="pinCode"
                    maxLength={6}
                    value={formData.pinCode}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">City / Hub</label>
                  <div className="px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-teal-300 font-mono truncate">
                    {formData.city}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method Dummy Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  2. Select Token Deposit Payment Mode
                </h4>
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  RBI & 256-Bit Encrypted
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'upi', label: 'UPI / QR', icon: QrCode, sub: 'GPay, PhonePe, Paytm' },
                  { id: 'card', label: 'Card', icon: CreditCard, sub: 'Visa, MC, RuPay' },
                  { id: 'netbanking', label: 'Net Banking', icon: Building2, sub: 'All Major Banks' },
                ].map((m) => {
                  const isChecked = formData.paymentMethod === m.id;
                  return (
                    <label
                      key={m.id}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col items-start gap-1.5 ${
                        isChecked 
                          ? 'border-teal-400 bg-teal-950/30 ring-1 ring-teal-400' 
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={m.id}
                        checked={isChecked}
                        onChange={handleInputChange}
                        className="hidden"
                      />
                      <div className="flex items-center justify-between w-full">
                        <m.icon className={`w-4 h-4 ${isChecked ? 'text-teal-400' : 'text-slate-400'}`} />
                        <span className={`w-2.5 h-2.5 rounded-full border ${isChecked ? 'bg-teal-400 border-teal-400' : 'border-slate-500'}`} />
                      </div>
                      <div className="text-xs font-bold text-white">{m.label}</div>
                      <div className="text-[9px] text-slate-400 leading-tight">{m.sub}</div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Bottom Form Actions */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3.5 rounded-xl font-bold font-sans text-sm bg-gradient-to-r from-teal-400 to-teal-500 text-slate-950 shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Allocating Priority Spot...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-current" />
                    <span>Pay ₹999 & Confirm Pre-Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Step 3: Success State with Simulated Reservation Ticket */
          <div className="py-6 space-y-6 overflow-y-auto">
            {/* Header Icon */}
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center mx-auto text-teal-300">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-extrabold text-white font-display">
                Reservation Confirmed!
              </h4>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Thank you, <strong className="text-white">{formData.fullName}</strong>. Your pre-order ticket has been confirmed and registered to the global manufacturing queue.
              </p>
            </div>

            {/* Simulated Booking Ticket */}
            <div className="bg-slate-800/90 rounded-2xl p-5 border border-white/15 space-y-4">
              {/* Ticket Top Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-400">Reservation Ticket ID</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-base font-extrabold font-mono text-teal-300 tracking-wider">
                      {bookingId}
                    </span>
                    <button
                      onClick={handleCopy}
                      className="p-1 rounded-md bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
                      title="Copy"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] font-mono uppercase text-slate-400">Queue Status</div>
                  <div className="text-base font-bold font-mono text-emerald-400">
                    Priority Batch 1
                  </div>
                </div>
              </div>

              {/* Ticket Details Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Flagship Device</span>
                  <span className="font-semibold text-white">
                    {phone.name} ({selectedColor.name})
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Storage Tier</span>
                  <span className="font-semibold text-white">
                    {selectedStorageTier.capacity}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Estimated Dispatch Window</span>
                  <span className="font-semibold text-teal-300">
                    {phone.releaseWindow} ({phone.deliveryMonth})
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Deposit Paid Today</span>
                  <span className="font-mono font-bold text-white">
                    ₹999 (100% Refundable)
                  </span>
                </div>
              </div>

              {/* Free Perk Badge */}
              <div className="p-2.5 rounded-xl bg-teal-950/40 border border-teal-500/20 text-xs text-slate-300 flex items-center justify-between">
                <span>Early Bird Perk: <strong>{phone.freePerk}</strong></span>
                <span className="text-teal-400 font-mono text-[10px] uppercase">Unlocked</span>
              </div>

              {/* Destination info */}
              <div className="pt-3 border-t border-dashed border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-teal-400" />
                  Destination: {formData.city} (PIN {formData.pinCode})
                </span>
                <span className="text-slate-400">Balance at dispatch: ₹{balanceDue.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Close action */}
            <div className="pt-2">
              <button
                onClick={handleClose}
                className="w-full py-3.5 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                Close & Return to Showcase
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

