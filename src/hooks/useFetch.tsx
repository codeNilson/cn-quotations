import { useEffect, useState } from 'react'

export function useFetch<T>(fetchFunction: () => Promise<T>) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const load = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const result = await fetchFunction();
            setData(result)
        } catch (err) {
            setError(err as Error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        load()
    },[])

    return { isLoading, data, error, refetch:load }
}
