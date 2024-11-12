import { useState } from "react";
import { useQueryState } from "nuqs";
import useFetchCategories from "../hooks/useFetchCategories";
import useFetchMeals from "../hooks/useFetchMeals";
import SearchInput from "../components/search-input";
import CategoryFilter from "../components/category-filter";
import MealList from "../components/meal-list";
import ErrorMessage from "../components/error-message";
import { useSavedRecipes } from "../hooks/useSave";
import { Meal } from "../types/meal";

export default function SearchPage() {
  const { savedRecipes, saveRecipe, removeRecipe } = useSavedRecipes();
  const { categories, error: categoryError } = useFetchCategories();

  // state do nuqs para o termo de busca, sincronizado na URL
  const [searchTerm, setSearchTerm] = useQueryState("search", {
    defaultValue: "",
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // aqui busca as receitas com base nos filtros de busca e categorias selecionadas
  const { meals, suggestions, loading, error } = useFetchMeals({
    searchTerm,
    selectedCategories,
  });

  const handleToggleSave = (meal: Meal) => {
    // verifica se a receita já foi salva, usando o `idMeal` como identificador único
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
            // atualiza as categorias selecionadas, adicionando/removendo o `categoryId`
            setSelectedCategories((prev) =>
              prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId)
                : [...prev, categoryId]
            )
          }
        />
      </div>
      {(error || categoryError) && (
        <ErrorMessage message={error || (categoryError as never)} />
      )}
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
