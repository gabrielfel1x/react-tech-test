// componente pra listar refeições com sugestão de receitas, caso nenhuma seja encontrada
import { Meal } from "../types/meal";
import IconButton from "./button";
import { Link } from "react-router-dom";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { SkeletonCard } from "./loaders/skeleton-card";

interface MealListProps {
  meals: Meal[];
  suggestions?: Meal[];
  loading?: boolean;
  savedRecipes: Meal[];
  onToggleSave: (meal: Meal) => void;
}

export default function MealList({
  meals = [],
  suggestions = [],
  savedRecipes = [],
  loading,
  onToggleSave,
}: MealListProps) {
  // aqui determina as refeições a serem exibidas, priorizando 'meals' caso contenha dados,
  // senão, exibe as 'suggestions' passadas como fallback.
  const displayedMeals = (meals && meals.length ? meals : suggestions) || [];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {/* renderizando meu componente skeletoncard enquanto carrega */}
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
      {/* itera sobre 'displayedMeals', renderizando cada uma como um cartão */}
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
                ? "text-primary" // icone marcado se a receita estiver salva
                : "text-muted-foreground"
            } hover:scale-110 transition-transform duration-200 ease-in-out`}
          />
        </div>
      ))}
    </div>
  );
}
