import { useState, useEffect, useRef } from 'react';

/**
 * A reusable hook that stores state in localStorage under the given key.
 * @param key Unique identifier for the stored value.
 * @param defaultValue Value to use if none is stored yet.
 */
function usePersistentState<T>(key: string, defaultValue: T): [T, (value: T) => void] {
    const [state, setState] = useState<T>(() => {
        try {
            const stored = localStorage.getItem(key);
            if (stored !== null) {
                return JSON.parse(stored) as T;
            }
        } catch (e) {
            console.warn(`usePersistentState: could not read key "${key}"`, e);
        }
        return defaultValue;
    });

    const isFirst = useRef(true);
    useEffect(() => {
        // skip persisting on initial mount
        if (isFirst.current) {
            isFirst.current = false;
            return;
        }
        try {
            localStorage.setItem(key, JSON.stringify(state));
        } catch (e) {
            console.warn(`usePersistentState: could not write key "${key}"`, e);
        }
    }, [key, state]);

    return [state, setState];
}

export default usePersistentState;
