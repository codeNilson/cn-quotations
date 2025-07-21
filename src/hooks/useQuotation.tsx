import { useFetch } from "./useFetch";
import { fetchQuotations } from "../service/QuotationService"

export function useQuotation() {
    return useFetch(() => fetchQuotations())
}