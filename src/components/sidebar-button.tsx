import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ThemeContext from "../context/ThemeContext.tsx";
import { useContext } from "react";

interface SidebarButtonProps {
    onToggleSidebar: () => void;
}

export default function SidebarButton({ onToggleSidebar }: SidebarButtonProps) {

    const themeContext = useContext(ThemeContext)

    if (!themeContext) {
        throw new Error("SidebarContext is not provided");
    }

    const { theme } = themeContext

    return (
        <button className="btn lg:hidden w-auto" onClick={onToggleSidebar}>
            <FontAwesomeIcon icon={faBars} size="lg" style={{ color: theme === 'dark' ? 'white' : 'black' }} />
        </button>
    )
}