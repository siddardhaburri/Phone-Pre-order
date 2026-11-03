import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Sparkles, 
  Copy, 
  Check, 
  ArrowRight, 
  QrCode, 
  Truck, 
  Calendar,
  Layers,
  X
} from 'lucide-react';

export default function OrderConfirmationModal({
  isOpen,
  onClose,
  order,
  onOpenTracker
}) {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (isOpen && order) {
      // Trigger festive confetti explosion
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00f5d4', '#34A89A', '#ffffff', '#a855f7']
      });
    }
  }, [isOpen, order]);

  if (!isOpen || !order) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(order.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="glass-panel w-full max-w-2xl rounded-3xl border border-neon-cyan/40 p-6 sm:p-8 relative shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-neon-teal/20 to-transparent pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="text-center space-y-2 mb-6 z-10">
          <div className="w-16 h-16 rounded-3xl bg-neon-teal/20 border border-neon-teal/40 flex items-center justify-center mx-auto text-neon-cyan shadow-neon-cyan">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
            Reservation Confirmed!
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            Your spot in <strong className="text-neon-cyan">{order.batchName}</strong> has been secured and registered to the global manufacturing queue.
          </p>
        </div>

        {/* Futuristic Holographic Pass Ticket */}
        <div className="glass-panel p-6 rounded-3xl border border-white/15 bg-slate-900/80 relative overflow-hidden space-y-5 my-auto">
          {/* Top Ticket Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs">
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-400">Reservation Reference</div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-lg font-extrabold font-mono text-neon-cyan tracking-wider">
                  {order.orderId}
                </span>
                <button
                  onClick={handleCopyId}
                  className="p-1 rounded-md bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  title="Copy Order ID"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] font-mono uppercase text-slate-400">Queue Spot</div>
              <div className="text-lg font-bold font-mono text-white">
                #{order.queueNumber}
              </div>
            </div>
          </div>

          {/* Ticket Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Device</span>
              <span className="font-semibold text-white">{order.item.phoneName}</span>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Chassis & Storage</span>
              <span className="font-semibold text-slate-200">
                {order.item.colorName} • {order.item.storage}
              </span>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Est. Delivery</span>
              <span className="font-semibold text-emerald-400">{order.tracking.estimatedDelivery}</span>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Amount Paid</span>
              <span className="font-mono font-bold text-white">${order.pricing.amountPaid}</span>
            </div>
          </div>

          {/* Trade-In Badge if applied */}
          {order.tradeIn?.applied && (
            <div className="px-3 py-2 rounded-xl bg-teal-950/40 border border-teal-500/30 flex items-center justify-between text-xs">
              <span className="text-slate-300">
                Trade-In Credit Applied: <strong className="text-white">{order.tradeIn.deviceName}</strong>
              </span>
              <span className="font-mono text-emerald-400 font-bold">-${order.tradeIn.credit}</span>
            </div>
          )}

          {/* Bottom Barcode Mockup */}
          <div className="pt-4 border-t border-dashed border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Truck className="w-4 h-4 text-neon-teal" />
              <span>Priority Insured Air Carrier</span>
            </div>
            
            {/* Barcode lines */}
            <div className="flex items-center gap-[2px] opacity-60">
              <span className="w-[3px] h-6 bg-white" />
              <span className="w-[1px] h-6 bg-white" />
              <span className="w-[4px] h-6 bg-white" />
              <span className="w-[2px] h-6 bg-white" />
              <span className="w-[1px] h-6 bg-white" />
              <span className="w-[3px] h-6 bg-white" />
              <span className="w-[2px] h-6 bg-white" />
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-end gap-3 z-10">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
          >
            Done
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenTracker(order.orderId);
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold uppercase font-mono bg-gradient-to-r from-neon-teal to-neon-cyan text-slate-950 shadow-neon-teal hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Track Pre-Order Status</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

