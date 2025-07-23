import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPart, updatePart, deletePart } from "../service/PartService";
import type { PartCreateDTO } from "../models/Part";

export function useCreatePart() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (part: PartCreateDTO) => createPart(part),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['parts'] });
            queryClient.invalidateQueries({ queryKey: ['quotations'] });
        },
    });
}

export function useUpdatePart() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: PartCreateDTO }) => 
            updatePart(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['parts'] });
            queryClient.invalidateQueries({ queryKey: ['quotations'] });
        },
    });
}

export function useDeletePart() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (id: string) => deletePart(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['parts'] });
            queryClient.invalidateQueries({ queryKey: ['quotations'] });
        },
    });
}
