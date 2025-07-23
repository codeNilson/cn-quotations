import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPart, updatePart, deletePart } from "../service/PartService";
import { useToast } from "./useToast";
import type { PartCreateDTO } from "../models/Part";

export function useCreatePart() {
    const queryClient = useQueryClient();
    const { showSuccess, showError } = useToast();
    
    return useMutation({
        mutationFn: (part: PartCreateDTO) => createPart(part),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['parts'] });
            queryClient.invalidateQueries({ queryKey: ['quotations'] });
            showSuccess('Peça criada com sucesso!');
        },
        onError: () => {
            showError('Erro ao criar peça. Tente novamente.');
        },
    });
}

export function useUpdatePart() {
    const queryClient = useQueryClient();
    const { showSuccess, showError } = useToast();
    
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: PartCreateDTO }) => 
            updatePart(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['parts'] });
            queryClient.invalidateQueries({ queryKey: ['quotations'] });
            showSuccess('Peça atualizada com sucesso!');
        },
        onError: () => {
            showError('Erro ao atualizar peça. Tente novamente.');
        },
    });
}

export function useDeletePart() {
    const queryClient = useQueryClient();
    const { showSuccess, showError } = useToast();
    
    return useMutation({
        mutationFn: (id: string) => deletePart(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['parts'] });
            queryClient.invalidateQueries({ queryKey: ['quotations'] });
            showSuccess('Peça excluída com sucesso!');
        },
        onError: () => {
            showError('Erro ao excluir peça. Tente novamente.');
        },
    });
}
