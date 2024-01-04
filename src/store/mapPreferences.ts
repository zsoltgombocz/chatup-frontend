import { create } from 'zustand';
import { County } from '@utils/enums';
interface MapPreferencesInterface {
    mapCheckbox: 0 | 1, // 0 - countrywide, 1 - only selected counties
    counties: County[],
    setTickedCheckbox: (cb: 0 | 1) => void,
    updateCounty: (id: County, b: boolean) => void,
}

const getStoredSelectedCounties = (): County[] | [] => {
    const storedValue: null | string = sessionStorage.getItem('chatup_map_counties');

    if (storedValue === null || !storedValue) return [];

    return JSON.parse(storedValue);
}

const getStoredCheckboxValue = (): (0 | 1) => {
    const storedValue: null | string = sessionStorage.getItem('chatup_map_checkbox');

    if (storedValue === null && !storedValue) return 0;

    const value = parseInt(storedValue);

    return value === 1 ? 1 : 0;
}

export const useMapPreferences = create<MapPreferencesInterface>((set, get) => ({
    counties: getStoredSelectedCounties(),
    mapCheckbox: getStoredCheckboxValue(),

    setTickedCheckbox: (cb: 0 | 1) => {
        sessionStorage.setItem('chatup_map_checkbox', '' + cb);
        set(state => ({ ...state, mapCheckbox: cb }));
    },
    updateCounty: (id: County, b: boolean) => {
        if (b) {
            set(state => ({ ...state, counties: [...state.counties, id] }));
        } else {
            const filteredCounties = get().counties.filter(county => county !== id);
            set(state => ({ ...state, counties: filteredCounties }));
        }

        sessionStorage.setItem('chatup_map_counties', JSON.stringify(get().counties));
    }
}));