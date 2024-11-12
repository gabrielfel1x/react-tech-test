import { SkeletonCard } from "../components/loaders/skeleton-card";
import CategoryCard from "../components/category-card";
import useFetchCategories from "../hooks/use-fetch-categories";

export default function CategoriesPage() {
  const { categories, loading, error } = useFetchCategories();

  return (
    <section className="py-12 bg-background">
      <h1 className="text-4xl font-bold text-center text-foreground">
        Explore Categories
      </h1>
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
            <CategoryCard key={category.idCategory} category={category} />
          ))}
        </div>
      )}
    </section>
  );
}
