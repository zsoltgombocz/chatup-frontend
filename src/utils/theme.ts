export const setTheme = (index: number) => {
    if (index === 0) {
        document.querySelector('html')?.classList.remove('dark');
    } else {
        document.querySelector('html')?.classList.add('dark');
    }
}

export const applyThemeColorToBody = (color: string) => {
    const body: null | HTMLBodyElement = document.querySelector('#root');
    if (body === null) return;

    body.className = "";
    body.classList.add(color);
    body.dataset.color = color;
    body.style.overflow = 'hidden';
    body.style.overflow = 'auto';
}