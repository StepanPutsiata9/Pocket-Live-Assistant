import { Document, model, Schema, Types } from 'mongoose';

interface IFoodItem {
  name: string;
  type: string;
  calories: number;
  protein: number;
  fats: number;
  carbs: number;
}

export interface IDailyLog extends Document {
  userId: Types.ObjectId;
  date: string;
  water: number;
  food: IFoodItem[];
}

const FoodItemSchema = new Schema<IFoodItem>({
  name: { type: String, required: true, trim: true },
  type: { type: String, required: true },
  calories: { type: Number, default: 0 },
  protein: { type: Number, default: 0 },
  fats: { type: Number, default: 0 },
  carbs: { type: Number, default: 0 },
});

const DailyLogSchema = new Schema<IDailyLog>(
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
    water: {
      type: Number,
      default: 0,
    },
    food: [FoodItemSchema],
  },
  {
    timestamps: true,
  },
);

DailyLogSchema.index({ userId: 1, date: 1 }, { unique: true });

DailyLogSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    const { _id, ...rest } = ret;
    return rest;
  },
});

export const DailyLog = model<IDailyLog>('DailyLog', DailyLogSchema);
