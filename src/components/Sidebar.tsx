import { useContext, useEffect } from "react";
import SidebarContext from "../context/SidebarContext.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCogs, faFile, faTableColumns, faTruck } from "@fortawesome/free-solid-svg-icons";



export default function Sidebar() {
    const context = useContext(SidebarContext)

    if (!context) {
        throw new Error("SidebarContext is not provided");
    }

    const { isOpen, toggle } = context;

    // Array com os itens do menu
    const menuItems = [
        { icon: faTableColumns, label: "Dashboard" },
        { icon: faFile, label: "Cotações" },
        { icon: faCogs, label: "Peças" },
        { icon: faTruck, label: "Máquinas" }
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
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    onClick={toggle}
                />
            )}
            <aside className={`w-65 h-screen bg-gray-50 z-50 fixed lg:static transition duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                <div className="border-b-2 p-3 border-gray-100">
                    <img src="src/assets/logo.png" alt="" />
                </div>
                <div>
                    <nav>
                        <ul className="flex flex-col gap-1 p-3">
                            {menuItems.map((item, index) => (
                                <li key={index} className="text-lg md:text-sm text-gray-500">
                                    <button
                                        className="btn w-full flex items-center gap-2 text-left hover:text-orange-600"
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