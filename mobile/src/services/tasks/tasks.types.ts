import { Priority } from '@/types/task';

export interface CreateTaskPayload {
  _id: string;
  title: string;
  priority: Priority;
  room: string;
  date?: string;
}

export interface SyncTaskPayload {
  _id: string;
  title: string;
  priority: Priority;
  room: string;
  date?: string;
  isCompleted: boolean;
  isDeleted: boolean;
}

export type AddTaskPayload = Omit<CreateTaskPayload, '_id'>;
