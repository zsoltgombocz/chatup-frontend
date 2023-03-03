import { create } from 'zustand';
import { CountyInterface } from '@utils/interfaces/map';
import { PrePage, SearchState } from '@utils/enums';

interface prePageInterface {
    [id: string]: boolean
}

interface userData {
    token: string | undefined,
    location: CountyInterface | null | undefined,
    search: SearchState | undefined,
    achievements: string[],
    prePageSteps: prePageInterface,
    setToken: (token: string) => void
    setUserLocation: (location: CountyInterface | null) => void,
    setSearch: (search: SearchState | undefined) => void,
    setAchievements: (id: string) => void,
    markPageAsVisited: (id: PrePage) => boolean,
    prePagesVisited: (arrayOfPages: string[]) => boolean,
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

const initialPrePageSteps: prePageInterface = {
    [PrePage.LOCATION]: false,
    [PrePage.GENDER]: false,
    [PrePage.INTERESTS]: false,
}

export const useUserData = create<userData>((set, get) => ({
    token: getTokenFromCookie(),
    location: undefined,
    search: undefined,
    achievements: getAchievements(),
    prePageSteps: initialPrePageSteps,

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

    //Limit the pages by removing by sliceBy index
    prePagesVisited: (arrayOfPages: string[]): boolean => {
        return arrayOfPages
            .every((page) => get().prePageSteps[page] === true);
    },

    markPageAsVisited: (id: PrePage): boolean => {
        let pagesArray: string[] = Object.keys(get().prePageSteps);
        const pageIndex = pagesArray.findIndex((page: string) => page === id);

        //Getting only the pages before current id
        pagesArray = pagesArray.slice(0, pageIndex);
        const isPreviousPagesVisited: boolean = get().prePagesVisited(pagesArray);

        const prePageState =
            isPreviousPagesVisited ?
                { ...get().prePageSteps, [id]: true }
                :
                initialPrePageSteps;

        set(state => ({ ...state, prePageSteps: prePageState }));

        if (id === PrePage.INTERESTS && isPreviousPagesVisited) {
            get().setSearch(SearchState.ACTIVE);
        } else {
            get().setSearch(undefined);

        }

        return isPreviousPagesVisited;
    }
}));