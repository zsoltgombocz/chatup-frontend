import { create } from 'zustand';
import { PrePage, SearchState, Location } from '@utils/enums';
import { UserLocation } from '@utils/types';

interface prePageInterface {
    [id: string]: boolean
}

interface userData {
    token: string | undefined,
    location: UserLocation,
    searchType: SearchState | undefined,
    achievements: string[],
    prePageSteps: prePageInterface,
    roomId: string | undefined,
    setToken: (token: string) => void
    setUserLocation: (location: UserLocation) => void,
    setSearch: (search: SearchState | undefined) => void,
    setAchievements: (id: string) => void,
    markPageAsVisited: (id: PrePage) => boolean,
    prePagesVisited: (arrayOfPages: string[]) => boolean,
    everyPrePageVisited: () => boolean,
    setRoomId: (roomId: string | undefined) => void,
}

const getTokenFromCookie = (): string | undefined => {
    const savedToken: string | null = sessionStorage.getItem('chatup_socket_token');
    return savedToken === null || !savedToken ? undefined : savedToken;
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

const getSavedRoomId = (): string | undefined => {
    const roomId: string | null = sessionStorage.getItem('chatup_room_id');
    if (roomId === "" || roomId === null) return undefined;
    else return roomId;
}


const getVisitedPages = (): prePageInterface => {
    const visitedPages: string | null = sessionStorage.getItem('chatup_visited');

    if (visitedPages === null) return initialPrePageSteps;

    try {
        const parsedVisitedPages = JSON.parse(visitedPages);
        return parsedVisitedPages;
    } catch (error) {
        return initialPrePageSteps;
    }

}

const initialPrePageSteps: prePageInterface = {
    [PrePage.LOCATION]: false,
    [PrePage.GENDER]: false,
    [PrePage.INTERESTS]: false,
}

export const useUserData = create<userData>((set, get) => ({
    token: getTokenFromCookie(),
    location: Location.NOT_DEFINED,
    searchType: undefined,
    achievements: getAchievements(),
    prePageSteps: getVisitedPages(),
    roomId: getSavedRoomId(),

    setUserLocation: (location: UserLocation) => {
        set(state => ({ ...state, location }))
    },
    setToken: (token: string) => {
        sessionStorage.setItem('chatup_socket_token', token);
        set(state => ({ ...state, token }))
    },
    setSearch: (search: SearchState | undefined) => {
        console.log('setted', search);
        set(state => ({ ...state, searchType: search }));
    },
    setAchievements: (id: string) => {
        const achievementList = [...get().achievements, id];
        localStorage.setItem('chatup_achievements', JSON.stringify(achievementList));
        set(state => ({ ...state, achievements: achievementList }));
    },

    everyPrePageVisited: () => {
        return Object.keys(get().prePageSteps)
            .every((page) => get().prePageSteps[page] === true);
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
        sessionStorage.setItem('chatup_visited', JSON.stringify(prePageState))

        if (id === PrePage.INTERESTS && isPreviousPagesVisited) {
            get().setSearch(SearchState.ACTIVE);
        } else {
            get().setSearch(undefined);

        }

        return isPreviousPagesVisited;
    },

    setRoomId: (roomId: string | undefined): void => {
        sessionStorage.setItem('chatup_room_id', roomId || "");

        set(state => ({ ...state, roomId: roomId }));
    }
}));