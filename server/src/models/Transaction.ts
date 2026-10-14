import { Document, model, Schema, Types } from 'mongoose';

export type TransactionType = 'expense' | 'income';
export type Currency = 'USD' | 'EUR' | 'BYN' | 'GBP' | 'PLN';

export interface ITransaction extends Document {
  userId: Types.ObjectId;
  type: TransactionType;
  description: string;
  amount: number;
  category: string;
  date: Date;
  currency: Currency;
}

const transactionSchema = new Schema<ITransaction>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['expense', 'income'],
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    currency: {
      type: String,
      enum: ['USD', 'EUR', 'BYN', 'GBP', 'PLN'],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

transactionSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    const { _id, ...rest } = ret;
    return rest;
  },
});

export const Transaction = model<ITransaction>(
  'Transaction',
  transactionSchema,
);
