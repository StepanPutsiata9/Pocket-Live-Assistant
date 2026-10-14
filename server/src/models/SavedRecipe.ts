import { Document, model, Schema, Types } from 'mongoose';

export interface IIngredient {
  name: string;
  measure: string;
}

export interface ISavedRecipe extends Document {
  userId: Types.ObjectId;
  recipeId: string;
  title: string;
  imageUrl: string;
  category?: string;
  area?: string;
  tags: string[];
  ingredients: IIngredient[];
  instructions?: string;
  youtubeUrl?: string;
}

const ingredientSchema = new Schema<IIngredient>(
  {
    name: { type: String, required: true },
    measure: { type: String, required: true },
  },
  { _id: false },
);

const savedRecipeSchema = new Schema<ISavedRecipe>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    recipeId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    area: {
      type: String,
    },
    tags: {
      type: [String],
      default: [],
    },
    ingredients: {
      type: [ingredientSchema],
      default: [],
    },
    instructions: {
      type: String,
    },
    youtubeUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

savedRecipeSchema.index({ userId: 1, recipeId: 1 }, { unique: true });

savedRecipeSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    const { _id, ...rest } = ret;
    return rest;
  },
});

export const SavedRecipe = model<ISavedRecipe>(
  'SavedRecipe',
  savedRecipeSchema,
);
