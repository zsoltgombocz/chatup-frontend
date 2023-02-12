import { create } from 'zustand';
import { County } from '../utils/interfaces/map';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

interface MapPreferencesInterface {
    mapCheckbox: 0 | 1, // 0 - countrywide, 1 - only selected counties
    counties: County[],
    setTickedCheckbox: (cb: 0 | 1) => void,
    updateCounty: (id: County, b: boolean) => void,
}

const getStoredCheckboxValue = (): (0 | 1) => {
    const storedValue: null | string = cookies.get('chatup_map_checkbox');

    if (storedValue === null) return 0;

    const value = parseInt(storedValue);

    return value === 1 ? 1 : 0;
}

export const useMapPreferences = create<MapPreferencesInterface>((set, get) => ({
    counties: cookies.get('chatup_map_counties') || [],
    mapCheckbox: getStoredCheckboxValue(),

    setTickedCheckbox: (cb: 0 | 1) => {
        cookies.set('chatup_map_checkbox', cb);
        set(state => ({ ...state, mapCheckbox: cb }));
    },
    updateCounty: (id: County, b: boolean) => {
        if (b) {
            set(state => ({ ...state, counties: [...state.counties, id] }));
        } else {
            const filteredCounties = get().counties.filter(county => county !== id);
            set(state => ({ ...state, counties: filteredCounties }));
        }

        cookies.set('chatup_map_counties', get().counties);
    }
}));