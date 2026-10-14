export type Priority =
  | 'noPriority'
  | 'lowPriority'
  | 'mediumPriority'
  | 'highPriority';

export type SyncStatus = 'pending' | 'synced';

export type Task = {
  id: string;
  title: string;
  isCompleted: boolean;
  room: string;
  priority: Priority;
  date?: string;
  updatedAt: string;
  isDeleted: boolean;
  syncStatus: SyncStatus;
};
