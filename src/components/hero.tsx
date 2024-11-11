import { useState, useEffect } from "react";
import useDebounceValue from "../hooks/use-debounce";
import { getMealByName, getMealsByCategory } from "../services/meal-service";
import { Meal } from "../types/meal";
import ClipLoaderComponent from "./loaders/clip";

export default function Hero() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState<"name" | "category">("name");
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchCompleted, setSearchCompleted] = useState(false);

  const debouncedSearchTerm = useDebounceValue(searchTerm, 500);

  useEffect(() => {
    if (!debouncedSearchTerm) return;

    const fetchMeals = async () => {
      setLoading(true);
      setError(null);
      setSearchCompleted(false);

      try {
        const fetchedMeals =
          searchType === "name"
            ? await getMealByName(debouncedSearchTerm)
            : await getMealsByCategory(debouncedSearchTerm);

        if (fetchedMeals.length === 0) {
          setMeals([]);
        } else {
          setMeals(fetchedMeals);
        }
      } catch (err) {
        setError("Nenhuma receita referente à sua pesquisa foi encontrada");
        console.log(err);
      } finally {
        setLoading(false);
        setSearchCompleted(true);
      }
    };

    fetchMeals();
  }, [debouncedSearchTerm, searchType]);

  return (
    <section className="py-12">
      <h1 className="text-4xl font-bold text-center">
        Descubra as melhores <br />
        receitas culinárias
      </h1>
      <p className="text-center text-muted-foreground">Para o seu paladar</p>
      <form className="container flex flex-col sm:flex-row gap-2 mt-4 max-w-2xl mx-auto">
        <select
          className="border border-input rounded-md p-2"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value as "name" | "category")}
        >
          <option value="name">Buscar por Nome</option>
          <option value="category">Buscar por Categoria</option>
        </select>
        <input
          type="search"
          className="border border-input w-full py-2 px-3 rounded-md"
          placeholder="Digite para buscar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      {loading ? (
        <div className="flex justify-center items-center py-6">
          <ClipLoaderComponent color="black" size={40} />
        </div>
      ) : error ? (
        <p className="text-destructive text-center mt-4">{error}</p>
      ) : searchCompleted && meals.length === 0 ? (
        <p className="text-center text-muted">Nenhuma receita encontrada.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {meals.map((meal) => (
            <div key={meal.idMeal} className="border rounded-lg p-4 shadow-md">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="rounded w-full h-40 object-cover mb-2"
              />
              <h3 className="text-lg font-semibold">{meal.strMeal}</h3>
              <p className="text-sm text-muted">{meal.strCategory}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
