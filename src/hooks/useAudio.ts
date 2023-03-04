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
        const achievementAudio = config.achievements
            .map(ach => ach.sound)
            .filter(sound => sound !== undefined) as string[];

        const sourceUrls = [...urls ?? [], ...achievementAudio];
        updateAudioSources(sourceUrls, true);
    }

    const play = (id: string) => {
        console.log(audio[id]);
        if (sounds) audio[id]?.play();
    }

    useEffect(() => {
        if (audioSources.length > Object.entries(audio).length) {
            audioSources
                .forEach(src => addAudioElement(src.split('.')[0], new Audio('/src/media/sounds/' + src)));
        }
    }, [audioSources]);

    return { initAudio, play };
};