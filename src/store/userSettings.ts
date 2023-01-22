import { create } from 'zustand';

interface UserSettingsInterface {
    theme: number,
    color: string,
    setTheme: (index: number) => void
}

const getTheme = (): number => {
    const theme: string | null = localStorage.getItem('chatup_theme');
    console.log('no saved theme found');
    if (theme === null) return 0;
    else return parseInt(theme);
}

export const useUserSettings = create<UserSettingsInterface>((set) => ({
    theme: getTheme(),
    color: "",
    setTheme: (index: number) => {
        localStorage.setItem('chatup_theme', '' + index);
        set(state => ({ ...state, theme: index }))
    }
}));