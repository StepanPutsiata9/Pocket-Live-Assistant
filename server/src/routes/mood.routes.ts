import { Router } from 'express';

import { deleteMood, getMoods, upsertMood } from '../controllers/mood.controller.ts';
import { verifyFirebaseToken } from '../middleware/auth.middleware.ts';

const router = Router();

router.use(verifyFirebaseToken);

router.get('/', getMoods);
router.post('/', upsertMood);
router.delete('/:id', deleteMood);

export default router;
