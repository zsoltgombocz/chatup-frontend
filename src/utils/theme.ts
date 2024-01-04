export const setTheme = (index: number) => {
    if (index === 0) {
        document.querySelector('html')?.classList.remove('dark');
    } else {
        document.querySelector('html')?.classList.add('dark');
    }
}

export const applyThemeColorToBody = (color: string) => {
    const body: null | HTMLBodyElement = document.querySelector('body');
    if (body === null) return;

    body.classList.add(color);
    body.style.overflow = 'hidden';
    body.style.overflow = 'auto';
}