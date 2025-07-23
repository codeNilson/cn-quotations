import { useMemo, useState } from 'react';

interface UsePaginationOptions<T> {
    data: T[];
    itemsPerPage?: number;
    initialPage?: number;
}

interface UsePaginationReturn<T> {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
    paginatedData: T[];
    goToPage: (page: number) => void;
    nextPage: () => void;
    previousPage: () => void;
    canGoNext: boolean;
    canGoPrevious: boolean;
    setItemsPerPage: (itemsPerPage: number) => void;
}

export function usePagination<T>({
    data,
    itemsPerPage: initialItemsPerPage = 10,
    initialPage = 1
}: UsePaginationOptions<T>): UsePaginationReturn<T> {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [itemsPerPage, setItemsPerPageState] = useState(initialItemsPerPage);

    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Reset to page 1 if current page exceeds total pages
    const validCurrentPage = Math.min(currentPage, totalPages || 1);

    const paginatedData = useMemo(() => {
        const startIndex = (validCurrentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    }, [data, validCurrentPage, itemsPerPage]);

    const goToPage = (page: number) => {
        const pageNumber = Math.max(1, Math.min(page, totalPages));
        setCurrentPage(pageNumber);
    };

    const nextPage = () => {
        if (validCurrentPage < totalPages) {
            setCurrentPage(validCurrentPage + 1);
        }
    };

    const previousPage = () => {
        if (validCurrentPage > 1) {
            setCurrentPage(validCurrentPage - 1);
        }
    };

    const canGoNext = validCurrentPage < totalPages;
    const canGoPrevious = validCurrentPage > 1;

    const setItemsPerPage = (newItemsPerPage: number) => {
        setItemsPerPageState(newItemsPerPage);
        // Reset to page 1 when changing items per page
        setCurrentPage(1);
    };

    return {
        currentPage: validCurrentPage,
        totalPages,
        itemsPerPage,
        totalItems,
        paginatedData,
        goToPage,
        nextPage,
        previousPage,
        canGoNext,
        canGoPrevious,
        setItemsPerPage
    };
}
