export interface Ingredient {
  name: string;
  measure: string;
}

export interface Recipe {
  id: string;
  title: string;
  imageUrl: string;
  category?: string;
  area?: string;
  tags: string[];
  ingredients: Ingredient[];
  instructions?: string;
  youtubeUrl?: string;
}
