import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Truck, 
  Zap, 
  Sparkles, 
  ArrowRight, 
  Check, 
  AlertCircle,
  Smartphone
} from 'lucide-react';
import { submitPreOrder } from '../utils/api';

export default function PreOrderModal({
  isOpen,
  onClose,
  phone,
  selectedColor,
  selectedStorage,
  selectedCarrier,
  selectedPaymentType,
  tradeInCredit = 0,
  tradeInDevice = null,
  onSuccess
}) {
  const [formData, setFormData] = useState({
    name: 'Jordan Hayes',
    email: 'jordan.hayes@quantummail.io',
    phone: '+1 (555) 892-4112',
    street: '450 Mission Street, Suite 1800',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
    country: 'United States',
    paymentMethod: 'card',
    cardNumber: '4242 •••• •••• 9821',
    cardExpiry: '08/28',
    cardCvc: '883'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen || !phone) return null;

  const storageOption = phone.storageTiers.find(s => s.id === selectedStorage) || phone.storageTiers[0];
  const carrierOption = phone.carriers.find(c => c.id === selectedCarrier) || phone.carriers[0];
  
  const baseDevicePrice = storageOption.price;
  const priceAfterTradeIn = Math.max(0, baseDevicePrice - tradeInCredit);
  const discount5Percent = Math.round(priceAfterTradeIn * 0.05);
  const fullPaymentTotal = priceAfterTradeIn - discount5Percent;

  const amountDueToday = selectedPaymentType === 'deposit' 
    ? phone.depositPrice 
    : fullPaymentTotal;

  const balanceDueLater = selectedPaymentType === 'deposit' 
    ? priceAfterTradeIn - phone.depositPrice 
    : 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAutoFill = () => {
    setFormData({
      name: 'Dr. Elena Rostova',
      email: 'elena.rostova@aether-astro.org',
      phone: '+1 (555) 749-0192',
      street: '100 Silicon Vista Boulevard',
      city: 'Austin',
      state: 'TX',
      zip: '78701',
      country: 'United States',
      paymentMethod: 'card',
      cardNumber: '4000 •••• •••• 4421',
      cardExpiry: '12/29',
      cardCvc: '912'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          country: formData.country
        }
      },
      item: {
        phoneId: phone.id,
        phoneName: phone.name,
        colorName: selectedColor.name,
        colorHex: selectedColor.hex,
        storage: storageOption.capacity,
        carrier: carrierOption.name,
        selectedPerk: "Complimentary AeroBuds Pro 2 ($199 Value)"
      },
      pricing: {
        basePrice: phone.basePrice,
        storagePrice: storageOption.price,
        tradeInCredit: tradeInCredit,
        subtotal: priceAfterTradeIn,
        paymentType: selectedPaymentType,
        amountPaid: amountDueToday,
        balanceDue: balanceDueLater,
        discountApplied: selectedPaymentType === 'full' ? discount5Percent : 0
      },
      tradeIn: tradeInCredit > 0 ? {
        applied: true,
        deviceName: tradeInDevice?.modelName || 'Trade-In Device',
        condition: tradeInDevice?.condition || 'Good',
        credit: tradeInCredit
      } : { applied: false, credit: 0 }
    };

    try {
      const createdOrder = await submitPreOrder(payload);
      onSuccess(createdOrder);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error processing reservation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="glass-panel w-full max-w-3xl rounded-3xl border border-white/15 p-6 sm:p-8 relative shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-neon-teal to-neon-cyan flex items-center justify-center text-slate-950 font-bold shadow-neon-teal">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-display">Secure Pre-Order Reservation</h3>
              <p className="text-xs text-slate-400">Lock in your manufacturing queue position for {phone.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAutoFill}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-neon-teal transition-colors"
            >
              Fill Demo Data
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto space-y-6 py-5 pr-1">
          {error && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Reservation Summary Card */}
          <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/60">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-xl border flex items-center justify-center shrink-0"
                style={{ backgroundColor: selectedColor.hex, borderColor: selectedColor.border }}
              >
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{phone.name}</h4>
                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <span>{selectedColor.name}</span>
                  <span>•</span>
                  <span>{storageOption.capacity}</span>
                  <span>•</span>
                  <span className="text-neon-teal">{carrierOption.name.split('(')[0]}</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs font-mono text-slate-400">
                {selectedPaymentType === 'deposit' ? 'Refundable Deposit' : 'Paid in Full'}
              </div>
              <div className="text-2xl font-bold font-mono text-white">
                ${amountDueToday.toLocaleString()}
              </div>
              {selectedPaymentType === 'deposit' && (
                <div className="text-[11px] font-mono text-slate-400">
                  Balance due upon dispatch: ${balanceDueLater.toLocaleString()}
                </div>
              )}
            </div>
          </div>

          {/* Customer Details */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              1. Customer Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-neon-teal"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Email Address (for order tracking)</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-neon-teal"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] text-slate-400 block mb-1">Phone Number (SMS queue updates)</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-neon-teal"
                />
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              2. Priority Delivery Destination
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-3">
                <label className="text-[11px] text-slate-400 block mb-1">Street Address</label>
                <input
                  type="text"
                  name="street"
                  required
                  value={formData.street}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-neon-teal"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-neon-teal"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">State / Province</label>
                <input
                  type="text"
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-neon-teal"
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Postal Code</label>
                <input
                  type="text"
                  name="zip"
                  required
                  value={formData.zip}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-neon-teal"
                />
              </div>
            </div>
          </div>

          {/* Simulated Payment */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                3. Simulated Payment Information
              </h4>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                256-Bit SSL Encrypted
              </span>
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-3 bg-slate-900/40">
              <div className="flex items-center gap-3 mb-2">
                <div className="px-3 py-1.5 rounded-lg bg-teal-500/20 text-neon-cyan border border-teal-500/30 text-xs font-mono font-bold flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5" />
                  Test Card
                </div>
                <span className="text-xs text-slate-400">Sandbox environment active (no actual charges applied)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-[10px] text-slate-400 block mb-1">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-neon-teal"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Exp / CVC</label>
                  <input
                    type="text"
                    value={`${formData.cardExpiry}  |  ${formData.cardCvc}`}
                    readOnly
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 rounded-2xl font-bold font-sans text-sm bg-gradient-to-r from-neon-teal via-teal-300 to-neon-cyan text-slate-950 shadow-neon-teal hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Reserving Spot in Batch 1...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Authorize & Reserve (${amountDueToday})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

