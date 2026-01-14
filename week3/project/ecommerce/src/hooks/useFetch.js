import { useEffect, useState } from "react";

export default function useFetch(asyncFn, deps) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        void (async () => {
            try {
                setLoading(true);
                setError(null);
                const result = await asyncFn();
                if (!cancelled) setData(result);
            } catch (err) {
                if (!cancelled) setError(err?.message || "Request failed");
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };

    }, deps);

    return { data, loading, error, setData };
}
