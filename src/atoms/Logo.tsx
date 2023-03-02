import { useUserSettings } from '@store/userSettings';

type size = 'small' | 'medium' | 'big';
type Props = {
    customColor?: string | undefined
    size?: size,
    className?: string
}

function Logo({ customColor = undefined, size = 'small', className }: Props) {
    const userColor = useUserSettings(state => state.color);
    const textColor = customColor !== undefined ? `text-[${customColor}]` : `text-primary-${userColor}`;
    const initialLetterSize = {
        'small': 'text-2xl',
        'medium': 'text-5xl',
        'big': 'text-8xl',
    }
    const letterSize = {
        'small': 'text-base',
        'medium': 'text-4xl',
        'big': 'text-6xl',
    }

    return (
        <div className={`font-logo ${letterSize[size]} text-gray-600 dark:text-white ${className} text-center`}>
            <span className={`${initialLetterSize[size]} ${textColor}`}>C</span>HATUP
        </div>
    )
}

export default Logo