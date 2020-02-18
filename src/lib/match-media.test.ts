import { getMatchMedia, releaseMatchMedia } from './match-media';
import defaultMq from '../mq/mq.json';

describe('match-media', () => {
    const originalMatchMedia = window.matchMedia;
    let matchMediaFn;

    beforeEach(() => {
        matchMediaFn = jest.fn();
        window.matchMedia = matchMediaFn;
    });

    afterEach(() => {
        window.matchMedia = originalMatchMedia;
    });

    describe('getMatchMedia', () => {
        it('should return instance of match media with correct query', () => {
            matchMediaFn.mockReturnValueOnce({ media: 'screen and (max-width: 48em)' });
            const query = 'screen and (max-width: 48em)';
            const mql = getMatchMedia(query);

            expect(mql.media).toEqual('screen and (max-width: 48em)');
            expect(matchMediaFn).toHaveBeenCalled();

            releaseMatchMedia(query);
        });

        it('should get query from `src/mq/mq.json`', () => {
            matchMediaFn.mockReturnValueOnce({ media: 'screen and (max-width: 47.9375em)' });
            const mql = getMatchMedia('--small-only');

            expect(mql.media).toEqual(defaultMq['--small-only']);
            expect(matchMediaFn).toHaveBeenCalled();

            releaseMatchMedia('--small-only');
        });
    });

    describe('releaseMatchMedia', () => {
        it('should work', () => {
            getMatchMedia('--small-only');

            expect(() => {
                releaseMatchMedia('--small-only');
            }).not.toThrow();
        });
    });
});
