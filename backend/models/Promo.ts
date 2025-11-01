import mongoose, { Document, Schema } from 'mongoose';

export interface IPromo extends Document {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minAmount?: number;
  maxDiscount?: number;
  validFrom: Date;
  validUntil: Date;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
}

const PromoSchema: Schema = new Schema({
  code: { type: String, required: true, unique: true },
  discountType: { 
    type: String, 
    enum: ['percentage', 'fixed'], 
    required: true 
  },
  discountValue: { type: Number, required: true },
  minAmount: { type: Number },
  maxDiscount: { type: Number },
  validFrom: { type: Date, required: true },
  validUntil: { type: Date, required: true },
  usageLimit: { type: Number, default: 1000 },
  usedCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

export default mongoose.model<IPromo>('Promo', PromoSchema);