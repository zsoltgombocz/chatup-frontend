import Cookies from "universal-cookie";
import { create } from "zustand";

const cookies = new Cookies();
interface InterestPreferencesInterface {
    interests: string[]
    updateInterests: (id: string | 'all', b: boolean) => void
}

export const useInterestPreferences = create<InterestPreferencesInterface>((set, get) => ({
    interests: cookies.get('chatup_interests') || [],
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

        cookies.set('chatup_interests', get().interests);
    }
}));