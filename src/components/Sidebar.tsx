import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SidebarContext from "../context/SidebarContext.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCogs, faTableColumns, faTruck } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";


export default function Sidebar() {
    const sidebarContext = useContext(SidebarContext)

    if (!sidebarContext) {
        throw new Error("SidebarContext is not provided");
    }

    const { isOpen } = sidebarContext;

    // Array com os itens do menu
    const menuItems = [
        { icon: faTableColumns, label: "Dashboard", path: "/" },
        { icon: faCogs, label: "Peças", path: "/parts" },
        { icon: faTruck, label: "Máquinas", path: "/machines" }
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
                <div className="border-b-2 p-3 border-gray-100 dark:border-neutral-700">
                    <img src={logo} alt="central nordeste logo" />
                </div>
                <div>
                    <nav>
                        <ul className="flex flex-col gap-1 p-3">
                            {menuItems.map((item, index) => (
                                <li key={index} className="text-lg md:text-sm text-gray-500">
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `btn w-full flex items-center gap-2 text-left transition-colors ${
                                                isActive
                                                    ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                                                    : 'dark:text-white hover:text-orange-600'
                                            }`
                                        }
                                        onClick={() => {
                                            // Fecha o sidebar no mobile após navegar
                                            if (window.innerWidth < 1024) {
                                                sidebarContext.toggleSidebar();
                                            }
                                        }}
                                    >
                                        <FontAwesomeIcon icon={item.icon} />
                                        <span>{item.label}</span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    )
}