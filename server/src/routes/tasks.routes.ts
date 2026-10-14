import { Router } from 'express';

import {
  clearCompletedTasks,
  createTask,
  deleteTask,
  getTasks,
  getTasksChanges,
  pushTasks,
  updateTask,
} from '../controllers/task.controller.ts';
import { verifyFirebaseToken } from '../middleware/auth.middleware.ts';

const router = Router();

router.use(verifyFirebaseToken);

router.get('/', getTasks);
router.get('/sync', getTasksChanges);
router.post('/sync', pushTasks);
router.post('/', createTask);
router.delete('/completed', clearCompletedTasks);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
