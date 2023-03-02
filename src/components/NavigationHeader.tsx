import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import NavigationTitle from './NavigationTitle';
import { useUserSettings } from '../store/userSettings';
import { useAudio } from '../hooks/useAudio';

type Props = {
    hideRouteText: boolean
}

const NavigationHeader = ({ hideRouteText = false }: Props) => {
    const navigate = useNavigate();
    const sounds = useUserSettings(state => state.sounds);
    const { play } = useAudio();
    const handleBackClick = () => {
        if (sounds) play('navigate');

        navigate(-1);
    }
    return (
        <div className={'flex flex-row items-center text text-2xl'}>
            <ChevronLeftIcon className="absolute left-10 h-7 w-7 cursor-pointer" onClick={handleBackClick} />
            {!hideRouteText ? <NavigationTitle /> : <div className={'opacity-0'}>ROUTE</div>}
        </div>
    )
}

export default NavigationHeader;