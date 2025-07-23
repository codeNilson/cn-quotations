import { useState } from 'react';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';

export interface FilterOptions {
    status: string;
    reference: string;
    supplier: string;
    dateFrom: string;
    dateTo: string;
}

interface TableFiltersProps {
    filters: FilterOptions;
    onFiltersChange: (filters: FilterOptions) => void;
    onClearFilters: () => void;
    availableReferences: string[];
    availableSuppliers: string[];
}

const statusOptions = [
    { value: '', label: 'Todos os status' },
    { value: 'pending', label: 'Pendente' },
    { value: 'approved', label: 'Aprovada' },
    { value: 'rejected', label: 'Rejeitada' }
];

export default function TableFilters({
    filters,
    onFiltersChange,
    onClearFilters,
    availableReferences,
    availableSuppliers
}: TableFiltersProps) {
    const [isExpanded, setIsExpanded] = useState(false); // Padrão: escondido
    
    const hasActiveFilters = filters.status || filters.reference || filters.supplier || filters.dateFrom || filters.dateTo;
    
    const handleFilterChange = (key: keyof FilterOptions, value: string) => {
        onFiltersChange({
            ...filters,
            [key]: value
        });
    };

    return (
        <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg mb-4 overflow-hidden">
            {/* Toggle Button - Always visible */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-neutral-700/50 transition-colors duration-200"
            >
                <div className="flex items-center gap-3">
                    <span className="text-base font-medium text-gray-700 dark:text-gray-300">
                        Filtros
                    </span>
                    {hasActiveFilters && (
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400">
                                {Object.values(filters).filter(Boolean).length} ativo{Object.values(filters).filter(Boolean).length !== 1 ? 's' : ''}
                            </span>
                        </div>
                    )}
                </div>
                <ChevronDownIcon 
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ease-in-out ${isExpanded ? 'rotate-180' : ''}`} 
                />
            </button>

            {/* Filter Content with smooth animation */}
            <div 
                className={`transition-all duration-300 ease-in-out ${
                    isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                } overflow-hidden`}
            >
                <div className="p-4 border-t border-gray-200 dark:border-neutral-700">
                    {/* Filters Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-4">
                        {/* Status Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Status
                            </label>
                            <select
                                value={filters.status}
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-neutral-700 text-gray-900 dark:text-gray-100 transition-colors"
                            >
                                {statusOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Reference Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Referência
                            </label>
                            <select
                                value={filters.reference}
                                onChange={(e) => handleFilterChange('reference', e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-neutral-700 text-gray-900 dark:text-gray-100 transition-colors"
                            >
                                <option value="">Todas</option>
                                {availableReferences.map(reference => (
                                    <option key={reference} value={reference}>
                                        {reference}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Supplier Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Fornecedor
                            </label>
                            <select
                                value={filters.supplier}
                                onChange={(e) => handleFilterChange('supplier', e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-neutral-700 text-gray-900 dark:text-gray-100 transition-colors"
                            >
                                <option value="">Todos</option>
                                {availableSuppliers.map(supplier => (
                                    <option key={supplier} value={supplier}>
                                        {supplier}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Date From Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Data início
                            </label>
                            <input
                                type="date"
                                value={filters.dateFrom}
                                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-neutral-700 text-gray-900 dark:text-gray-100 transition-colors"
                            />
                        </div>

                        {/* Date To Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Data fim
                            </label>
                            <input
                                type="date"
                                value={filters.dateTo}
                                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-neutral-700 text-gray-900 dark:text-gray-100 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    {hasActiveFilters && (
                        <div className="flex justify-end">
                            <button
                                onClick={onClearFilters}
                                className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-md transition-colors duration-200"
                            >
                                <XMarkIcon className="w-4 h-4" />
                                Limpar filtros
                            </button>
                        </div>
                    )}

                    {/* Active Filters Summary */}
                    {hasActiveFilters && (
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-neutral-700">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filtros:</span>
                                {filters.status && (
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                                        {statusOptions.find(s => s.value === filters.status)?.label}
                                    </span>
                                )}
                                {filters.reference && (
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                                        {filters.reference}
                                    </span>
                                )}
                                {filters.supplier && (
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                                        {filters.supplier}
                                    </span>
                                )}
                                {(filters.dateFrom || filters.dateTo) && (
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
                                        {filters.dateFrom && filters.dateTo 
                                            ? `${new Date(filters.dateFrom).toLocaleDateString('pt-BR')} - ${new Date(filters.dateTo).toLocaleDateString('pt-BR')}`
                                            : filters.dateFrom 
                                            ? `A partir de ${new Date(filters.dateFrom).toLocaleDateString('pt-BR')}`
                                            : `Até ${new Date(filters.dateTo).toLocaleDateString('pt-BR')}`
                                        }
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
