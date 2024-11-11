import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons/faBowlFood";

export default function Header() {
  return (
    <header>
      <div className="container flex flex-row items-center justify-between py-4 mx-auto border-b">
        <a href={"/"} className="font-bold text-2xl">
          Receitas
        </a>
        <a
          href={"http://github.com/gabrielfel1x"}
          target="_blank"
          className="absolute left-2/4 invisible sm:visible"
        >
          <img src="github.svg" alt="github" width={34} height={34} />
        </a>
        <nav className="flex gap-2 *:rounded-md *:font-semibold items-center">
          <button className="flex items-center">
            <FontAwesomeIcon icon={faBowlFood} className="size-8" />
          </button>
        </nav>
      </div>
    </header>
  );
}
