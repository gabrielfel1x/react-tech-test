import { MealCategory } from "../types/meal";

type CategoryFilterProps = {
  categories: MealCategory[];
  selectedCategories: string[];
  onCategoryChange: (categoryId: string) => void;
};

export default function CategoryFilter({
  categories,
  selectedCategories,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="bg-card p-4 rounded-lg shadow-sm">
      <p className="text-sm font-medium text-card-foreground mb-3">
        Search/Filter by category:
      </p>
      <div className="flex flex-wrap gap-4">
        {categories.map((category) => (
          <label key={category.idCategory} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category.strCategory)}
              onChange={() => onCategoryChange(category.strCategory)}
              className="appearance-none w-5 h-5 border-2 border-border rounded-sm bg-transparent checked:bg-primary checked:border-primary focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
            <span className="text-sm text-card-foreground">
              {category.strCategory}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
