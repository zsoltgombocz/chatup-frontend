import React from 'react'
import classnames from "classnames";
import { Link } from 'react-router-dom';
import LinkButton from './LinkButton';
import { useUserSettings } from '../store/userSettings';

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
}

function Button({ size, style, color = undefined, text, className, linkTo = undefined, hugText = false, textUppercase = true }: Props) {
    const userColor: string = useUserSettings(state => state.color);

    const buttonSize = {
        'primary': 'w-80 py-4',
        'secondary': 'w-50 px-14 h-10 leading-10',
    }

    const outlinedStyle = classnames('outlined', 'outlined-dark');
    const fillColor = color !== undefined ? color.fill : '';
    const hoverColor = color !== undefined ? color.hover : '';
    const filledStyle = classnames(fillColor, hoverColor, 'text-white', `bg-${userColor}-hover-light`);
    const buttonJSXElement = (
        <button className={`btn ${className} ${style === 'filled' ? filledStyle : outlinedStyle} ${hugText ? 'px-3 py-1 w-fit' : buttonSize[size]}`}>
            <span>{textUppercase ? text.toUpperCase() : text}</span>
        </button>
    )

    return linkTo !== undefined ? <LinkButton linkTo={linkTo} noStyle={true}>{buttonJSXElement}</LinkButton> : buttonJSXElement;
}

export default Button