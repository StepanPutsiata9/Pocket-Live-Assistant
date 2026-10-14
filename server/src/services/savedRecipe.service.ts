import { AppError } from '../errors/AppError.ts';
import { type IIngredient, SavedRecipe } from '../models/SavedRecipe.ts';
import { User } from '../models/User.ts';

interface SaveRecipeInput {
  id: string;
  title: string;
  imageUrl: string;
  category?: string;
  area?: string;
  tags?: string[];
  ingredients?: IIngredient[];
  instructions?: string;
  youtubeUrl?: string;
}

const isDuplicateKeyError = (error: unknown): boolean =>
  typeof error === 'object' &&
  error !== null &&
  'code' in error &&
  (error as { code?: number }).code === 11000;

const resolveUserId = async (firebaseUid: string) => {
  const user = await User.findOne({ firebaseUid });
  if (!user) throw new AppError('User not found', 404);
  return user._id;
};

export const listSavedRecipes = async (firebaseUid: string) => {
  const userId = await resolveUserId(firebaseUid);
  return SavedRecipe.find({ userId }).sort({ createdAt: -1 });
};

export const saveRecipe = async (
  firebaseUid: string,
  input: SaveRecipeInput,
) => {
  const { id, title, imageUrl } = input;
  if (!id || !title || !imageUrl) {
    throw new AppError('id, title and imageUrl are required', 400);
  }

  const userId = await resolveUserId(firebaseUid);

  const payload = {
    userId,
    recipeId: id,
    title,
    imageUrl,
    category: input.category,
    area: input.area,
    tags: input.tags ?? [],
    ingredients: input.ingredients ?? [],
    instructions: input.instructions,
    youtubeUrl: input.youtubeUrl,
  };

  try {
    return await SavedRecipe.findOneAndUpdate(
      { userId, recipeId: id },
      payload,
      { returnDocument: 'after', upsert: true, setDefaultsOnInsert: true },
    );
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      return SavedRecipe.findOne({ userId, recipeId: id });
    }
    throw error;
  }
};

export const removeSavedRecipe = async (
  firebaseUid: string,
  recipeId: string,
) => {
  const userId = await resolveUserId(firebaseUid);

  const deleted = await SavedRecipe.findOneAndDelete({ userId, recipeId });
  if (!deleted) {
    throw new AppError('Saved recipe not found or unauthorized', 404);
  }

  return deleted;
};
