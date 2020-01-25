import { useEffect, useState } from 'react';
import { getMatchMedia, releaseMatchMedia } from '../lib/match-media';

/**
 * Хук для медиа запросов.
 */

export default function useMedia(query: string): boolean {
    const [matches, setMatches] = useState(() => getMatchMedia(query).matches);

    useEffect(() => {
        const mql = getMatchMedia(query);

        function handleMatchChange(): void {
            setMatches(mql.matches);
        }
        handleMatchChange();
        mql.addListener(handleMatchChange);

        return (): void => {
            releaseMatchMedia(query);
            mql.removeListener(handleMatchChange);
        };
    }, [query]);

    return matches;
}
