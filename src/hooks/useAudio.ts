import { useEffect } from "react";
import { config } from "@config/achievementConfig";
import { useAudioStore } from "@store/audioStore";
import { useUserSettings } from "@store/userSettings";

interface useAudioInterface {
    initAudio: () => void,
    play: (id: string) => void,
}

export const useAudio = (urls?: string[]): useAudioInterface => {
    const { audioSources, audio, updateAudioSources, addAudioElement } = useAudioStore();
    const sounds = useUserSettings(state => state.sounds);

    const initAudio = () => {
        const sourceUrls = [...urls ?? []];
        updateAudioSources(sourceUrls, true);
    }

    const play = (id: string) => {
        if (sounds) audio[id]?.play();
    }

    useEffect(() => {
        if (audioSources.length > Object.entries(audio).length) {
            audioSources
                .forEach(src => {
                    addAudioElement(src.split('.')[0], new Audio('/sounds/' + src))
                });
        }
    }, [audioSources]);

    return { initAudio, play };
};