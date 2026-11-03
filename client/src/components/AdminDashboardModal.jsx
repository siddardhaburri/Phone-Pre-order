import React, { useState, useEffect } from 'react';
import { 
  X, 
  BarChart3, 
  Users, 
  DollarSign, 
  Layers, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  Truck, 
  AlertCircle
} from 'lucide-react';
import { fetchAdminStats, updateOrderStatus } from '../utils/api';

export default function AdminDashboardModal({ isOpen, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchAdminStats();
      if (res && res.success) {
        setData(res);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load admin orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      await loadData();
    } catch (err) {
      console.error(err);
      alert('Error updating status');
    } finally {
      setUpdatingId(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="glass-panel w-full max-w-5xl rounded-3xl border border-white/15 p-6 sm:p-8 relative shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neon-teal/15 border border-neon-teal/30 flex items-center justify-center text-neon-cyan">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-display">Pre-Order Operations Command</h3>
              <p className="text-xs text-slate-400">Manage manufacturing allocations, queue statuses, and pre-order metrics</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto space-y-6 py-5 pr-1">
          {/* Key Metrics Grid */}
          {data?.stats && (
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="glass-panel p-4 rounded-2xl border border-white/10 bg-slate-900/40">
                <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1.5 mb-1">
                  <Users className="w-3.5 h-3.5 text-neon-teal" />
                  Total Pre-Orders
                </div>
                <div className="text-2xl font-bold font-mono text-white">
                  {data.stats.totalOrders}
                </div>
              </div>

              <div className="glass-panel p-4 rounded-2xl border border-white/10 bg-slate-900/40">
                <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1.5 mb-1">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  Deposits Collected
                </div>
                <div className="text-2xl font-bold font-mono text-emerald-400">
                  ${data.stats.totalRevenue.toLocaleString()}
                </div>
              </div>

              <div className="glass-panel p-4 rounded-2xl border border-white/10 bg-slate-900/40">
                <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1.5 mb-1">
                  <Layers className="w-3.5 h-3.5 text-neon-cyan" />
                  Total Pipeline Value
                </div>
                <div className="text-2xl font-bold font-mono text-neon-cyan">
                  ${data.stats.totalFullPriceValue.toLocaleString()}
                </div>
              </div>

              <div className="glass-panel p-4 rounded-2xl border border-white/10 bg-slate-900/40">
                <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  Batch 1 Allocations
                </div>
                <div className="text-2xl font-bold font-mono text-white">
                  {data.stats.batch1Count} Units
                </div>
              </div>
            </div>
          )}

          {/* Orders Table */}
          <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300">
                Recent Pre-Order Reservations
              </h4>
              <span className="text-xs font-mono text-slate-400">
                {data?.data?.length || 0} Records
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-white/5 font-mono text-[11px] text-slate-400 uppercase">
                  <tr>
                    <th className="p-3.5">Order ID</th>
                    <th className="p-3.5">Customer</th>
                    <th className="p-3.5">Device & Finish</th>
                    <th className="p-3.5">Queue Spot</th>
                    <th className="p-3.5">Paid / Total</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Fulfillment Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {data?.data?.map((ord) => (
                    <tr key={ord.orderId} className="hover:bg-white/5 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-neon-cyan">
                        {ord.orderId}
                      </td>
                      <td className="p-3.5">
                        <div className="font-semibold text-white">{ord.customer.name}</div>
                        <div className="text-[11px] text-slate-400">{ord.customer.email}</div>
                      </td>
                      <td className="p-3.5">
                        <div className="text-slate-200">{ord.item.phoneName}</div>
                        <div className="text-[11px] text-slate-400">
                          {ord.item.colorName} • {ord.item.storage}
                        </div>
                      </td>
                      <td className="p-3.5 font-mono text-slate-300">
                        #{ord.queueNumber}
                      </td>
                      <td className="p-3.5 font-mono">
                        <div className="text-emerald-400 font-semibold">${ord.pricing.amountPaid}</div>
                        <div className="text-[10px] text-slate-500">of ${ord.pricing.storagePrice}</div>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase bg-teal-500/20 text-neon-cyan border border-teal-500/30">
                          {ord.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleStatusChange(ord.orderId, 'In Production')}
                            disabled={updatingId === ord.orderId}
                            className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-mono text-slate-300 hover:text-white border border-white/10"
                          >
                            Set In Production
                          </button>
                          <button
                            onClick={() => handleStatusChange(ord.orderId, 'Shipped')}
                            disabled={updatingId === ord.orderId}
                            className="px-2 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-[10px] font-mono text-emerald-400 border border-emerald-500/30"
                          >
                            Mark Shipped
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

