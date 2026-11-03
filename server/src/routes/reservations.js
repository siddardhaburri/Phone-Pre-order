import express from 'express';
import { DEVICES } from '../data/devices.js';

const router = express.Router();

// In-memory reservations store
const reservationsStore = [
  {
    bookingId: '#NXG-27U-1084',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    customer: {
      fullName: 'Vikram Malhotra',
      email: 'vikram.m@domain.com',
      phone: '+91 98111 22334',
      pinCode: '110001',
      city: 'New Delhi'
    },
    device: {
      id: 'galaxy-s27-ultra',
      name: 'Samsung Galaxy S27 Ultra',
      colorName: 'Titanium Gray',
      storage: '512GB'
    },
    pricing: {
      tokenDeposit: 999,
      totalPrice: 134999,
      balanceDue: 134000,
      currency: 'INR'
    },
    paymentMethod: 'UPI (Demo)',
    status: 'Confirmed (Demo)',
    estimatedDelivery: 'January 2027'
  }
];

// 1. Get all devices
router.get('/devices', (req, res) => {
  res.json({ success: true, count: DEVICES.length, data: DEVICES });
});

// 2. Get device by id
router.get('/devices/:id', (req, res) => {
  const device = DEVICES.find(d => d.id === req.params.id);
  if (!device) {
    return res.status(404).json({ success: false, message: 'Device not found' });
  }
  res.json({ success: true, data: device });
});

// 3. Create Reservation
router.post('/reservations', (req, res) => {
  const { customer, deviceId, colorName, storageId, paymentMethod } = req.body;

  // Validation
  if (!customer?.fullName?.trim()) {
    return res.status(400).json({ success: false, message: 'Full name is required.' });
  }
  if (!customer?.email?.trim() || !customer.email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Valid email address is required.' });
  }
  if (!customer?.phone?.trim() || customer.phone.length < 8) {
    return res.status(400).json({ success: false, message: 'Valid phone number is required.' });
  }
  if (!customer?.pinCode?.trim() || customer.pinCode.length !== 6) {
    return res.status(400).json({ success: false, message: 'Valid 6-digit PIN code is required.' });
  }

  const matchedDevice = DEVICES.find(d => d.id === deviceId);
  if (!matchedDevice) {
    return res.status(400).json({ success: false, message: 'Invalid device selection.' });
  }

  const matchedTier = matchedDevice.storageTiers.find(t => t.id === storageId) || matchedDevice.storageTiers[0];

  // Generate unique booking ID (e.g. #NXG-DUO-4812)
  const codePrefix = matchedDevice.id.includes('duo') ? 'DUO' : matchedDevice.id.includes('s27') ? '27U' : matchedDevice.id.includes('18') ? 'IP18' : 'M28';
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  const bookingId = `#NXG-${codePrefix}-${randomDigits}`;

  const newReservation = {
    bookingId,
    createdAt: new Date().toISOString(),
    customer: {
      fullName: customer.fullName.trim(),
      email: customer.email.trim(),
      phone: customer.phone.trim(),
      pinCode: customer.pinCode.trim(),
      city: customer.city || 'India'
    },
    device: {
      id: matchedDevice.id,
      name: matchedDevice.name,
      colorName: colorName || matchedDevice.colors[0].name,
      storage: matchedTier.capacity
    },
    pricing: {
      tokenDeposit: 999,
      totalPrice: matchedTier.price,
      balanceDue: matchedTier.price - 999,
      currency: 'INR'
    },
    paymentMethod: paymentMethod || 'UPI (Demo Simulation)',
    status: 'Confirmed (Demo Reservation)',
    estimatedDelivery: matchedDevice.estimatedDelivery,
    launchBonus: matchedDevice.launchBonus
  };

  reservationsStore.unshift(newReservation);

  res.status(201).json({
    success: true,
    message: 'Demo reservation recorded successfully.',
    data: newReservation
  });
});

// 4. Retrieve Reservation
router.get('/reservations/:id', (req, res) => {
  const query = req.params.id.trim().toUpperCase();
  const found = reservationsStore.find(r => r.bookingId.toUpperCase() === query || r.customer.email.toLowerCase() === query.toLowerCase());

  if (!found) {
    return res.status(404).json({ success: false, message: 'Reservation not found.' });
  }

  res.json({ success: true, data: found });
});

export default router;

