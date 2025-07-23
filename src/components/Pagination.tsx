interface PaginationProps {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ 
    currentPage, 
    totalPages, 
    itemsPerPage, 
    totalItems, 
    onPageChange 
}: PaginationProps) {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            const start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
            const end = Math.min(totalPages, start + maxVisible - 1);
            
            if (start > 1) {
                pages.push(1);
                if (start > 2) pages.push(-1); // Ellipsis
            }
            
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            
            if (end < totalPages) {
                if (end < totalPages - 1) pages.push(-1); // Ellipsis
                pages.push(totalPages);
            }
        }
        
        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between py-4 px-6 mt-4 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg">
            <div className="text-sm text-gray-700 dark:text-gray-300 mb-2 sm:mb-0">
                Mostrando {startItem} a {endItem} de {totalItems} registros
            </div>
            
            <div className="flex items-center space-x-1">
                {/* Previous button */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-neutral-800 dark:border-neutral-600 dark:text-gray-400 dark:hover:bg-neutral-700"
                >
                    Anterior
                </button>

                {/* Page numbers */}
                {getPageNumbers().map((page, index) => (
                    page === -1 ? (
                        <span key={`ellipsis-${index}`} className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`px-3 py-2 text-sm font-medium border ${
                                currentPage === page
                                    ? 'bg-orange-500 text-white border-orange-500 dark:bg-orange-600 dark:border-orange-600'
                                    : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-600 dark:text-gray-400 dark:hover:bg-neutral-700'
                            }`}
                        >
                            {page}
                        </button>
                    )
                ))}

                {/* Next button */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-neutral-800 dark:border-neutral-600 dark:text-gray-400 dark:hover:bg-neutral-700"
                >
                    Próxima
                </button>
            </div>
        </div>
    );
}
