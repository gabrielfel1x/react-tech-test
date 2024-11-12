import { useEffect, useState } from "react";
import { getMealsByCategory } from "../services/meal-service";
import { Meal } from "../types/meal";

export default function useCategoryMeals(categoryName: string) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      try {
        if (categoryName) {
          const fetchedMeals = await getMealsByCategory(categoryName);
          setMeals(fetchedMeals);
        }
      } catch (err) {
        setError("Failed to fetch meals for this category.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [categoryName]);

  return { meals, loading, error };
}
