import { create } from 'zustand';
import { County } from '../utils/map.types';

interface MapPreferencesInterface {
    mapCheckbox: 0 | 1,
    counties: County[],
    setTickedCheckbox: (cb: 0 | 1) => void,
    updateCounty: (id: County | 'all', b: boolean) => void,
}

export const useMapPreferences = create<MapPreferencesInterface>((set, get) => ({
    counties: [],
    mapCheckbox: 0,
    setTickedCheckbox: (cb: 0 | 1) => {
        set(state => ({ ...state, mapCheckbox: cb }));
    },
    updateCounty: (id: County | 'all', b: boolean) => {
        if (id === 'all') {
            set(state => ({ ...state, map: { counties: [], allSelected: b } }));
        } else {
            if (b) {
                set(state => ({ ...state, counties: [...state.counties, id] }));
            } else {
                const filteredCounties = get().counties.filter(county => county !== id);
                set(state => ({ ...state, counties: filteredCounties }));
            }
            console.log(get().counties);
        }
    }
}));