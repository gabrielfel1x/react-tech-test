import api from "./api";
import { Meal, MealCategory } from "../types/meal";
import {
  GET_MEAL_BY_NAME,
  GET_MEAL_BY_FIRST_lETTER,
  GET_MEAL_DETAILS_BY_ID,
  GET_RANDOM_MEAL,
  GET_MEAL_CATEGORIES,
  GET_MEAL_BY_CATEGORY,
} from "../constants/api-routes";

export const getMealByName = async (name: string): Promise<Meal[]> => {
  const response = await api.get(GET_MEAL_BY_NAME(name));
  return response.data.meals;
};

export const getMealByFirstLetter = async (letter: string): Promise<Meal[]> => {
  const response = await api.get(GET_MEAL_BY_FIRST_lETTER(letter));
  return response.data.meals;
};

export const getMealDetailsById = async (id: string): Promise<Meal> => {
  const response = await api.get(GET_MEAL_DETAILS_BY_ID(id));
  return response.data.meals[0];
};

export const getRandomMeal = async (): Promise<Meal> => {
  const response = await api.get(GET_RANDOM_MEAL());
  return response.data.meals[0];
};

export const getMealCategories = async (): Promise<MealCategory[]> => {
  const response = await api.get(GET_MEAL_CATEGORIES());
  return response.data.categories;
};

export const getMealsByCategory = async (category: string): Promise<Meal[]> => {
  const response = await api.get(GET_MEAL_BY_CATEGORY(category));
  return response.data.meals;
};
