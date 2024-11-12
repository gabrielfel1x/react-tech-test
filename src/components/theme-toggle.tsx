import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "../contexts/theme-context";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const ThemeToggle: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex items-center justify-center rounded-md"
    >
      {theme === "dark" ? (
        <FontAwesomeIcon
          icon={faSun}
          className="text-white hover:text-primary transition-all duration-200 ease-in-out"
          height="20"
        />
      ) : (
        <FontAwesomeIcon
          icon={faMoon}
          className="text-foreground hover:text-primary transition-all duration-200 ease-in-out"
          height="20"
        />
      )}
    </button>
  );
};

export default ThemeToggle;
