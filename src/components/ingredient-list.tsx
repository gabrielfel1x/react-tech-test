import { Meal } from "../types/meal";

interface IngredientListProps {
  meal: Meal;
}

const IngredientList: React.FC<IngredientListProps> = ({ meal }) => {
  return (
    <ul className="list-disc list-inside text-primary">
      {Object.keys(meal)
        .filter(
          (key) => key.includes("strIngredient") && meal[key as keyof Meal]
        )
        .map((key, index) => {
          const ingredient = meal[key as keyof Meal];
          const measure =
            meal[`strMeasure${key.replace("strIngredient", "")}` as keyof Meal];
          return (
            <li key={index} className="mb-1">
              <span className="font-semibold">{ingredient}</span> -
              <span>{measure}</span>
            </li>
          );
        })}
    </ul>
  );
};

export default IngredientList;
