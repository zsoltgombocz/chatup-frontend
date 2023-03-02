import { create } from 'zustand';
import { CountyInterface } from '@utils/interfaces/map';
import { SearchState } from '@utils/enums';

interface userData {
    token: string | undefined,
    location: CountyInterface | null | undefined,
    search: SearchState | undefined,
    achievements: string[],
    setToken: (token: string) => void
    setUserLocation: (location: CountyInterface | null) => void,
    setAchievements: (id: string) => void
}

const getTokenFromCookie = (): string | undefined => {
    const savedToken: string | null = sessionStorage.getItem('token')
    return savedToken === null ? undefined : savedToken;
}

const getAchievements = (): string[] => {
    const achievements: string | null = localStorage.getItem('chatup_achievements');
    if (achievements === null) return [];
    try {
        return JSON.parse(achievements);
    } catch (error) {
        return [];
    }
}

export const useUserData = create<userData>((set, get) => ({
    token: getTokenFromCookie(),
    location: undefined,
    search: SearchState.ACTIVE,
    achievements: getAchievements(),
    setUserLocation: (location: CountyInterface | null) => {
        set(state => ({ ...state, location }))
    },
    setToken: (token: string) => {
        sessionStorage.setItem('token', token);
        set(state => ({ ...state, token }))
    },
    setSearch: (search: SearchState | undefined) => {
        set(state => ({ ...state, search }));
    },
    setAchievements: (id: string) => {
        const achievementList = [...get().achievements, id];
        localStorage.setItem('chatup_achievements', JSON.stringify(achievementList));
        set(state => ({ ...state, achievements: achievementList }));
    },
}));