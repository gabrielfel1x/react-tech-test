import { useContext } from "react";
import { SavedRecipesContext } from "../contexts/saved-recipes-context";

export const useSavedRecipes = () => {
  const context = useContext(SavedRecipesContext);
  if (!context) {
    throw new Error(
      "useSavedRecipes must be used within a SavedRecipesProvider"
    );
  }
  return context;
};
