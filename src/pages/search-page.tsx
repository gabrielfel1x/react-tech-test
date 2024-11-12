import { useEffect, useState } from "react";
import { useQueryState } from "nuqs";
import useDebounceValue from "../hooks/use-debounce";
import {
  getMealByName,
  getMealCategories,
  getRandomMeals,
  getMealsByCategory, // Importação adicionada
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

  // aplica meu hook de debounce nos termos de busca e nas categorias selecionadas
  const debouncedSearchTerm = useDebounceValue(searchTerm, 500);
  const debouncedSelectedCategories = useDebounceValue(selectedCategories, 500);

  useEffect(() => {
    // típica função assíncrona de busca de refeições com filtro por termo de busca e categoria
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
        let fetchedMeals: Meal[] = [];
        if (debouncedSelectedCategories.length) {
          // aqui busca as refeições de acordo com as categorias selecionadas
          const mealsByCategoryPromises = debouncedSelectedCategories.map(
            (category) => getMealsByCategory(category)
          );
          const mealsByCategory = await Promise.all(mealsByCategoryPromises);
          // aqui junta todos os resultados das categorias
          fetchedMeals = mealsByCategory.flat();
        } else {
          // e aqui realiza a busca por nome quando não há categoria selecionada
          fetchedMeals = await getMealByName(debouncedSearchTerm);
        }

        setMeals(fetchedMeals);
        if (!fetchedMeals.length) {
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
        {/* filtro de categorias que permite ao usuário selecionar categorias para filtrar as receitas.
          as categorias são passadas como prop para o componente `CategoryFilter`.
          `selectedCategories` controla as categorias selecionadas pelo user,
          e `onCategoryChange` altera as categorias selecionadas ao marcar/desmarcar os checkboxes */}
        <CategoryFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={(categoryId) =>
            setSelectedCategories(
              (prev) =>
                prev.includes(categoryId)
                  ? prev.filter((id) => id !== categoryId) // remove a categoria se já estiver selecionada
                  : [...prev, categoryId] // adiciona a categoria se não estiver selecionada
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
