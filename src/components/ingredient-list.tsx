// lista de ingredientes da receita, com respectivas medidas
import { Meal } from "../types/meal";

interface IngredientListProps {
  meal: Meal;
}

const IngredientList: React.FC<IngredientListProps> = ({ meal }) => {
  return (
    <ul className="list-disc list-inside text-primary">
      {Object.keys(meal)
        // filtra para pegar apenas chaves de ingredientes que tenham valor (ou seja, não vazias)
        .filter(
          (key) => key.includes("strIngredient") && meal[key as keyof Meal]
        )
        .map((key, index) => {
          // extração do nome do ingrediente
          const ingredient = meal[key as keyof Meal];
          // aqui obtém a medida correspondente ao ingrediente (ex: "strMeasure1" para "strIngredient1")
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
