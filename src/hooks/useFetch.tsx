import { useEffect, useState } from 'react'

export function useFetch<T>(fetchFunction: () => Promise<T>) {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const load = async () => {
        setLoading(true)
        setError(null)

        try {
            const result = await fetchFunction();
            setData(result)
        } catch (err) {
            setError(err as Error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        load()
    },[])

    return { loading, data, error, load }
}
