import mongoose from 'mongoose';

/**
 * PreOrder Schema
 * Collection: preorders
 */
const preOrderSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: [true, 'Booking ID is required'],
      unique: true,
      trim: true,
      uppercase: true,
      index: true
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: [2, 'Full name must be at least 2 characters'],
      maxlength: [100, 'Full name cannot exceed 100 characters']
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^[6-9]\d{9}$/, 'Please provide a valid 10-digit Indian mobile number']
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please provide a valid email address'
      ]
    },
    deviceName: {
      type: String,
      required: [true, 'Device name is required'],
      trim: true
    },
    devicePrice: {
      type: Number,
      required: [true, 'Device price is required'],
      min: [0, 'Device price cannot be negative']
    },
    depositAmount: {
      type: Number,
      default: 5999
    },
    orderStatus: {
      type: String,
      default: 'registered',
      enum: ['registered', 'pending_confirmation', 'confirmed', 'cancelled']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: 'preorders',
    timestamps: true
  }
);

export const PreOrder = mongoose.model('PreOrder', preOrderSchema);
export default PreOrder;

