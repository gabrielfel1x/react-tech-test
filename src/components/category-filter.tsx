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
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <p className="text-sm font-medium text-foreground mb-3">
        Search/Filter by category:
      </p>
      <div className="flex flex-wrap gap-4">
        {categories.map((category) => (
          <label key={category.idCategory} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category.strCategory)}
              onChange={() => onCategoryChange(category.strCategory)}
              className="w-4 h-4 text-primary rounded focus:ring-primary border-secondary"
            />
            <span className="text-sm text-foreground">
              {category.strCategory}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
