import { useEffect, useState } from 'react';
import { getMatchMedia, releaseMatchMedia } from '../lib/match-media';

/**
 * Хук для медиа запросов.
 */

export default function useMedia(query) {
    const [matches, setMatches] = useState(() => getMatchMedia(query).matches);

    useEffect(() => {
        const mql = getMatchMedia(query);

        function handleMatchChange() {
            setMatches(mql.matches);
        }
        handleMatchChange();
        mql.addListener(handleMatchChange);

        return () => {
            releaseMatchMedia(query);
            mql.removeListener(handleMatchChange);
        };
    }, [query]);

    return matches;
}
