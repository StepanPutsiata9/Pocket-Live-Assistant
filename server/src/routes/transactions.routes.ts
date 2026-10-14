import { Router } from 'express';

import {
  addTransaction,
  deleteTransaction,
  getTransactions,
} from '../controllers/transactions.controller.ts';
import { verifyFirebaseToken } from '../middleware/auth.middleware.ts';

const router = Router();

router.use(verifyFirebaseToken);

router.get('/', getTransactions);

router.post('/', addTransaction);
router.delete('/:id', deleteTransaction);

export default router;
