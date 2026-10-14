import { Document, model, Schema } from 'mongoose';

export interface IUser extends Document {
  firebaseUid: string;
  email: string;
  pushTokens?: string[];
  language?: string;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  firebaseUid: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  pushTokens: { type: [String], default: [] },
  language: { type: String, enum: ['en', 'ru'], default: 'en' },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = model<IUser>('User', userSchema);
