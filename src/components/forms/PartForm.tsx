import { useState } from 'react';
import { useCreatePart, useUpdatePart } from '../../hooks/usePartMutations';
import type { PartFormData } from '../../models/Part';

interface PartFormProps {
    initialData?: PartFormData;
    onSuccess?: () => void;
    onCancel?: () => void;
    isEdit?: boolean;
}

export default function PartForm({ 
    initialData, 
    onSuccess, 
    onCancel, 
    isEdit = false 
}: PartFormProps) {
    const [formData, setFormData] = useState<PartFormData>({
        id: initialData?.id || '',
        name: initialData?.name || '',
        machine_name: initialData?.machine_name || ''
    });

    const createMutation = useCreatePart();
    const updateMutation = useUpdatePart();
    
    const isLoading = createMutation.isPending || updateMutation.isPending;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.id.trim() || !formData.name.trim() || !formData.machine_name.trim()) {
            console.error("Todos os campos são obrigatórios");
            return;
        }

        try {
            if (isEdit && initialData?.id) {
                await updateMutation.mutateAsync({
                    id: initialData.id,
                    data: {
                        id: formData.id,
                        name: formData.name,
                        machine_name: formData.machine_name
                    }
                });
            } else {
                await createMutation.mutateAsync({
                    id: formData.id,
                    name: formData.name,
                    machine_name: formData.machine_name
                });
            }
            onSuccess?.();
        } catch (error) {
            console.error("Erro ao salvar peça:", error);
        }
    };

    const handleInputChange = (field: keyof PartFormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="bg-white dark:bg-neutral-800 p-6 rounded-lg border border-gray-200 dark:border-neutral-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {isEdit ? 'Editar Peça' : 'Nova Peça'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Reference Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Referência da Peça *
                        </label>
                        <input
                            type="text"
                            value={formData.id}
                            onChange={(e) => handleInputChange('id', e.target.value)}
                            disabled={isEdit} // Don't allow changing reference in edit mode
                            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-neutral-700 text-gray-900 dark:text-gray-100 disabled:bg-gray-100 dark:disabled:bg-neutral-600 disabled:cursor-not-allowed"
                            placeholder="Ex: REF001, ABC123"
                            required
                        />
                        {isEdit && (
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                A referência não pode ser alterada
                            </p>
                        )}
                    </div>

                    {/* Part Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Nome da Peça *
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-neutral-700 text-gray-900 dark:text-gray-100"
                            placeholder="Ex: Parafuso M8, Engrenagem Principal"
                            required
                        />
                    </div>
                </div>

                {/* Machine Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Nome da Máquina *
                    </label>
                    <input
                        type="text"
                        value={formData.machine_name}
                        onChange={(e) => handleInputChange('machine_name', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-neutral-700 text-gray-900 dark:text-gray-100"
                        placeholder="Ex: Torno CNC Haas, Fresadora Universal"
                        required
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-neutral-700">
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={isLoading}
                            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-neutral-700 border border-gray-300 dark:border-neutral-600 rounded-md hover:bg-gray-50 dark:hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Cancelar
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors"
                    >
                        {isLoading ? 'Salvando...' : isEdit ? 'Atualizar' : 'Criar Peça'}
                    </button>
                </div>
            </form>
        </div>
    );
}
