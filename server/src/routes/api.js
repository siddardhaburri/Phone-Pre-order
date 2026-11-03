import express from 'express';
import { PHONES } from '../data/phones.js';
import { TRADE_IN_CATALOG, calculateTradeInValue } from '../data/tradeInDevices.js';
import { ordersStore } from '../db/ordersStore.js';

const router = express.Router();

// 1. Get all phones
router.get('/phones', (req, res) => {
  const { brand, search } = req.query;
  let list = [...PHONES];

  if (brand && brand !== 'all') {
    list = list.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    list = list.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.tagline.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q)
    );
  }

  res.json({ success: true, count: list.length, data: list });
});

// 2. Get specific phone by id
router.get('/phones/:id', (req, res) => {
  const phone = PHONES.find(p => p.id === req.params.id);
  if (!phone) {
    return res.status(404).json({ success: false, message: 'Phone not found' });
  }
  res.json({ success: true, data: phone });
});

// 3. Trade-in catalog
router.get('/trade-in/catalog', (req, res) => {
  res.json({ success: true, data: TRADE_IN_CATALOG });
});

// 4. Calculate trade-in quote
router.post('/trade-in/quote', (req, res) => {
  const { modelId, condition } = req.body;
  if (!modelId || !condition) {
    return res.status(400).json({ success: false, message: 'modelId and condition are required' });
  }

  const quote = calculateTradeInValue(modelId, condition);
  if (!quote) {
    return res.status(404).json({ success: false, message: 'Device model not found in trade-in catalog' });
  }

  res.json({ success: true, data: quote });
});

// 5. Submit Pre-Order
router.post('/preorders', (req, res) => {
  const { customer, item, pricing, tradeIn } = req.body;

  if (!customer?.email || !customer?.name || !item?.phoneId) {
    return res.status(400).json({ 
      success: false, 
      message: 'Missing required reservation fields (customer details, phone selection)' 
    });
  }

  const phone = PHONES.find(p => p.id === item.phoneId);
  const createdOrder = ordersStore.create({
    customer,
    item: {
      ...item,
      phoneName: phone ? phone.name : item.phoneName || 'Aether Phone'
    },
    pricing: {
      ...pricing,
      currency: 'USD'
    },
    tradeIn: tradeIn || { applied: false, credit: 0 },
    batchName: phone ? phone.batchName : 'Global Batch 1',
    estimatedDelivery: phone ? phone.releaseDate : 'Dec 20, 2026'
  });

  res.status(201).json({
    success: true,
    message: 'Pre-order reservation confirmed successfully!',
    data: createdOrder
  });
});

// 6. Track Pre-Order by orderId or email
router.get('/preorders/:query', (req, res) => {
  const query = req.params.query;
  const results = ordersStore.findByEmailOrId(query);

  if (!results || results.length === 0) {
    return res.status(404).json({ 
      success: false, 
      message: `No pre-order found for reference or email "${query}". Please check your order ID (e.g. AETH-9102-X).` 
    });
  }

  res.json({ success: true, count: results.length, data: results });
});

// 7. Admin Dashboard: Get all orders & stats
router.get('/admin/orders', (req, res) => {
  const orders = ordersStore.getAll();
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((acc, o) => acc + (o.pricing?.amountPaid || 0), 0);
  const totalFullPriceValue = orders.reduce((acc, o) => acc + (o.pricing?.storagePrice || 0), 0);
  const batch1Count = orders.filter(o => o.batchName.includes('Batch 1')).length;

  const modelBreakdown = orders.reduce((acc, o) => {
    const key = o.item?.phoneName || 'Other';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  res.json({
    success: true,
    stats: {
      totalOrders,
      totalRevenue,
      totalFullPriceValue,
      batch1Count,
      modelBreakdown
    },
    data: orders
  });
});

// 8. Admin Dashboard: Update order status
router.patch('/admin/orders/:orderId', (req, res) => {
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ success: false, message: 'Status is required' });
  }

  const updated = ordersStore.updateStatus(req.params.orderId, status);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  res.json({ success: true, data: updated });
});

export default router;

