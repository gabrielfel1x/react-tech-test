import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./theme-toggle";

export default function Header() {
  const location = useLocation();

  return (
    <header>
      <div className="container flex flex-row items-center justify-between py-4 mx-auto border-b">
        <h1 className="font-extrabold text-md sm:text-2xl">Culinary Recipes</h1>

        <nav className="flex gap-6 items-center">
          <ThemeToggle />
          <Link
            to="/"
            className={`text-md font-semibold transition-all duration-200 ease-in-out ${
              location.pathname === "/" ? "text-primary" : "text-foreground"
            } hover:opacity-80`}
          >
            Home
          </Link>
          <Link
            to="/categories"
            className={`text-md font-semibold transition-all duration-200 ease-in-out ${
              location.pathname === "/categories"
                ? "text-primary"
                : "text-foreground"
            } hover:opacity-80`}
          >
            Categories
          </Link>
          <Link
            to="/favorites"
            className={`flex items-center gap-2 p-2 rounded-sm text-md font-semibold transition-all duration-200 ease-in-out ${
              location.pathname === "/favorites"
                ? "text-primary"
                : "text-foreground"
            } hover:opacity-80`}
          >
            Favorites
          </Link>
        </nav>
      </div>
    </header>
  );
}
