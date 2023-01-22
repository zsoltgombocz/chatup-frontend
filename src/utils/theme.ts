export const setTheme = (index: number) => {
    if (index === 0) {
        document.querySelector('html')?.classList.remove('dark');
    } else {
        document.querySelector('html')?.classList.add('dark');
    }
}