import { useContext } from "react";
import SidebarContext from "../context/SidebarContext.tsx";
import SidebarButton from "../components/SidebarButton.tsx"
import ToggleThemeButton from "../components/ToggleThemeButton.tsx";
import LogoutButton from "../components/LogoutButton.tsx";

export default function MachinesPage() {
    const sidebarContext = useContext(SidebarContext)

    if (!sidebarContext) {
        throw new Error("Context is not provided");
    }

    const { toggleSidebar } = sidebarContext;

    return (
        <div className="px-5 py-2">
            <div className="flex justify-between items-center py-4">
                <SidebarButton onToggleSidebar={toggleSidebar} />
                <h2 className="text-2xl font-bold tracking-tight flex-1">Máquinas</h2>
                <div className="flex items-center gap-3">
                    <LogoutButton />
                    <ToggleThemeButton />
                </div>
            </div>
            <div className="flex items-center justify-center min-h-[400px]">
                <p className="text-gray-500 dark:text-gray-400">Página em desenvolvimento</p>
            </div>
        </div>
    );
}
