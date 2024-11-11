import { faBowlFood } from "@fortawesome/free-solid-svg-icons/faBowlFood";
import { Link } from "react-router-dom";
import IconButton from "./button";

export default function Header() {
  return (
    <header>
      <div className="container flex flex-row items-center justify-between py-4 mx-auto border-b">
        <Link to="/" className="font-bold text-2xl">
          Culinary Recipes
        </Link>

        <nav className="flex gap-2 *:rounded-md *:font-semibold items-center">
          <IconButton icon={faBowlFood} className="size-8" />
        </nav>
      </div>
    </header>
  );
}
