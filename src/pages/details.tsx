import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMealDetailsById } from "../services/meal-service";
import { Meal } from "../types/meal";
import ExpandableCard from "../components/expandable-card";
import IngredientList from "../components/ingredient-list";
import { faArrowLeft, faBookmark } from "@fortawesome/free-solid-svg-icons";
import ClipLoaderComponent from "../components/loaders/clip";
import IconButton from "../components/button";
import { useSavedRecipes } from "../hooks/use-save";

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const { savedRecipes, saveRecipe, removeRecipe } = useSavedRecipes();

  useEffect(() => {
    const fetchMealDetails = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const mealDetails = await getMealDetailsById(id);
        setMeal(mealDetails);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMealDetails();
  }, [id]);

  if (loading) {
    return <ClipLoaderComponent color="var(--primary-foreground)" size={40} />;
  }

  if (!meal) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-destructive font-semibold text-xl">
          Recipe not found.
        </div>
      </div>
    );
  }

  const isRecipeSaved = savedRecipes.some(
    (savedMeal) => savedMeal.idMeal === meal.idMeal
  );

  const handleToggleSave = () => {
    if (isRecipeSaved) {
      removeRecipe(meal.idMeal);
    } else {
      saveRecipe(meal);
    }
  };

  const instructionsAsSteps = meal.strInstructions
    ? meal.strInstructions.split(". ").map((step) => `${step}`)
    : [];

  return (
    <div className="min-h-screen bg-background pb-12">
      <div className="relative h-[40vh] md:h-[50vh]">
        <IconButton
          icon={faArrowLeft}
          onClick={() => window.history.back()}
          className="absolute top-4 left-4 z-10 bg-white hover:bg-card hover:scale-110 transition-transform duration-200 ease-in-out"
          iconClassName="text-primary"
        />
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <h1 className="absolute bottom-6 left-6 text-4xl font-bold text-white">
          {meal.strMeal}
        </h1>
        <IconButton
          icon={faBookmark}
          onClick={handleToggleSave}
          className={`absolute bottom-6 right-6 text-4xl bg-white shadow-md ${
            isRecipeSaved ? "text-primary" : "text-muted-foreground"
          } hover:scale-110 transition-transform duration-200 ease-in-out`}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-4">
        <div className="bg-card rounded-xl shadow-sm p-6 md:p-8">
          <div className="flex flex-wrap gap-6 mb-8 text-secondary">
            <div className="flex items-center gap-2 text-foreground">
              <span className="font-semibold text-primary">Category:</span>
              {meal.strCategory}
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <span className="font-semibold text-primary">Area:</span>
              {meal.strArea}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Ingredients
            </h2>
            <IngredientList meal={meal} />
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Instructions
            </h2>
            <ExpandableCard
              title="Preparation Instructions"
              content={
                <ul className="space-y-2">
                  {instructionsAsSteps.map((step, index) => (
                    <li key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-muted text-primary rounded-full flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                      <p className="text-foreground leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ul>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
