export interface RawMeal {
  idMeal: string;
  strMeal: string;
  strCategory: string | null;
  strArea: string | null;
  strInstructions: string | null;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string | null;
  [key: string]: string | null;
}

export interface RawCategory {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface MealsResponse {
  meals: RawMeal[] | null;
}

export interface CategoriesResponse {
  categories: RawCategory[];
}
