import React, { useState, ReactNode } from "react";
import { SavedRecipesContext } from "./saved-recipes-context";
import { Meal } from "../types/meal";

export const SavedRecipesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [savedRecipes, setSavedRecipes] = useState<Meal[]>([]);

  const saveRecipe = (recipe: Meal) => {
    setSavedRecipes((prev) => [...prev, recipe]);
  };

  const removeRecipe = (id: string) => {
    setSavedRecipes((prev) => prev.filter((recipe) => recipe.idMeal !== id));
  };

  return (
    <SavedRecipesContext.Provider
      value={{ savedRecipes, saveRecipe, removeRecipe }}
    >
      {children}
    </SavedRecipesContext.Provider>
  );
};
