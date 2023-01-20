export const getURLSegment = (pathname: string, index: number): string | undefined => {
    return pathname.split('/')[index + 1] || undefined;
}