import { useEffect, useState } from "react";
import {
  getMealByName,
  getMealsByCategory,
  getRandomMeals,
} from "../services/meal-service";
import { Meal } from "../types/meal";
import useDebounceValue from "./useDebounce";

interface UseFetchMealsOptions {
  searchTerm: string;
  selectedCategories: string[];
}

export default function useFetchMeals({
  searchTerm,
  selectedCategories,
}: UseFetchMealsOptions) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [suggestions, setSuggestions] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearchTerm = useDebounceValue(searchTerm, 500);
  const debouncedSelectedCategories = useDebounceValue(selectedCategories, 500);

  useEffect(() => {
    if (!debouncedSearchTerm && !debouncedSelectedCategories.length) {
      const fetchSuggestions = async () => {
        setLoading(true);
        try {
          const randomMeals = await getRandomMeals(12);
          setSuggestions(randomMeals);
          setMeals(randomMeals);
        } catch (err) {
          setError("Failed to fetch suggestions.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchSuggestions();
    }
  }, [debouncedSearchTerm, debouncedSelectedCategories]);

  useEffect(() => {
    if (!debouncedSearchTerm && !debouncedSelectedCategories.length) {
      setMeals([]);
      return;
    }

    const fetchMeals = async () => {
      setLoading(true);
      setError(null);
      try {
        let fetchedMeals: Meal[] = [];

        // buscando por categoria se houver categorias selecionadas
        if (debouncedSelectedCategories.length) {
          const mealsByCategoryPromises = debouncedSelectedCategories.map(
            (category) => getMealsByCategory(category)
          );

          // aqui to usando um Promise.all para carregar todas as categorias de forma simultanea
          const mealsByCategory = await Promise.all(mealsByCategoryPromises);
          fetchedMeals = mealsByCategory.flat();
        } else {
          fetchedMeals = await getMealByName(debouncedSearchTerm);
        }

        setMeals(fetchedMeals);
        if (!fetchedMeals.length)
          setError("No recipes matching your search were found.");
      } catch (err) {
        setError("No recipes matching your search were found.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [debouncedSearchTerm, debouncedSelectedCategories]);

  return { meals, suggestions, loading, error };
}
