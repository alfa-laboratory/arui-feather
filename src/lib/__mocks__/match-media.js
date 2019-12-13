// @ts-nocheck

export const getMatchMedia = jest.fn()
    .mockReturnValue({ addListener: jest.fn, matches: null });

export const releaseMatchMedia = jest.fn();
