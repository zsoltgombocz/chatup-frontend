import * as stringSimilarity from 'string-similarity';

export const isSimilar = (s1: string, s2: string): boolean => {
    const sim = stringSimilarity.compareTwoStrings(s1, s2);
    return sim > 0.8;
}