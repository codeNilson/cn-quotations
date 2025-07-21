import { fetchParts } from "../service/PartService";
import { useFetch } from "./useFetch";

export function useQuotation() {
    return useFetch(() => fetchParts())
}