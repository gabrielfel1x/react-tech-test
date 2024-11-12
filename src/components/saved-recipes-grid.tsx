import { Link } from "react-router-dom";
import { useSavedRecipes } from "../hooks/use-save";
import IconButton from "./button";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

export function SavedRecipesGrid() {
  const { savedRecipes, removeRecipe } = useSavedRecipes();

  if (savedRecipes.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-lg font-bold text-foreground">
          No recipes saved yet.
        </h2>
        <p className="text-muted-foreground">
          Browse and save your favorite recipes.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="font-bold text-xl text-foreground">Your Saved Recipes:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {savedRecipes.map((meal) => (
          <div
            key={meal.idMeal}
            className="border border-border rounded-lg p-4 shadow-md hover:shadow-xl transition-shadow duration-300 hover:scale-105 transform relative bg-card"
          >
            <Link to={`/recipe/${meal.idMeal}`}>
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="rounded w-full h-40 object-cover mb-2"
              />
              <h3 className="text-lg font-semibold text-foreground">
                {meal.strMeal}
              </h3>
              <p className="text-sm text-muted-foreground">
                {meal.strCategory}
              </p>
            </Link>
            <IconButton
              icon={faBookmark}
              onClick={() => removeRecipe(meal.idMeal)}
              className="absolute bottom-4 right-4 text-primary hover:text-primary-foreground"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
