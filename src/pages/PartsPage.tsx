import { useContext } from "react";
import PartsTable from '../components/PartsTable';
import SidebarContext from "../context/SidebarContext.tsx";
import SidebarButton from "../components/SidebarButton.tsx"
import ToggleThemeButton from "../components/ToggleThemeButton.tsx";
import LogoutButton from "../components/LogoutButton.tsx";

export default function PartsPage() {
    const sidebarContext = useContext(SidebarContext)

    if (!sidebarContext) {
        throw new Error("Context is not provided");
    }

    const { toggleSidebar } = sidebarContext;

    return (
        <div className="px-5 py-2">
            <div className="flex items-center py-4 gap-4">
                <SidebarButton onToggleSidebar={toggleSidebar} />
                <div className="flex-1">
                    <PartsTable />
                </div>
                <div className="flex items-center gap-3">
                    <LogoutButton />
                    <ToggleThemeButton />
                </div>
            </div>
        </div>
    );
}
