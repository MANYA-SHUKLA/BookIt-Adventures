import mongoose, { Document, Schema } from 'mongoose';

export interface IExperience extends Document {
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  location: string;
  duration: string;
  category: string;
  slots: {
    date: Date;
    available: number;
    maxCapacity: number;
  }[];
  rating: number;
  reviewCount: number;
}

const ExperienceSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  image: { type: String, required: true },
  location: { type: String, required: true },
  duration: { type: String, required: true },
  category: { type: String, required: true },
  slots: [{
    date: { type: Date, required: true },
    available: { type: Number, required: true },
    maxCapacity: { type: Number, required: true }
  }],
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 }
}, {
  timestamps: true
});

export default mongoose.model<IExperience>('Experience', ExperienceSchema);