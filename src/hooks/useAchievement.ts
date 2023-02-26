import { achievementInterface, config } from '../config/achievementConfig';
import { useUserData } from '../store/userData';
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

    const isAchievementExists = (id: string): undefined | achievementInterface => {
        return achievements.find(achievement => achievement.id === id);
    }

    const isAchievementCompleted = (id: string): boolean => {
        return userAchievements.includes(id);
    }

    const achievementCompleted = (id: string, callback: Function | undefined) => {
        const achievement = isAchievementExists(id);
        if (!achievement || isAchievementCompleted(id)) return;

        notify(`'${achievement.title}' eredmény feloldva!`, 'Feloldott eredményeidet megtekintheted a beállítások oldalon.', 7000);
        setAchievements(achievement.id);
        callback?.();
    }

    return { achievementCompleted, isAchievementCompleted, isAchievementExists };
}

export default useAchievement;