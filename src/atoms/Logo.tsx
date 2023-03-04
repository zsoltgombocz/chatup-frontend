import { useUserSettings } from '@store/userSettings';

type size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Props = {
    customColor?: string | undefined
    size?: size,
    className?: string
}

function Logo({ customColor = undefined, size = 'sm', className }: Props) {
    const userColor = useUserSettings(state => state.color);
    const textColor = customColor !== undefined ? `text-[${customColor}]` : `text-primary-${userColor}`;
    const initialLetterSize = {
        'xs': 'text-3xl',
        'sm': 'text-4xl',
        'md': 'text-5xl',
        'lg': 'text-7xl',
        'xl': 'text-8xl',
    }
    const letterSize = {
        'xs': 'text-xl',
        'sm': 'text-2xl',
        'md': 'text-3xl',
        'lg': 'text-5xl',
        'xl': 'text-7xl',
    }

    return (
        <div className={`font-logo ${letterSize[size]} text-gray-600 dark:text-white ${className} text-center`}>
            <span className={`${initialLetterSize[size]} ${textColor}`}>C</span>HATUP
        </div>
    )
}

export default Logo