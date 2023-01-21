import React from 'react'
import classnames from "classnames";
import { Link } from 'react-router-dom';
import LinkButton from './LinkButton';

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
    linkTo?: string | undefined
}

function Button({ size, style, color = undefined, text, className, linkTo = undefined }: Props) {
    const buttonSize = {
        'primary': 'w-80 py-4',
        'secondary': 'w-50 px-14 h-10 leading-10',
    }
    const outlinedStyle = classnames('outlined', 'outlined-dark');
    const fillColor = color !== undefined ? color.fill : 'bg-pr-blue';
    const hoverColor = color !== undefined ? color.hover : 'hover:bg-pr-blue-light';
    const filledStyle = classnames(fillColor, hoverColor, 'text-white');
    const buttonJSXElement = (
        <button className={`btn ${className} ${style === 'filled' ? filledStyle : outlinedStyle} ${buttonSize[size]}`}>
            <span>{text.toUpperCase()}</span>
        </button>
    )

    return linkTo !== undefined ? <LinkButton linkTo={linkTo} noStyle={true}>{buttonJSXElement}</LinkButton> : buttonJSXElement;
}

export default Button