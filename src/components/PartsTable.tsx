import { useState } from 'react';
import { useParts } from '../hooks/useParts';
import { useCreatePart } from '../hooks/usePartMutations';
import { usePagination } from '../hooks/usePagination';
import DeleteButton from './DeleteButton';
import PartForm from './forms/PartForm';
import Pagination from './Pagination';
import type { PartFormData } from '../models/Part';

export default function PartsTable() {
    const { data, isLoading, error } = useParts();
    const createPartMutation = useCreatePart();
    const [editingPart, setEditingPart] = useState<PartFormData | null>(null);
    const [showForm, setShowForm] = useState(false);

    const handleCreateTestPart = async () => {
        try {
            await createPartMutation.mutateAsync({
                id: 'TEST-001',
                name: 'Peça Teste',
                machine_name: 'Máquina Teste'
            });
        } catch (error) {
            console.error('Erro ao criar peça teste:', error);
        }
    };
    
    const {
        currentPage,
        totalPages,
        itemsPerPage,
        totalItems,
        paginatedData,
        goToPage
    } = usePagination({
        data: data || [],
        itemsPerPage: 10
    });

    const handleEdit = (part: PartFormData) => {
        setEditingPart(part);
        setShowForm(true);
    };

    const handleSuccess = () => {
        setEditingPart(null);
        setShowForm(false);
    };

    const handleCancel = () => {
        setEditingPart(null);
        setShowForm(false);
    };

    if (isLoading) {
        return (
            <div className="animate-pulse">
                <div className="h-8 bg-gray-200 dark:bg-neutral-700 rounded mb-4"></div>
                <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-16 bg-gray-200 dark:bg-neutral-700 rounded"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <p className="text-red-600 dark:text-red-400">
                    Erro ao carregar peças: {error.message}
                </p>
                <button 
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 text-sm bg-orange-500 text-white rounded hover:bg-orange-600"
                >
                    Tentar novamente
                </button>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="space-y-4 md:space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div className="flex flex-col sm:flex-row gap-2">
                    {data && data.length === 0 && (
                        <button
                            onClick={handleCreateTestPart}
                            disabled={createPartMutation.isPending}
                            className="px-3 py-2 text-xs font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 rounded-md transition-colors disabled:opacity-50"
                        >
                            {createPartMutation.isPending ? 'Criando...' : 'Criar Peça Teste'}
                        </button>
                    )}
                    <button
                        onClick={() => setShowForm(true)}
                        className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-md transition-colors w-full sm:w-auto"
                    >
                        Nova Peça
                    </button>
                </div>
            </div>

            {/* Form Modal */}
            {showForm && (
                <PartForm
                    initialData={editingPart || undefined}
                    isEdit={!!editingPart}
                    onSuccess={handleSuccess}
                    onCancel={handleCancel}
                />
            )}

            {/* Summary */}
            <div className="text-sm text-gray-600 dark:text-gray-400 flex flex-col sm:flex-row sm:justify-between gap-2">
                <span>Total: {totalItems} peças</span>
                {data && data.length === 0 && (
                    <span className="text-orange-600">Nenhuma peça encontrada - clique em "Nova Peça" para adicionar</span>
                )}
            </div>

            {/* Desktop Table - Hidden on mobile */}
            <div className="hidden md:block w-full overflow-x-auto bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg">
                <table className="table-auto w-full min-w-[400px]">
                    <thead className="bg-gray-50 dark:bg-neutral-700">
                        <tr>
                            <th className="p-3 text-left font-medium text-gray-700 dark:text-gray-300">Referência</th>
                            <th className="p-3 text-left font-medium text-gray-700 dark:text-gray-300">Nome da Peça</th>
                            <th className="p-3 text-left font-medium text-gray-700 dark:text-gray-300">Máquina</th>
                            <th className="p-3 text-center font-medium text-gray-700 dark:text-gray-300">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-gray-500 dark:text-gray-400">
                                    <div className="space-y-2">
                                        <p>Nenhuma peça encontrada</p>
                                        <p className="text-sm">Clique em "Nova Peça" para começar a cadastrar suas peças</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            paginatedData.map((part) => (
                                <tr
                                    key={part.id}
                                    className="border-t border-gray-200 dark:border-neutral-700 hover:bg-orange-50 dark:hover:bg-neutral-700/50"
                                >
                                    <td className="p-3 text-gray-900 dark:text-gray-100 font-mono">
                                        {part.id}
                                    </td>
                                    <td className="p-3 text-gray-900 dark:text-gray-100">
                                        {part.name}
                                    </td>
                                    <td className="p-3 text-gray-700 dark:text-gray-300">
                                        {part.machine_name}
                                    </td>
                                    <td className="p-3">
                                        <div className="flex gap-1 justify-center">
                                            <button
                                                onClick={() => handleEdit({
                                                    id: part.id,
                                                    name: part.name,
                                                    machine_name: part.machine_name
                                                })}
                                                className="px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded transition-colors"
                                            >
                                                Editar
                                            </button>
                                            <DeleteButton 
                                                itemId={part.id}
                                                itemType="peça"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards - Visible only on mobile */}
            <div className="md:hidden space-y-3">
                {paginatedData.length === 0 ? (
                    <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg p-6 text-center">
                        <div className="space-y-2 text-gray-500 dark:text-gray-400">
                            <p>Nenhuma peça encontrada</p>
                            <p className="text-sm">Clique em "Nova Peça" para começar a cadastrar suas peças</p>
                        </div>
                    </div>
                ) : (
                    paginatedData.map((part) => (
                        <div
                            key={part.id}
                            className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg p-4 space-y-3"
                        >
                            {/* Header with reference and actions */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-medium text-gray-900 dark:text-gray-100 font-mono text-sm">
                                        {part.id}
                                    </h3>
                                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-1">
                                        {part.name}
                                    </p>
                                </div>
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => handleEdit({
                                            id: part.id,
                                            name: part.name,
                                            machine_name: part.machine_name
                                        })}
                                        className="px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded transition-colors"
                                    >
                                        Editar
                                    </button>
                                    <DeleteButton 
                                        itemId={part.id}
                                        itemType="peça"
                                    />
                                </div>
                            </div>

                            {/* Details */}
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-gray-400">Máquina:</span>
                                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                                        {part.machine_name}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                onPageChange={goToPage}
            />
        </div>
    );
}
