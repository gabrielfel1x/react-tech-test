import { useEffect, useState } from "react";
import { getRandomMeal } from "../services/meal-service";
import { Meal } from "../types/meal";
import { Link } from "react-router-dom";

export function RecipeGridLayout() {
  const [randomMeals, setRandomMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomMeals = async () => {
      setLoading(true);
      const meals: Meal[] = [];

      for (let i = 0; i < 12; i++) {
        const randomMeal = await getRandomMeal();
        if (randomMeal) {
          meals.push(randomMeal);
        }
      }
      setRandomMeals(meals);
      setLoading(false);
    };

    fetchRandomMeals();
  }, []);

  if (loading) {
    return <div>Carregando receitas aleatórias...</div>;
  }

  return (
    <div className="space-y-6 py-12">
      <h2 className="font-bold text-xl">Receitas Aleatórias</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {randomMeals.map((meal) => (
          <Link key={meal.idMeal} to={`/recipe/${meal.idMeal}`}>
            <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
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
