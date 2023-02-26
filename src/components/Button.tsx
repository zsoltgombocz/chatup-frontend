import classnames from "classnames";
import LinkButton from './LinkButton';
import { useUserSettings } from '../store/userSettings';

import useSound from 'use-sound';
import navigateSound from '../media/sounds/navigate.wav';

type customColor = {
    fill: string,
    hover: string,
}

type Props = {
    size: 'primary' | 'secondary',
    style: 'filled' | 'outlined',
    color?: customColor | undefined,
    text: string,
    className?: string,
    linkTo?: string | undefined,
    hugText?: boolean,
    textUppercase?: boolean,
    onClick?: undefined | Function,
    replace?: boolean,
    enableSound?: boolean,
}

function Button({
    size,
    style,
    color = undefined,
    text,
    className,
    linkTo = undefined,
    hugText = false,
    textUppercase = true,
    onClick = undefined,
    replace = false,
    enableSound = true
}: Props) {
    const userColor: string = useUserSettings(state => state.color);
    const userSoundsEnabled: boolean = useUserSettings(state => state.sounds);
    const buttonSize = {
        'primary': 'w-80 py-4',
        'secondary': 'w-50 px-14 h-10 leading-10',
    }
    const [play] = useSound(navigateSound);
    const playSound = () => {
        if (userSoundsEnabled && enableSound) play()
        else return undefined;
    }

    const outlinedStyle = classnames('outlined', 'outlined-dark');
    const fillColor = color !== undefined ? color.fill : '';
    const hoverColor = color !== undefined ? color.hover : '';
    const filledStyle = classnames(fillColor, hoverColor, 'text-white', `bg-${userColor}-hover-light`, 'shadow-lg');
    const buttonJSXElement = (
        <button onClick={() => { playSound(); onClick?.() }} className={`btn ${className} ${style === 'filled' ? filledStyle : outlinedStyle} ${hugText ? 'px-3 py-1 w-fit' : buttonSize[size]}`}>
            <span>{textUppercase ? text.toUpperCase() : text}</span>
        </button>
    )

    return linkTo !== undefined ? <LinkButton replace={replace} linkTo={linkTo} noStyle={true}>{buttonJSXElement}</LinkButton> : buttonJSXElement;
}

export default Button