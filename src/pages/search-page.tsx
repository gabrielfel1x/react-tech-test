import { useState, useEffect } from "react";
import useDebounceValue from "../hooks/use-debounce";
import {
  getMealByName,
  getMealCategories,
  getRandomMeals,
} from "../services/meal-service";
import { Meal, MealCategory } from "../types/meal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faSearch,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useSavedRecipes } from "../hooks/use-save";
import IconButton from "../components/button";
import { Link } from "react-router-dom";
import { SkeletonCard } from "../components/loaders/skeleton-card";

export default function SearchPage() {
  const { savedRecipes, saveRecipe, removeRecipe } = useSavedRecipes();
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<MealCategory[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [suggestions, setSuggestions] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchCompleted, setSearchCompleted] = useState(false);

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
    const fetchSuggestions = async () => {
      if (!debouncedSearchTerm && !debouncedSelectedCategories.length) {
        setLoading(true);
        try {
          const randomMeals = await getRandomMeals(12);
          setSuggestions(randomMeals);
          setMeals(randomMeals); // Define as sugestões como refeições iniciais
        } catch (err) {
          setError("Failed to fetch suggestions.");
          console.log(err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchSuggestions();
  }, [debouncedSearchTerm, debouncedSelectedCategories]);

  useEffect(() => {
    if (!debouncedSearchTerm && !debouncedSelectedCategories.length) {
      setMeals([]);
      return;
    }

    const fetchMeals = async () => {
      setLoading(true);
      setError(null);
      setSearchCompleted(false);

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
        setSearchCompleted(true);
      }
    };

    fetchMeals();
  }, [debouncedSearchTerm, debouncedSelectedCategories]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <section className="py-12">
      <h1 className="text-4xl font-bold text-center">
        Discover the best culinary recipes
      </h1>
      <p className="text-center text-muted-foreground">For your taste</p>
      <div className="container max-w-2xl mx-auto mt-4">
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search recipes by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-12 rounded-lg border border-input focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-border"
          />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm font-medium text-foreground mb-3">
            Search/Filter by category:
          </p>
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <label
                key={category.idCategory}
                className="flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.strCategory)}
                  onChange={() => handleCategoryChange(category.strCategory)}
                  className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500 border-gray-300"
                />
                <span className="text-sm text-foreground">
                  {category.strCategory}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {Array(8)
            .fill(null)
            .map((_, index) => (
              <SkeletonCard key={index} />
            ))}
        </div>
      ) : error ? (
        <div className="text-yellow-500 text-center mt-4 flex items-center justify-center gap-2">
          <FontAwesomeIcon
            icon={faExclamationCircle}
            className="text-yellow-500"
          />
          <p>{error}</p>
        </div>
      ) : searchCompleted && meals.length === 0 ? (
        <div className="text-yellow-500 text-center mt-4 flex items-center justify-center gap-2">
          <FontAwesomeIcon
            icon={faExclamationCircle}
            className="text-yellow-500"
          />
          <p>No recipes found for the selected category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {(meals.length ? meals : suggestions).map((meal) => (
            <div
              key={meal.idMeal}
              className="border rounded-lg p-4 shadow-md hover:shadow-xl transition-shadow duration-300 hover:scale-105 transform relative"
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
                onClick={() =>
                  savedRecipes.some(
                    (savedMeal) => savedMeal.idMeal === meal.idMeal
                  )
                    ? removeRecipe(meal.idMeal)
                    : saveRecipe(meal)
                }
                className={`absolute bottom-4 right-4 ${
                  savedRecipes.some(
                    (savedMeal) => savedMeal.idMeal === meal.idMeal
                  )
                    ? "text-primary"
                    : "text-input"
                }`}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
