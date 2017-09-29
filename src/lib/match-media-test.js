import { getMatchMedia, releaseMatchMedia } from './match-media';
import defaultMq from '../mq/mq.json';

describe('match-media', () => {
    describe('getMatchMedia', () => {
        it('should return instance of match media with correct query', () => {
            const query = 'screen and (max-width: 48em)';
            const mql = getMatchMedia(query);

            expect(mql.media).to.be.eql('screen and (max-width: 48em)');

            releaseMatchMedia(query);
        });

        it('should get query from `src/mq/mq.json`', () => {
            const mql = getMatchMedia('--small-only');

            expect(mql.media).to.be.eql(defaultMq['--small-only']);

            releaseMatchMedia('--small-only');
        });
    });

    describe('releaseMatchMedia', () => {
        it('should work', () => {
            getMatchMedia('--small-only');

            expect(() => {
                releaseMatchMedia('--small-only');
            }).to.not.throw();
        });
    });
});
