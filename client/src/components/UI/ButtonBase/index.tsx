import React, { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import s from './index.module.scss'
import classNames from 'classnames';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    classname?: string;
}

const ButtonBase: React.FC<PropsWithChildren<Props>> = ({
    children,
    classname,
    ...props
}) => {
    return (
        <button
            className={classNames(s.button, classname)}
            {...props}
        >
            {children}
        </button>
    )
}

export default ButtonBase