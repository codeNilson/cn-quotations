import { useQuery } from "@tanstack/react-query";
import { fetchParts } from "../service/PartService";

export function useParts() {
    return useQuery({
        queryKey: ['parts'],
        queryFn: fetchParts,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}
