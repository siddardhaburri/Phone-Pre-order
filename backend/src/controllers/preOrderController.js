import { PreOrder } from '../models/PreOrder.js';
import { db } from '../config/database.js';

/**
 * Normalizes Indian phone number to 10 digits
 * Strips +91, 0, spaces, hyphens, parentheses
 */
const normalizePhoneNumber = (phone) => {
  if (typeof phone !== 'string') return '';
  let cleaned = phone.replace(/\D/g, ''); // strip non-digits

  // If starts with 91 and has 12 digits, strip country code
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    cleaned = cleaned.substring(2);
  }
  // If starts with 0 and has 11 digits, strip leading 0
  else if (cleaned.length === 11 && cleaned.startsWith('0')) {
    cleaned = cleaned.substring(1);
  }

  return cleaned;
};

/**
 * Generates a collision-resistant unique booking identifier
 * Format: NXG-<TIMESTAMP36>-<4-DIGIT-RANDOM> (e.g. NXG-M7XYZ9-4821)
 */
const generateBookingId = async () => {
  let unique = false;
  let bookingId = '';
  let attempts = 0;

  while (!unique && attempts < 5) {
    attempts++;
    const timestamp = Date.now().toString(36).toUpperCase();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    bookingId = `NXG-${timestamp}-${randomSuffix}`;

    const existing = await PreOrder.findOne({ bookingId }).lean();
    if (!existing) {
      unique = true;
    }
  }

  return bookingId;
};

/**
 * Controller: Register a Customer Pre-Order
 * POST /api/preorders
 */
export const createPreOrder = async (req, res, next) => {
  try {
    const { fullName, phoneNumber, email, deviceName, devicePrice } = req.body;

    const validationErrors = [];

    // 1. Validate Full Name
    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      validationErrors.push('Full name is required.');
    } else if (fullName.trim().length < 2) {
      validationErrors.push('Full name must be at least 2 characters.');
    } else if (fullName.trim().length > 100) {
      validationErrors.push('Full name cannot exceed 100 characters.');
    }

    // 2. Validate & Normalize Phone Number
    const normalizedPhone = normalizePhoneNumber(phoneNumber);
    const indianPhoneRegex = /^[6-9]\d{9}$/;
    if (!phoneNumber) {
      validationErrors.push('Phone number is required.');
    } else if (!indianPhoneRegex.test(normalizedPhone)) {
      validationErrors.push('Please enter a valid 10-digit Indian mobile number (e.g., 9876543210).');
    }

    // 3. Validate Email Address
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    if (!email) {
      validationErrors.push('Email address is required.');
    } else if (!emailRegex.test(normalizedEmail)) {
      validationErrors.push('Please enter a valid email address (e.g., name@example.com).');
    }

    // 4. Validate Device Information
    if (!deviceName || typeof deviceName !== 'string' || !deviceName.trim()) {
      validationErrors.push('Device name is required.');
    }

    const parsedPrice = Number(devicePrice);
    if (devicePrice === undefined || devicePrice === null || isNaN(parsedPrice) || parsedPrice <= 0) {
      validationErrors.push('A valid device price is required.');
    }

    // If any validation failed, return 400 Bad Request
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        error: {
          message: validationErrors.join(' '),
          details: validationErrors,
          status: 400
        }
      });
    }

    // Check database connection health
    const dbStatus = db.getStatus();
    if (!dbStatus.connected) {
      return res.status(503).json({
        success: false,
        error: {
          message: 'Database service is currently connecting. Please try again in a few moments.',
          status: 503
        }
      });
    }

    // Generate unique booking identifier
    const bookingId = await generateBookingId();

    // Create and save document in MongoDB Atlas
    const preOrder = await PreOrder.create({
      bookingId,
      fullName: fullName.trim(),
      phoneNumber: normalizedPhone,
      email: normalizedEmail,
      deviceName: deviceName.trim(),
      devicePrice: parsedPrice,
      depositAmount: 5999,
      orderStatus: 'registered',
      createdAt: new Date()
    });

    console.log(`[PreOrder] New customer registration saved to MongoDB Atlas: ${bookingId} (${preOrder.fullName})`);

    // Return the created booking details with 201 Created
    return res.status(201).json({
      success: true,
      message: 'Your Pre-Order Has Been Registered!',
      preOrder: {
        bookingId: preOrder.bookingId,
        fullName: preOrder.fullName,
        phoneNumber: preOrder.phoneNumber,
        email: preOrder.email,
        deviceName: preOrder.deviceName,
        devicePrice: preOrder.devicePrice,
        depositAmount: preOrder.depositAmount,
        orderStatus: preOrder.orderStatus,
        createdAt: preOrder.createdAt
      }
    });
  } catch (error) {
    console.error('[PreOrder] Error saving registration to MongoDB:', error.message);

    // Handle Mongoose duplicate key error if collision occurs
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        error: {
          message: 'A registration with this booking ID already exists. Please try again.',
          status: 409
        }
      });
    }

    return next(error);
  }
};

/**
 * Masks phone numbers for public lookup security (e.g. 98******10)
 */
const maskPhoneNumber = (phone) => {
  if (!phone || typeof phone !== 'string') return '';
  const digits = phone.replace(/\D/g, '');
  if (digits.length <= 4) return '******';
  return `${digits.slice(0, 2)}******${digits.slice(-2)}`;
};

/**
 * Masks email addresses for public lookup security (e.g. r***l@example.com)
 */
const maskEmailAddress = (email) => {
  if (!email || typeof email !== 'string' || !email.includes('@')) return '';
  const [localPart, domain] = email.split('@');
  if (localPart.length <= 2) {
    return `${localPart[0]}***@${domain}`;
  }
  return `${localPart[0]}***${localPart[localPart.length - 1]}@${domain}`;
};

/**
 * Controller: Get Pre-Order Details by Booking ID (Public status verification)
 * GET /api/preorders/:bookingId
 * Protects customer privacy by masking phone number and email address.
 */
export const getPreOrderById = async (req, res, next) => {
  try {
    const { bookingId } = req.params;

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        error: { message: 'Booking ID is required', status: 400 }
      });
    }

    const preOrder = await PreOrder.findOne({
      bookingId: bookingId.trim().toUpperCase()
    }).select('-__v -updatedAt').lean();

    if (!preOrder) {
      return res.status(404).json({
        success: false,
        error: { message: `No pre-order found for booking ID: ${bookingId}`, status: 404 }
      });
    }

    return res.status(200).json({
      success: true,
      preOrder: {
        bookingId: preOrder.bookingId,
        fullName: preOrder.fullName,
        phoneNumber: maskPhoneNumber(preOrder.phoneNumber),
        email: maskEmailAddress(preOrder.email),
        deviceName: preOrder.deviceName,
        devicePrice: preOrder.devicePrice,
        depositAmount: preOrder.depositAmount,
        orderStatus: preOrder.orderStatus,
        createdAt: preOrder.createdAt
      }
    });
  } catch (error) {
    return next(error);
  }
};

export default {
  createPreOrder,
  getPreOrderById
};

