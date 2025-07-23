import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteQuotation } from '../service/QuotationService';
import { useToast } from './useToast';

export function useDeleteQuotation() {
    const queryClient = useQueryClient();
    const { showSuccess, showError } = useToast();

    return useMutation({
        mutationFn: (id: string) => deleteQuotation(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['quotations'] });
            showSuccess('Cotação excluída com sucesso!');
        },
        onError: (error) => {
            console.error("Erro ao excluir cotação:", error);
            showError('Erro ao excluir cotação. Tente novamente.');
            throw new Error("Não foi possível excluir a cotação. Tente novamente."); 
        }
    });
}

export function useDelete<T>(
    deleteFn: (id: string) => Promise<T>,
    queryKey: string[]
) {
    const queryClient = useQueryClient();
    const { showSuccess, showError } = useToast();

    return useMutation({
        mutationFn: (id: string) => deleteFn(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey });
            showSuccess('Item excluído com sucesso!');
        },
        onError: (error) => {
            console.error(`Erro ao excluir item:`, error);
            showError('Erro ao excluir item. Tente novamente.');
            throw error;
        }
    });
}
