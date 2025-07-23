import { useQuotations } from '../hooks/useQuotation';
import { usePagination } from '../hooks/usePagination';
import { useTableFilters } from '../hooks/useTableFilters';
import { formatCurrency } from '../utils/formatters';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import ItemsPerPageSelector from './ItemsPerPageSelector';
import Pagination from './Pagination';
import StatusBadge from './StatusBadge';
import TableFilters from './TableFilters';
import TableSkeleton from './TableSkeleton';


export default function Table() {

    const { data, isLoading } = useQuotations();
    
    const {
        filters,
        setFilters,
        clearFilters,
        filteredData,
        availableReferences,
        availableSuppliers
    } = useTableFilters(data || []);
    
    const {
        currentPage,
        totalPages,
        itemsPerPage,
        totalItems,
        paginatedData,
        goToPage,
        setItemsPerPage
    } = usePagination({
        data: filteredData,
        itemsPerPage: 5
    });

    if (isLoading) return <TableSkeleton />
    if (!data) return null;

    return (
        <div className="w-full">
            {/* Table Filters */}
            <TableFilters 
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={clearFilters}
                availableReferences={availableReferences}
                availableSuppliers={availableSuppliers}
            />

            {/* Header with items per page selector */}
            <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                    {filteredData.length !== data.length 
                        ? `${totalItems} de ${data.length} cotações`
                        : `Total: ${totalItems} cotações`
                    }
                </div>
                <ItemsPerPageSelector 
                    itemsPerPage={itemsPerPage}
                    totalItems={totalItems}
                    onItemsPerPageChange={setItemsPerPage}
                />
            </div>

            {/* Table container with horizontal scroll */}
            <div className="w-full overflow-x-auto bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg">
                <table className="table-auto w-full min-w-[600px]">
                    <thead className="bg-gray-50 dark:bg-neutral-700">
                        <tr>
                            <th className="p-3 text-center font-medium text-gray-700 dark:text-gray-300">Peça</th>
                            <th className="p-3 text-left font-medium text-gray-700 dark:text-gray-300">Referência</th>
                            <th className="p-3 text-left font-medium text-gray-700 dark:text-gray-300">Fornecedor</th>
                            <th className="p-3 text-left font-medium text-gray-700 dark:text-gray-300">Colaborador</th>
                            <th className="p-3 text-left font-medium text-gray-700 dark:text-gray-300">Preço</th>
                            <th className="p-3 text-left font-medium text-gray-700 dark:text-gray-300">Status</th>
                            <th className="p-3 text-center font-medium text-gray-700 dark:text-gray-300">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="p-8 text-center text-gray-500 dark:text-gray-400">
                                    {totalItems === 0 ? 'Nenhuma cotação encontrada' : 'Nenhum item nesta página'}
                                </td>
                            </tr>
                        ) : (
                            paginatedData.map((quotation) => (
                                <tr
                                    key={quotation.id}
                                    className="border-t border-gray-200 dark:border-neutral-700 hover:bg-orange-50 dark:hover:bg-neutral-700/50"
                                >
                                    <td className="p-3 text-gray-900 dark:text-gray-100">{quotation.part.name}</td>
                                    <td className="p-3 text-gray-700 dark:text-gray-300">{quotation.part.id}</td>
                                    <td className="p-3 text-gray-700 dark:text-gray-300">{quotation.supplier}</td>
                                    <td className="p-3 text-gray-700 dark:text-gray-300">{quotation.createdBy?.username}</td>
                                    <td className="p-3 text-gray-700 dark:text-gray-300 font-semibold">{formatCurrency(quotation.price)}</td>
                                    <td className="p-3">
                                        <StatusBadge status={quotation.status} />
                                    </td>
                                    <td className="p-3">
                                        <div className="flex flex-col gap-1 items-center">
                                            <EditButton data={{ 
                                                id: quotation.id, 
                                                reference: quotation.part.id, 
                                                status: quotation.status, 
                                                supplier: quotation.supplier, 
                                                price: quotation.price,
                                                updatedAt: quotation.updatedAt
                                            }} />
                                            <DeleteButton itemId={quotation.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            
            {/* Pagination component - fixed outside of scroll container */}
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                onPageChange={goToPage}
            />
        </div>
    )
}
