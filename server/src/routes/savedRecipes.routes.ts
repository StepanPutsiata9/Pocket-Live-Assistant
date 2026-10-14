import { Router } from 'express';

import {
  createSavedRecipe,
  deleteSavedRecipe,
  getSavedRecipes,
} from '../controllers/savedRecipe.controller.ts';
import { verifyFirebaseToken } from '../middleware/auth.middleware.ts';

const router = Router();

router.use(verifyFirebaseToken);

router.get('/', getSavedRecipes);
router.post('/', createSavedRecipe);
router.delete('/:recipeId', deleteSavedRecipe);

export default router;
