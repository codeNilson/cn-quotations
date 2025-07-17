import { useState } from "react";


export default function Sidebar() {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <aside className={`w-80 bg-gray-50 z-50 fixed md:static transition duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className="border-b-2 p-3 border-gray-100">
                    <h1>Central Nordeste</h1>
                </div>
                <div>
                    <nav>
                        <ul className="flex flex-col gap-1 p-3">
                            <li className="text-sm text-gray-500">
                                <button className="btn w-full text-left hover:text-orange-600">
                                    <span>
                                        Dashboard
                                    </span>
                                </button>
                            </li>
                            <li className="text-sm text-gray-500">
                                <button className="btn w-full text-left hover:text-orange-600">
                                    Cotações
                                </button>
                            </li>
                            <li className="text-sm text-gray-500">
                                <button className="btn w-full text-left hover:text-orange-600">
                                    Peças
                                </button>
                            </li>
                            <li className="text-sm text-gray-500">
                                <button className="btn w-full text-left hover:text-orange-600">
                                    Máquinas
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    )
}