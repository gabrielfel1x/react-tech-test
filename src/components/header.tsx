import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons/faBowlFood";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div className="container flex flex-row items-center justify-between py-4 mx-auto border-b">
        <Link to="/" className="font-bold text-2xl">
          Receitas
        </Link>

        <nav className="flex gap-2 *:rounded-md *:font-semibold items-center">
          <button className="flex items-center">
            <FontAwesomeIcon icon={faBowlFood} className="size-8" />
          </button>
        </nav>
      </div>
    </header>
  );
}
