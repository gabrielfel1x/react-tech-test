import { createContext } from "react";
import { Meal } from "../types/meal";

interface SavedRecipesContextProps {
  savedRecipes: Meal[];
  saveRecipe: (recipe: Meal) => void;
  removeRecipe: (id: string) => void;
}

export const SavedRecipesContext = createContext<
  SavedRecipesContextProps | undefined
>(undefined);
