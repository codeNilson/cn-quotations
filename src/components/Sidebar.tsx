import { useContext, useEffect } from "react";
import SidebarContext from "../context/SidebarContext.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCogs, faFile, faTableColumns, faTruck } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";


export default function Sidebar() {
    const context = useContext(SidebarContext)

    if (!context) {
        throw new Error("SidebarContext is not provided");
    }

    const { isOpen } = context;

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
            {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={context.toggleSidebar}></div>}
            <aside className={`w-65 h-screen bg-gray-50 dark:bg-neutral-800 z-50 fixed lg:static transition duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                <div className="border-b-2 p-3 border-gray-100">
                    <img src={logo} alt="central nordeste logo" />
                </div>
                <div>
                    <nav>
                        <ul className="flex flex-col gap-1 p-3">
                            {menuItems.map((item, index) => (
                                <li key={index} className="text-lg md:text-sm text-gray-500">
                                    <button
                                        className="btn w-full flex items-center dark:text-white gap-2 text-left hover:text-orange-600"
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