import { useState, useEffect } from "react";
import { getMealCategories } from "../services/meal-service";
import { MealCategory } from "../types/meal";

export default function useFetchCategories() {
  const [categories, setCategories] = useState<MealCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const fetchedCategories = await getMealCategories();
        setCategories(fetchedCategories);
      } catch (err) {
        setError("Failed to fetch categories.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return { categories, loading, error };
}
