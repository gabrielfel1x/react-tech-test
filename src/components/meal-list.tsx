import { Meal } from "../types/meal";
import IconButton from "./button";
import { Link } from "react-router-dom";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { SkeletonCard } from "./loaders/skeleton-card";

type MealListProps = {
  meals: Meal[];
  suggestions: Meal[];
  savedRecipes: Meal[];
  loading: boolean;
  onToggleSave: (meal: Meal) => void;
};

export default function MealList({
  meals = [],
  suggestions = [],
  savedRecipes = [],
  loading,
  onToggleSave,
}: MealListProps) {
  const displayedMeals = (meals && meals.length ? meals : suggestions) || [];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {Array(8)
          .fill(null)
          .map((_, index) => (
            <SkeletonCard key={index} />
          ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {displayedMeals.map((meal) => (
        <div
          key={meal.idMeal}
          className="border rounded-lg p-4 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 transform relative"
        >
          <Link to={`/recipe/${meal.idMeal}`}>
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="rounded w-full h-40 object-cover mb-2"
            />
            <h3 className="text-lg font-semibold">{meal.strMeal}</h3>
            <p className="text-sm text-foreground">{meal.strCategory}</p>
          </Link>
          <IconButton
            icon={faBookmark}
            onClick={() => onToggleSave(meal)}
            className={`absolute bottom-4 right-4 shadow-none ${
              savedRecipes.some((savedMeal) => savedMeal.idMeal === meal.idMeal)
                ? "text-primary"
                : "text-input"
            } hover:scale-110 transition-transform duration-200 ease-in-out`}
          />
        </div>
      ))}
    </div>
  );
}
