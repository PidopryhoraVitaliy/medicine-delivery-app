import { useCallback, useState } from "react";

export const useHttp = () => {
    const [status, setStatus] = useState('waiting');

    const request = useCallback(async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {
        setStatus('loading');
        try {
            const response = await fetch(url, { method, body, headers });
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            setStatus('error');
            throw error;
        }
    }, []);

    const clearError = useCallback(() => {
        setStatus('loading');
    }, []);

    return { request, clearError, status, setStatus }
}