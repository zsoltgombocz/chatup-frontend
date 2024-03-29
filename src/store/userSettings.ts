import { applyThemeColorToBody } from '@utils/theme';
import { create } from 'zustand';

interface UserSettingsInterface {
    theme: number,
    color: string,
    privacy: boolean[],
    sounds: boolean,
    showAchievements: boolean,
    setTheme: (index: number) => void,
    setColor: (color: string) => void,
    setPrivacy: (index: number, b: boolean) => void,
    setSounds: (sound: boolean) => void,
    setShowAchievements: (show: boolean) => void,
}

const getTheme = (): number => {
    const theme: string | null = localStorage.getItem('chatup_theme');

    if (theme === null) return 0;
    else return parseInt(theme);
}

const getColor = (): string => {
    const color: string | null = localStorage.getItem('chatup_color');
    applyThemeColorToBody(color || 'blue');

    if (color === null) return 'blue';
    else return color;
}

const getPrivacy = (): boolean[] => {
    const privacy: string | null = localStorage.getItem('chatup_privacy');

    if (privacy === null) return [true, true, true, true, true];
    else return JSON.parse(privacy);
}

const getSounds = (): boolean => {
    const sounds: string | null = localStorage.getItem('chatup_sounds');

    if (sounds === null) return true;
    else return parseInt(sounds) === 1;
}

const getShowAchievements = (): boolean => {
    const showAchievements: string | null = localStorage.getItem('chatup_show_achievements');

    if (showAchievements === null) return false;
    else return parseInt(showAchievements) === 1;
}

export const useUserSettings = create<UserSettingsInterface>((set, get) => ({
    theme: getTheme(),
    color: getColor(),
    privacy: getPrivacy(),
    sounds: getSounds(),
    map: {
        counties: [],
        allSelected: true
    },
    showAchievements: getShowAchievements(),
    setTheme: (index: number) => {
        localStorage.setItem('chatup_theme', '' + index);
        set(state => ({ ...state, theme: index }))
    },
    setColor: (color: string) => {
        localStorage.setItem('chatup_color', color);
        applyThemeColorToBody(color);
        set(state => ({ ...state, color }))
    },
    setPrivacy: (index: number, b: boolean) => {
        const current = get().privacy;
        current[index] = b;
        localStorage.setItem('chatup_privacy', JSON.stringify(current));
        set(state => ({ ...state, privacy: current }));
    },
    setSounds: (sound: boolean) => {
        const numberValue = sound ? 1 : 0;
        localStorage.setItem('chatup_sounds', '' + numberValue);
        set(state => ({ ...state, sounds: sound }));
    },
    setShowAchievements: (show: boolean) => {
        const numberValue = show ? 1 : 0;
        localStorage.setItem('chatup_show_achievements', '' + numberValue);
        set(state => ({ ...state, showAchievements: show }));
    },
}));