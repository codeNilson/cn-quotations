import { fetchParts } from "../service/PartService";
import { useFetch } from "./useFetch";

export function useParts() {
    return useFetch(() => fetchParts())
}