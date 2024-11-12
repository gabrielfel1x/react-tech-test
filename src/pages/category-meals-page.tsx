import { useParams } from "react-router-dom";
import MealList from "../components/meal-list";
import { useSavedRecipes } from "../hooks/useSave";
import { SkeletonCard } from "../components/loaders/skeleton-card";
import ErrorMessage from "../components/error-message";
import useCategoryMeals from "../hooks/useCategoryMeals";
import { Meal } from "../types/meal";

export default function CategoryMealsPage() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const { savedRecipes, saveRecipe, removeRecipe } = useSavedRecipes();
  const { meals, loading, error } = useCategoryMeals(categoryName || "");

  const handleToggleSave = (meal: Meal) => {
    const isSaved = savedRecipes.some(
      (savedMeal) => savedMeal.idMeal === meal.idMeal
    );
    if (isSaved) {
      removeRecipe(meal.idMeal);
    } else {
      saveRecipe(meal);
    }
  };

  return (
    <section className="py-12 bg-background">
      <h1 className="text-4xl font-bold text-center text-foreground">
        {categoryName} Recipes
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {Array(8)
            .fill(null)
            .map((_, index) => (
              <SkeletonCard key={index} />
            ))}
        </div>
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <MealList
          meals={meals}
          suggestions={[]}
          loading={loading}
          savedRecipes={savedRecipes}
          onToggleSave={handleToggleSave}
        />
      )}
    </section>
  );
}
