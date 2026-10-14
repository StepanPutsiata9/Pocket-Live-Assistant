import axios from 'axios';

import { MEALDB_BASE_URL } from './meal-db.constants';

export const mealdbClient = axios.create({
  baseURL: MEALDB_BASE_URL,
  timeout: 10000,
});
