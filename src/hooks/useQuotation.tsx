import { fetchQuotations } from "../service/QuotationService"
import { useQuery } from "@tanstack/react-query";

export function useQuotations() {
    return useQuery(
        {
            queryKey: ['quotations'],
            queryFn: fetchQuotations,
            staleTime: 1000 * 60 * 5,
        }
    )
}