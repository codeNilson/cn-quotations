interface ItemsPerPageSelectorProps {
    itemsPerPage: number;
    totalItems: number;
    onItemsPerPageChange: (itemsPerPage: number) => void;
}

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50, 100];

export default function ItemsPerPageSelector({ 
    itemsPerPage, 
    totalItems, 
    onItemsPerPageChange 
}: ItemsPerPageSelectorProps) {
    const availableOptions = ITEMS_PER_PAGE_OPTIONS.filter(option => option <= totalItems || option <= 20);
    
    // Add "All" option if total items is reasonable
    if (totalItems <= 200 && totalItems > Math.max(...availableOptions)) {
        availableOptions.push(totalItems);
    }

    if (availableOptions.length <= 1) return null;

    return (
        <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">
                Itens por página:
            </span>
            <select
                value={itemsPerPage}
                onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-neutral-800 dark:border-neutral-600 dark:text-gray-300"
            >
                {availableOptions.map(option => (
                    <option key={option} value={option}>
                        {option === totalItems && option > 100 ? 'Todos' : option}
                    </option>
                ))}
            </select>
        </div>
    );
}
