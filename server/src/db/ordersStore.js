import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'orders.json');

// Initialize with some realistic starter pre-orders for demo/admin tracking
const INITIAL_ORDERS = [
  {
    orderId: "AETH-9102-X",
    createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    status: "Deposit Confirmed",
    statusCode: "deposit_confirmed",
    queueNumber: 142,
    batchName: "Global Batch 1",
    customer: {
      name: "Alex Vance",
      email: "alex.vance@quantum.io",
      phone: "+1 (555) 382-9014",
      address: {
        street: "742 Evergreen Terrace",
        city: "San Francisco",
        state: "CA",
        zip: "94105",
        country: "United States"
      }
    },
    item: {
      phoneId: "aether-nova-titan",
      phoneName: "Aether Nova Titan 10 Ultra",
      colorName: "Cosmic Neon Teal",
      colorHex: "#0d3935",
      storage: "512GB",
      carrier: "Unlocked (Worldwide 5G eSIM)",
      selectedPerk: "Complimentary AeroBuds Pro 2 ($199 Value)"
    },
    pricing: {
      basePrice: 1199,
      storagePrice: 1349,
      tradeInCredit: 450,
      subtotal: 899,
      paymentType: "deposit",
      amountPaid: 99,
      balanceDue: 800,
      currency: "USD"
    },
    tradeIn: {
      applied: true,
      deviceName: "iPhone 15 Pro",
      condition: "Good",
      credit: 450
    },
    tracking: {
      estimatedDelivery: "Dec 18, 2026",
      carrierName: "FedEx Zero-G Priority",
      timeline: [
        { title: "Pre-Order Placed", date: "Nov 01, 2026", done: true },
        { title: "Priority Queue Allocated", date: "Nov 01, 2026", done: true },
        { title: "Chassis CNC Milling", date: "Nov 15, 2026", done: false },
        { title: "Zero-G Assembly & Testing", date: "Nov 30, 2026", done: false },
        { title: "Dispatch & Overnight Flight", date: "Dec 16, 2026", done: false }
      ]
    }
  },
  {
    orderId: "AETH-8841-K",
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    status: "Reserved",
    statusCode: "reserved",
    queueNumber: 289,
    batchName: "Global Batch 1",
    customer: {
      name: "Dr. Maya Lin",
      email: "maya.lin@cyberlabs.tech",
      phone: "+1 (555) 791-4402",
      address: {
        street: "1200 Horizon Way",
        city: "Seattle",
        state: "WA",
        zip: "98101",
        country: "United States"
      }
    },
    item: {
      phoneId: "aether-nova-titan",
      phoneName: "Aether Nova Titan 10 Ultra",
      colorName: "Titanium Violet",
      colorHex: "#2e1065",
      storage: "1TB",
      carrier: "Verizon 5G Ultra Wideband",
      selectedPerk: "65W Magnetic Zero-G Floating Dock ($79 Value)"
    },
    pricing: {
      basePrice: 1199,
      storagePrice: 1599,
      tradeInCredit: 0,
      subtotal: 1599,
      paymentType: "full",
      amountPaid: 1519.05, // 5% full prepayment discount
      balanceDue: 0,
      currency: "USD"
    },
    tradeIn: {
      applied: false,
      deviceName: null,
      credit: 0
    },
    tracking: {
      estimatedDelivery: "Dec 17, 2026",
      carrierName: "UPS Express Quantum",
      timeline: [
        { title: "Pre-Order Placed", date: "Nov 02, 2026", done: true },
        { title: "Priority Queue Allocated", date: "Nov 02, 2026", done: true },
        { title: "Chassis CNC Milling", date: "Nov 18, 2026", done: false },
        { title: "Zero-G Assembly & Testing", date: "Dec 02, 2026", done: false },
        { title: "Dispatch & Overnight Flight", date: "Dec 15, 2026", done: false }
      ]
    }
  }
];

function readOrders() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_ORDERS, null, 2), 'utf-8');
      return INITIAL_ORDERS;
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading orders db:', err);
    return INITIAL_ORDERS;
  }
}

function writeOrders(orders) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(orders, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing orders db:', err);
  }
}

export const ordersStore = {
  getAll() {
    return readOrders();
  },

  getById(orderId) {
    const orders = readOrders();
    const cleanId = (orderId || '').trim().toUpperCase();
    return orders.find(o => o.orderId.toUpperCase() === cleanId);
  },

  findByEmailOrId(query) {
    const orders = readOrders();
    const clean = (query || '').trim().toLowerCase();
    return orders.filter(o => 
      o.orderId.toLowerCase() === clean || 
      o.customer.email.toLowerCase() === clean
    );
  },

  create(orderData) {
    const orders = readOrders();
    // Generate unique pre-order ID e.g. AETH-4819-Z
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const randomChar = chars[Math.floor(Math.random() * chars.length)];
    const orderId = `AETH-${randomNum}-${randomChar}`;
    const nextQueueNum = orders.length + 145;

    const newOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      status: "Deposit Confirmed",
      statusCode: "deposit_confirmed",
      queueNumber: nextQueueNum,
      batchName: orderData.batchName || "Global Batch 1",
      customer: orderData.customer,
      item: orderData.item,
      pricing: orderData.pricing,
      tradeIn: orderData.tradeIn || { applied: false, credit: 0 },
      tracking: {
        estimatedDelivery: orderData.estimatedDelivery || "Dec 19, 2026",
        carrierName: "FedEx Zero-G Priority",
        timeline: [
          { title: "Pre-Order Placed", date: "Today", done: true },
          { title: "Priority Queue Allocated (Spot #" + nextQueueNum + ")", date: "Today", done: true },
          { title: "Custom Chassis Fabrication", date: "Nov 22, 2026", done: false },
          { title: "Zero-G Assembly & Calibration", date: "Dec 05, 2026", done: false },
          { title: "Insured Air Shipping", date: orderData.estimatedDelivery || "Dec 19, 2026", done: false }
        ]
      }
    };

    orders.unshift(newOrder);
    writeOrders(orders);
    return newOrder;
  },

  updateStatus(orderId, newStatus) {
    const orders = readOrders();
    const cleanId = (orderId || '').trim().toUpperCase();
    const index = orders.findIndex(o => o.orderId.toUpperCase() === cleanId);
    if (index === -1) return null;

    orders[index].status = newStatus;
    if (newStatus === "In Production") {
      orders[index].statusCode = "in_production";
      if (orders[index].tracking?.timeline?.[2]) orders[index].tracking.timeline[2].done = true;
    } else if (newStatus === "Shipped") {
      orders[index].statusCode = "shipped";
      orders[index].tracking?.timeline?.forEach(t => t.done = true);
    }
    writeOrders(orders);
    return orders[index];
  }
};

