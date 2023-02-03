import { create } from "zustand";

interface InterestPreferencesInterface {
    interests: string[]
    updateInterests: (id: string | 'all', b: boolean) => void
}

export const useInterestPreferences = create<InterestPreferencesInterface>((set, get) => ({
    interests: [],
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
    }
}));