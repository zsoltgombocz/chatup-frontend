import { create } from 'zustand';

interface UserSettingsInterface {
    theme: number,
    color: string,
    setTheme: (index: number) => void,
    setColor: (color: string) => void
}

const getTheme = (): number => {
    const theme: string | null = localStorage.getItem('chatup_theme');

    if (theme === null) return 0;
    else return parseInt(theme);
}

const getColor = (): string => {
    const color: string | null = localStorage.getItem('chatup_color');

    if (color === null) return 'blue';
    else return color;
}

export const useUserSettings = create<UserSettingsInterface>((set) => ({
    theme: getTheme(),
    color: getColor(),
    setTheme: (index: number) => {
        localStorage.setItem('chatup_theme', '' + index);
        set(state => ({ ...state, theme: index }))
    },
    setColor: (color: string) => {
        localStorage.setItem('chatup_color', color);
        set(state => ({ ...state, color }))
    }
}));