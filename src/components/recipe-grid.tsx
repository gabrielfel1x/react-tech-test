import { useEffect, useState } from "react";
import { getRandomMeals } from "../services/meal-service";
import { Meal } from "../types/meal";
import { Link } from "react-router-dom";
import { SkeletonCard } from "./loaders/skeleton-card";

export function RecipeGrid() {
  const [randomMeals, setRandomMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomMeals = async () => {
      setLoading(true);
      try {
        const meals = await getRandomMeals(12);
        setRandomMeals(meals);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomMeals();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 py-12">
        <h2 className="font-bold text-xl">Receitas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-12">
      <h2 className="font-bold text-xl">Sugestões para você:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {randomMeals.map((meal) => (
          <Link key={meal.idMeal} to={`/recipe/${meal.idMeal}`}>
            <div className="border rounded-lg p-4 shadow-md hover:shadow-xl transition-shadow duration-300 hover:scale-105 transform">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="rounded w-full h-40 object-cover mb-2"
              />
              <h3 className="text-lg font-semibold">{meal.strMeal}</h3>
              <p className="text-sm text-gray-500">{meal.strCategory}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
