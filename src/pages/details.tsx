import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMealDetailsById } from "../services/meal-service";
import { Meal } from "../types/meal";
import ExpandableCard from "../components/expandable-card";
import IngredientList from "../components/ingredient-list";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ClipLoaderComponent from "../components/loaders/clip";

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMealDetails = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const mealDetails = await getMealDetailsById(id);
        setMeal(mealDetails);
      } catch (error) {
        console.error("Erro ao buscar detalhes da receita:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMealDetails();
  }, [id]);

  if (loading) {
    return <ClipLoaderComponent color="black" size={40} />;
  }

  if (!meal) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-destructive font-semibold text-xl">
          Receita não encontrada.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 md:p-12 bg-card shadow-xl rounded-lg">
      <button
        onClick={() => window.history.back()}
        className="mb-4 bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-destructive-foreground transition flex items-center gap-2"
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Voltar
      </button>
      <div
        className="relative bg-cover bg-center rounded-lg overflow-hidden h-72 md:h-96"
        style={{ backgroundImage: `url(${meal.strMealThumb})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg text-center">
            {meal.strMeal}
          </h1>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mt-12">
        <div className="flex-1">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>
        <div className="flex-1">
          <div className="mb-4">
            <p className="text-lg font-semibold text-primary mb-2">
              Categoria: <span className="font-normal">{meal.strCategory}</span>
            </p>
            <p className="text-lg font-semibold text-primary mb-2">
              Área: <span className="font-normal">{meal.strArea}</span>
            </p>
          </div>

          <ExpandableCard
            title="Instruções de preparo"
            content={meal.strInstructions}
          />
          <ExpandableCard
            title="Ingredientes"
            content={<IngredientList meal={meal} />}
          />
        </div>
      </div>
    </div>
  );
}
