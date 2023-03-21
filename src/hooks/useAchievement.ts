import { achievementInterface, config } from '@config/achievementConfig';
import { useUserData } from '@store/userData';
import { ToastVariant } from '@utils/enums';
import { useAudio } from './useAudio';
import { useNotify } from './useNotify';
interface useAchievementInterface {
    isAchievementExists: (id: string) => undefined | achievementInterface,
    achievementCompleted: (id: string, callback?: Function | undefined) => void
    isAchievementCompleted: (id: string) => boolean
}

const useAchievement = (): useAchievementInterface => {
    const achievements = config.achievements;
    const { notify } = useNotify();
    const setAchievements = useUserData(state => state.setAchievements);
    const userAchievements = useUserData(state => state.achievements);
    const { play } = useAudio();

    const isAchievementExists = (id: string): undefined | achievementInterface => {
        return achievements.find(achievement => achievement.id === id);
    }

    const isAchievementCompleted = (id: string): boolean => {
        return userAchievements.includes(id);
    }

    const achievementCompleted = (id: string, callback: Function | undefined) => {
        const achievement = isAchievementExists(id);
        if (!achievement || isAchievementCompleted(id)) return;

        notify(
            `'${achievement.title}' eredmény feloldva!`,
            'Feloldott eredményeidet megtekintheted a beállítások oldalon.',
            ToastVariant.DEFAULT,
            7000
        );
        setAchievements(achievement.id);

        //if (achievement) play(achievement.sound.split('.')[0]);

        callback?.();
    }

    return { achievementCompleted, isAchievementCompleted, isAchievementExists };
}

export default useAchievement;