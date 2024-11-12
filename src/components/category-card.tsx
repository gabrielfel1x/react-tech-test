import { MealCategory } from "../types/meal";
import { useNavigate } from "react-router-dom";

export default function CategoryCard({ category }: { category: MealCategory }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category/${category.strCategory}`);
  };

  return (
    <div
      onClick={handleClick}
      className="p-4 border border-border bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      <img
        src={category.strCategoryThumb}
        alt={category.strCategory}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold text-foreground">
        {category.strCategory}
      </h3>
      <p className="text-sm text-muted-foreground">
        {category.strCategoryDescription.slice(0, 100)}...
      </p>
    </div>
  );
}
