import { AppError } from '../errors/AppError.ts';
import { type Priority, Task } from '../models/Task.ts';
import { User } from '../models/User.ts';

interface CreateTaskInput {
  _id: string;
  title: string;
  priority?: Priority;
  room: string;
  date?: string;
}

interface UpdateTaskInput {
  title?: string;
  priority?: Priority;
  room?: string;
  date?: string;
  isCompleted?: boolean;
}

interface SyncTaskInput {
  _id: string;
  title: string;
  priority?: Priority;
  room: string;
  date?: string;
  isCompleted: boolean;
  isDeleted: boolean;
}

const resolveUserId = async (firebaseUid: string) => {
  const user = await User.findOne({ firebaseUid });
  if (!user) throw new AppError('User not found', 404);
  return user._id;
};

export const listTasks = async (firebaseUid: string) => {
  const userId = await resolveUserId(firebaseUid);
  return Task.find({ userId, isDeleted: false }).sort({ createdAt: -1 });
};

export const getTasksChanges = async (firebaseUid: string, since?: string) => {
  const userId = await resolveUserId(firebaseUid);

  const filter: Record<string, unknown> = { userId };
  if (since) {
    filter.updatedAt = { $gt: new Date(since) };
  }

  return Task.find(filter).sort({ updatedAt: 1 });
};

export const createTask = async (
  firebaseUid: string,
  input: CreateTaskInput,
) => {
  const { _id, title, priority, room, date } = input;
  if (!title?.trim() || !room?.trim()) {
    throw new AppError('title and room are required', 400);
  }

  const userId = await resolveUserId(firebaseUid);

  const task = await Task.findOneAndUpdate(
    { _id, userId },
    {
      $set: {
        title: title.trim(),
        room: room.trim(),
        priority: priority ?? 'noPriority',
        date,
      },
    },
    {
      upsert: true,
      returnDocument: 'after',
      runValidators: true,
      setDefaultsOnInsert: true,
    },
  );

  return task;
};

export const updateTask = async (
  firebaseUid: string,
  taskId: string,
  input: UpdateTaskInput,
) => {
  const userId = await resolveUserId(firebaseUid);

  const updates: UpdateTaskInput = {};
  if (input.title !== undefined) updates.title = input.title;
  if (input.priority !== undefined) updates.priority = input.priority;
  if (input.room !== undefined) updates.room = input.room;
  if (input.date !== undefined) updates.date = input.date;
  if (input.isCompleted !== undefined) updates.isCompleted = input.isCompleted;

  const task = await Task.findOneAndUpdate({ _id: taskId, userId }, updates, {
    returnDocument: 'after',
    runValidators: true,
  });

  if (!task) {
    throw new AppError('Task not found or unauthorized', 404);
  }

  return task;
};

export const deleteTask = async (firebaseUid: string, taskId: string) => {
  const userId = await resolveUserId(firebaseUid);

  const task = await Task.findOneAndUpdate(
    { _id: taskId, userId },
    { $set: { isDeleted: true } },
    { returnDocument: 'after' },
  );

  if (!task) {
    throw new AppError('Task not found or unauthorized', 404);
  }

  return task;
};

export const clearCompletedTasks = async (firebaseUid: string) => {
  const userId = await resolveUserId(firebaseUid);
  await Task.updateMany(
    { userId, isCompleted: true, isDeleted: false },
    { $set: { isDeleted: true } },
  );
};

export const pushTasks = async (
  firebaseUid: string,
  tasks: SyncTaskInput[],
) => {
  const userId = await resolveUserId(firebaseUid);

  await Promise.all(
    tasks.map(task =>
      Task.findOneAndUpdate(
        { _id: task._id, userId },
        {
          $set: {
            title: task.title,
            room: task.room,
            priority: task.priority ?? 'noPriority',
            date: task.date,
            isCompleted: task.isCompleted,
            isDeleted: task.isDeleted,
          },
        },
        {
          upsert: true,
          returnDocument: 'after',
          runValidators: true,
          setDefaultsOnInsert: true,
        },
      ),
    ),
  );
};
