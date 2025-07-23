import { useContext, useEffect } from "react";
import SidebarContext from "../context/SidebarContext.tsx";
import { useNavigation } from "../hooks/useNavigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCogs, faTableColumns, faTruck } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";
import type { Page } from "../context/NavigationContext";


export default function Sidebar() {
    const sidebarContext = useContext(SidebarContext)
    const { currentPage, setCurrentPage } = useNavigation();

    if (!sidebarContext) {
        throw new Error("SidebarContext is not provided");
    }

    const { isOpen } = sidebarContext;

    // Array com os itens do menu
    const menuItems: { icon: typeof faTableColumns; label: string; page: Page }[] = [
        { icon: faTableColumns, label: "Dashboard", page: "dashboard" },
        { icon: faCogs, label: "Peças", page: "parts" },
        { icon: faTruck, label: "Máquinas", page: "machines" }
    ];

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <>
            {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={sidebarContext.toggleSidebar}></div>}
            <aside className={`w-65 min-h-screen bg-gray-50 dark:bg-neutral-800 z-50 fixed lg:static transition duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                <div className="border-b-2 p-3 border-gray-100">
                    <img src={logo} alt="central nordeste logo" />
                </div>
                <div>
                    <nav>
                        <ul className="flex flex-col gap-1 p-3">
                            {menuItems.map((item, index) => (
                                <li key={index} className="text-lg md:text-sm text-gray-500">
                                    <button
                                        onClick={() => setCurrentPage(item.page)}
                                        className={`btn w-full flex items-center gap-2 text-left transition-colors ${
                                            currentPage === item.page
                                                ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                                                : 'dark:text-white hover:text-orange-600'
                                        }`}
                                    >
                                        <FontAwesomeIcon icon={item.icon} />
                                        <span>{item.label}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    )
}