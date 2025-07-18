import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

export default function ThemeButton() {

    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error("Context is not provided");
    }

    const { theme, toggleTheme } = themeContext;

    return (
        <button>
            <FontAwesomeIcon
                icon={theme == "dark" ? faMoon : faSun}
                className={`text-2xl ${theme === 'light' ? 'text-yellow-500' : null}`}
                onClick={toggleTheme}
            />
        </button>
    )
}