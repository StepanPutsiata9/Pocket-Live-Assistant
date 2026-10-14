import { Document, model, Schema, Types } from 'mongoose';

export interface IMood extends Document {
  userId: Types.ObjectId;
  date: string;
  moodIndex: number;
}

const moodSchema = new Schema<IMood>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    moodIndex: {
      type: Number,
      required: true,
      min: 0,
      max: 6,
    },
  },
  { timestamps: true },
);

moodSchema.index({ userId: 1, date: 1 }, { unique: true });

moodSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    const { _id, ...rest } = ret;
    return rest;
  },
});

export const Mood = model<IMood>('Mood', moodSchema);
