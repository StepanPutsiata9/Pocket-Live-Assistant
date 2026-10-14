import Config from 'react-native-config';

export const MEALDB_BASE_URL =
  Config.MEALDB_BASE_URL ?? 'https://www.themealdb.com/api/json/v1/1';

export const MEALDB_INGREDIENT_COUNT = 20;

export const DEFAULT_CATEGORY = 'Chicken';

export const MEALDB_AREAS = [
  'Algerian',
  'Australian',
  'British',
  'Canadian',
  'Chinese',
  'Croatian',
  'Egyptian',
  'Filipino',
  'Greek',
  'Irish',
  'Italian',
  'Jamaican',
  'Japanese',
  'Kenyan',
  'Malaysian',
  'Mexican',
  'Moroccan',
  'Polish',
  'Portuguese',
  'Russian',
  'Saudi Arabian',
  'Spanish',
  'Syrian',
  'Thai',
  'Tunisian',
  'Turkish',
  'Ukrainian',
  'Uruguayan',
  'Vietnamese',
];
