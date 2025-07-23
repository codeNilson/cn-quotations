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
        <>
            {/* Header com botões */}
            <div className="flex items-center px-5 py-2">
                <SidebarButton onToggleSidebar={toggleSidebar} />
                <h2 className="text-2xl font-bold tracking-tight flex-1">Peças</h2>
                <div className="flex items-center gap-3">
                    <LogoutButton />
                    <ToggleThemeButton />
                </div>
            </div>
            
            {/* Conteúdo principal */}
            <div className="px-5 py-2">
                <PartsTable />
            </div>
        </>
    );
}
