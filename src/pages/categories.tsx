import { useEffect, useState } from "react";
import { getMealCategories } from "../services/meal-service";
import { MealCategory } from "../types/meal";
import { SkeletonCard } from "../components/loaders/skeleton-card";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<MealCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const fetchedCategories = await getMealCategories();
        setCategories(fetchedCategories);
      } catch (err) {
        setError("Failed to fetch categories.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="py-12">
      <h1 className="text-4xl font-bold text-center">Explore Categories</h1>
      <p className="text-center text-muted-foreground">
        Discover your favorite cuisine
      </p>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {Array(8)
            .fill(null)
            .map((_, index) => (
              <SkeletonCard key={index} />
            ))}
        </div>
      ) : error ? (
        <p className="text-destructive text-center mt-4">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {categories.map((category) => (
            <div
              key={category.idCategory}
              className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={category.strCategoryThumb}
                alt={category.strCategory}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold">{category.strCategory}</h3>
              <p className="text-sm text-muted">
                {category.strCategoryDescription.slice(0, 100)}...
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
