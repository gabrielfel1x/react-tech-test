export const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1/";

export const GET_MEAL_BY_NAME = (name: string) => `/search.php?s=${name}`;

export const GET_MEAL_DETAILS_BY_ID = (id: string) => `/lookup.php?i=${id}`;

export const GET_RANDOM_MEAL = () => "/random.php";

export const GET_MEAL_CATEGORIES = () => "/categories.php";

export const GET_MEAL_BY_CATEGORY = (category: string) =>
  `/filter.php?c=${category}`;
