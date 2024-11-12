import { useEffect, useState } from "react";
import { useQueryState } from "nuqs";
import useDebounceValue from "../hooks/use-debounce";
import {
  getMealByName,
  getMealCategories,
  getRandomMeals,
} from "../services/meal-service";
import { Meal, MealCategory } from "../types/meal";
import SearchInput from "../components/search-input";
import CategoryFilter from "../components/category-filter";
import MealList from "../components/meal-list";
import ErrorMessage from "../components/error-message";
import { useSavedRecipes } from "../hooks/use-save";

export default function SearchPage() {
  const { savedRecipes, saveRecipe, removeRecipe } = useSavedRecipes();
  const [categories, setCategories] = useState<MealCategory[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [suggestions, setSuggestions] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useQueryState("search", {
    defaultValue: "",
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const debouncedSearchTerm = useDebounceValue(searchTerm, 500);
  const debouncedSelectedCategories = useDebounceValue(selectedCategories, 500);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getMealCategories();
        setCategories(fetchedCategories);
      } catch (err) {
        setError("Failed to fetch categories.");
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!debouncedSearchTerm && !debouncedSelectedCategories.length) {
      setLoading(true);
      const fetchSuggestions = async () => {
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
        const fetchedMeals = await getMealByName(debouncedSearchTerm);
        const filteredMeals = debouncedSelectedCategories.length
          ? fetchedMeals.filter((meal) =>
              debouncedSelectedCategories.includes(meal.strCategory)
            )
          : fetchedMeals;

        setMeals(filteredMeals);
        if (!filteredMeals.length) {
          setError("No recipes matching your search were found.");
        }
      } catch (err) {
        setError("No recipes matching your search were found.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [debouncedSearchTerm, debouncedSelectedCategories]);

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
    <section className="py-12">
      <h1 className="text-4xl font-bold text-center">
        Discover the best culinary recipes
      </h1>
      <p className="text-center text-muted-foreground">For your taste</p>
      <div className="container max-w-2xl mx-auto mt-4">
        <SearchInput searchTerm={searchTerm} onChange={setSearchTerm} />
        <CategoryFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={(categoryId) =>
            setSelectedCategories((prev) =>
              prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId)
                : [...prev, categoryId]
            )
          }
        />
      </div>
      {error && <ErrorMessage message={error} />}
      <MealList
        meals={meals}
        suggestions={suggestions}
        savedRecipes={savedRecipes}
        loading={loading}
        onToggleSave={handleToggleSave}
      />
    </section>
  );
}
