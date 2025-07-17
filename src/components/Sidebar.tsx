export default function Sidebar() {
    return (
        <aside className="w-64 bg-gray-50">
            <div className="border-b-2 p-3 border-gray-100">
                <h1>Central Nordeste</h1>
            </div>
            <div>
                <nav>
                    <ul className="flex flex-col gap-3 p-3">
                        <li className="text-sm text-gray-500">
                            <button className="btn w-full text-left hover:text-orange-600">
                                Dashboard
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
    )
}