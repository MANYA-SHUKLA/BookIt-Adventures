import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
  experienceId: mongoose.Types.ObjectId;
  userId?: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  selectedDate: Date;
  numberOfSlots: number;
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  promoCode?: string;
  status: 'confirmed' | 'cancelled' | 'pending';
  bookingReference: string;
}

const BookingSchema: Schema = new Schema({
  experienceId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Experience', 
    required: true 
  },
  userId: { type: String },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  userPhone: { type: String, required: true },
  selectedDate: { type: Date, required: true },
  numberOfSlots: { type: Number, required: true, min: 1 },
  totalAmount: { type: Number, required: true },
  discountAmount: { type: Number, default: 0 },
  finalAmount: { type: Number, required: true },
  promoCode: { type: String },
  status: { 
    type: String, 
    enum: ['confirmed', 'cancelled', 'pending'], 
    default: 'confirmed' 
  },
  bookingReference: { type: String, required: true, unique: true }
}, {
  timestamps: true
});

// Index to prevent double booking for same slot
BookingSchema.index({ experienceId: 1, selectedDate: 1 });

export default mongoose.model<IBooking>('Booking', BookingSchema);