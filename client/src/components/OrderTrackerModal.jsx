import React, { useState, useEffect } from 'react';
import { 
  X, 
  Search, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Smartphone, 
  AlertCircle,
  Package,
  Layers
} from 'lucide-react';
import { trackOrder } from '../utils/api';

export default function OrderTrackerModal({
  isOpen,
  onClose,
  initialOrderId = ''
}) {
  const [query, setQuery] = useState(initialOrderId);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialOrderId) {
      setQuery(initialOrderId);
      handleSearch(initialOrderId);
    }
  }, [initialOrderId]);

  const handleSearch = async (targetQuery = query) => {
    if (!targetQuery?.trim()) return;
    setLoading(true);
    setError(null);
    setOrder(null);

    try {
      const results = await trackOrder(targetQuery.trim());
      if (results && results.length > 0) {
        setOrder(results[0]);
      } else {
        setError('No reservation found matching this reference.');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'No pre-order found for this reference or email.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="glass-panel w-full max-w-2xl rounded-3xl border border-white/15 p-6 sm:p-8 relative shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neon-teal/15 border border-neon-teal/30 flex items-center justify-center text-neon-cyan">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-display">Pre-Order Reservation Status</h3>
              <p className="text-xs text-slate-400">Track your spot in the manufacturing queue and delivery schedule</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="py-4 shrink-0">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }} 
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Pre-Order ID (e.g. AETH-9102-X) or Email"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-neon-teal transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-neon-teal hover:bg-neon-cyan text-slate-950 font-bold text-xs font-mono uppercase transition-colors shrink-0 disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Track'}
            </button>
          </form>

          {/* Quick Demo Reference Suggestions */}
          <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-400">
            <span>Try demo IDs:</span>
            <button
              type="button"
              onClick={() => {
                setQuery('AETH-9102-X');
                handleSearch('AETH-9102-X');
              }}
              className="text-neon-cyan underline hover:text-white"
            >
              AETH-9102-X
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                setQuery('AETH-8841-K');
                handleSearch('AETH-8841-K');
              }}
              className="text-neon-cyan underline hover:text-white"
            >
              AETH-8841-K
            </button>
          </div>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto space-y-6 py-2 pr-1">
          {error && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {order && (
            <div className="space-y-6">
              {/* Order Status Badge & Queue Card */}
              <div className="glass-panel p-5 rounded-2xl border border-white/10 bg-slate-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-bold font-mono text-neon-cyan">{order.orderId}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold uppercase">
                      {order.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">
                    Reserved by <strong className="text-white">{order.customer.name}</strong> • {order.customer.email}
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-[10px] font-mono uppercase text-slate-400">Queue Position</div>
                  <div className="text-xl font-bold font-mono text-white">
                    #{order.queueNumber} <span className="text-xs font-normal text-slate-400">in {order.batchName}</span>
                  </div>
                </div>
              </div>

              {/* Manufacturing & Delivery Timeline */}
              <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-neon-teal" />
                  Manufacturing & Dispatch Timeline
                </h4>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-white/10">
                  {order.tracking?.timeline?.map((step, idx) => (
                    <div key={idx} className="relative flex items-start justify-between text-xs">
                      {/* Timeline Dot */}
                      <span 
                        className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          step.done 
                            ? 'bg-neon-teal border-neon-cyan shadow-neon-teal' 
                            : 'bg-slate-900 border-slate-700'
                        }`}
                      >
                        {step.done && <CheckCircle2 className="w-2.5 h-2.5 text-slate-950" />}
                      </span>

                      <div>
                        <div className={`font-semibold ${step.done ? 'text-white' : 'text-slate-500'}`}>
                          {step.title}
                        </div>
                        <div className="text-[11px] text-slate-400">{step.date}</div>
                      </div>

                      <span className={`text-[10px] font-mono uppercase ${step.done ? 'text-emerald-400' : 'text-slate-600'}`}>
                        {step.done ? 'Completed' : 'Upcoming'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hardware & Shipping Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Device Details */}
                <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-2">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-neon-teal" />
                    Device Reserved
                  </span>
                  <div className="font-bold text-white text-sm">{order.item.phoneName}</div>
                  <div className="text-slate-300">Finish: {order.item.colorName}</div>
                  <div className="text-slate-300">Storage: {order.item.storage}</div>
                  <div className="text-slate-300">Carrier: {order.item.carrier}</div>
                  <div className="text-emerald-400 pt-1 font-mono">
                    Perk: {order.item.selectedPerk}
                  </div>
                </div>

                {/* Shipping & Financials */}
                <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-2">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-neon-teal" />
                    Shipping Destination
                  </span>
                  <div className="text-white">
                    {order.customer.address.street}, {order.customer.address.city}, {order.customer.address.state} {order.customer.address.zip}
                  </div>
                  <div className="pt-2 border-t border-white/10 space-y-1 font-mono">
                    <div className="flex justify-between text-slate-400">
                      <span>Amount Paid Today:</span>
                      <span className="text-white">${order.pricing.amountPaid}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Balance at Dispatch:</span>
                      <span className="text-neon-cyan">${order.pricing.balanceDue}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

