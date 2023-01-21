export const getURLSegment = (pathname: string, index: number | null): string | undefined => {
    const splittedURL = pathname.split('/');
    if (index === null) return splittedURL.filter(seg => seg !== '').join('/');

    return splittedURL[index + 1] || undefined;
}