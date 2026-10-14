import { Document, model, Schema, Types } from 'mongoose';

export type Priority =
  | 'noPriority'
  | 'lowPriority'
  | 'mediumPriority'
  | 'highPriority';

export interface ITask extends Document<string> {
  userId: Types.ObjectId;
  title: string;
  isCompleted: boolean;
  priority: Priority;
  room: string;
  date?: string;
  isDeleted: boolean;
}

const taskSchema = new Schema<ITask>(
  {
    _id: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    isCompleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    priority: {
      type: String,
      enum: ['noPriority', 'lowPriority', 'mediumPriority', 'highPriority'],
      required: true,
      default: 'noPriority',
    },
    room: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

taskSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    const { _id, ...rest } = ret;
    return rest;
  },
});

export const Task = model<ITask>('Task', taskSchema);
