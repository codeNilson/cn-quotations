import { useMemo, useState } from 'react';
import type { QuotationResolved } from '../models/Quotation';

export interface FilterOptions {
    status: string;
    reference: string;
    supplier: string;
    dateFrom: string;
    dateTo: string;
}

// Helper function to parse date string (DD/MM/YYYY) to Date object
const parseDate = (dateString: string): Date | null => {
    if (!dateString) return null;
    const [day, month, year] = dateString.split('/');
    if (!day || !month || !year) return null;
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
};

export function useTableFilters(data: QuotationResolved[]) {
    const [filters, setFilters] = useState<FilterOptions>({
        status: '',
        reference: '',
        supplier: '',
        dateFrom: '',
        dateTo: ''
    });

    // Get unique values for filter options
    const availableReferences = useMemo(() => {
        const references = data.map(item => item.part.id).filter(Boolean);
        return [...new Set(references)].sort();
    }, [data]);

    const availableSuppliers = useMemo(() => {
        const suppliers = data.map(item => item.supplier).filter(Boolean);
        return [...new Set(suppliers)].sort();
    }, [data]);

    // Filter the data based on current filters
    const filteredData = useMemo(() => {
        return data.filter(item => {
            // Status filter
            if (filters.status && item.status.toLowerCase() !== filters.status) {
                return false;
            }

            // Reference filter
            if (filters.reference && item.part.id !== filters.reference) {
                return false;
            }

            // Supplier filter
            if (filters.supplier && item.supplier !== filters.supplier) {
                return false;
            }

            // Date range filter
            if (filters.dateFrom || filters.dateTo) {
                const itemDate = parseDate(item.createdAt);
                if (!itemDate) return false;

                if (filters.dateFrom) {
                    const fromDate = new Date(filters.dateFrom);
                    fromDate.setHours(0, 0, 0, 0);
                    if (itemDate < fromDate) return false;
                }

                if (filters.dateTo) {
                    const toDate = new Date(filters.dateTo);
                    toDate.setHours(23, 59, 59, 999);
                    if (itemDate > toDate) return false;
                }
            }

            return true;
        });
    }, [data, filters]);

    const clearFilters = () => {
        setFilters({
            status: '',
            reference: '',
            supplier: '',
            dateFrom: '',
            dateTo: ''
        });
    };

    const hasActiveFilters = filters.status || filters.reference || filters.supplier || filters.dateFrom || filters.dateTo;

    return {
        filters,
        setFilters,
        clearFilters,
        filteredData,
        hasActiveFilters,
        availableReferences,
        availableSuppliers
    };
}
