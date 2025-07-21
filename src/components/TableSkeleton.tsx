export default function TableSkeleton() {
    const rows = 5 // quantas linhas fake

    return (
        <table className="table-auto border border-gray-200 w-full bg-white dark:bg-neutral-800 rounded-lg overflow-hidden">
            <thead>
                <tr>
                    <th className="p-3">Peça</th>
                    <th className="p-3">Referência</th>
                    <th className="p-3">Fornecedor</th>
                    <th className="p-3">Colaborador</th>
                    <th className="p-3">Criado em</th>
                    <th className="p-3">Preço</th>
                    <th className="p-3">Ações</th>
                </tr>
            </thead>
            <tbody>
                {Array.from({ length: rows }).map((_, i) => (
                    <tr
                        key={i}
                        className="odd:bg-gray-50 dark:odd:bg-neutral-700 even:bg-white dark:even:bg-neutral-800 text-center"
                    >
                        {/* Coluna: Peça */}
                        <td className="p-3">
                            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mx-auto" />
                        </td>

                        {/* Coluna: Referência */}
                        <td className="p-3">
                            <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mx-auto" />
                        </td>

                        {/* Coluna: Fornecedor */}
                        <td className="p-3">
                            <div className="h-4 w-28 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mx-auto" />
                        </td>

                        {/* Coluna: Colaborador */}
                        <td className="p-3">
                            <div className="h-4 w-28 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mx-auto" />
                        </td>

                        {/* Coluna: Criado em */}
                        <td className="p-3">
                            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mx-auto" />
                        </td>

                        {/* Coluna: Preço */}
                        <td className="p-3">
                            <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mx-auto" />
                        </td>

                        {/* Coluna: Ações */}
                        <td className="p-3">
                            <div className="flex flex-col items-center gap-2">
                                <div className="h-6 w-16 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
                                <div className="h-6 w-16 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
