import { create } from 'zustand';
type audioElements = { [id: string]: HTMLAudioElement };
interface audioStore {
    audioSources: string[],
    audio: audioElements,
    updateAudioSources: (sources: string[], overWrite?: boolean) => void,
    addAudioElement: (key: string, element: HTMLAudioElement) => void,
}

export const useAudioStore = create<audioStore>((set, get) => ({
    audioSources: [],
    audio: {},
    addAudioElement: (uniqueKey: string, element: HTMLAudioElement): void => {
        const newList = { ...get().audio, [uniqueKey]: element };
        set(state => ({ ...state, audio: newList }));
    },
    updateAudioSources: (sources: string[], overWrite: boolean = false): void => {
        set(state => ({ ...state, audioSources: overWrite ? sources : [...state.audioSources, ...sources] }));
    }
}));