import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteQuotation } from '../service/QuotationService';

export function useDeleteQuotation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteQuotation(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['quotations'] });
        },
        onError: (error) => {
            console.error("Erro ao excluir cotação:", error);
            throw new Error("Não foi possível excluir a cotação. Tente novamente."); 
        }
    });
}

// Generic delete hook that can be extended for other entities
export function useDelete<T>(
    deleteFn: (id: string) => Promise<T>,
    queryKey: string[]
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteFn(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey });
        },
        onError: (error) => {
            console.error(`Erro ao excluir item:`, error);
            throw error;
        }
    });
}
