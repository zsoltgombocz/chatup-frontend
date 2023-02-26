import { create } from "zustand";
interface InterestPreferencesInterface {
    interests: string[]
    updateInterests: (id: string | 'all', b: boolean) => void
}

const getStoredInterests = (): string[] | [] => {
    const storedValue: null | string = sessionStorage.getItem('chatup_interests');

    if (storedValue === null) return [];

    return JSON.parse(storedValue);
}

export const useInterestPreferences = create<InterestPreferencesInterface>((set, get) => ({
    interests: getStoredInterests(),
    updateInterests: (id: string | 'all', b: boolean) => {
        if (id === 'all') {
            set(state => ({ ...state, interests: [] }));
        } else {
            if (b) {
                set(state => ({ ...state, interests: [...state.interests, id] }));
            } else {
                const filteredCounties = get().interests.filter(interest => interest !== id);
                set(state => ({ ...state, interests: filteredCounties }));
            }
        }

        sessionStorage.setItem('chatup_interests', JSON.stringify(get().interests));
    }
}));