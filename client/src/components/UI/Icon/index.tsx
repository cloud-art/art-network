import classNames from 'classnames';
import React, { PropsWithChildren } from 'react'
import s from './index.module.scss'

type Props = {
    classname?: string;
    size?: 'small' | 'medium' | 'large';
    type?: 'default' | 'circle';
}

const Icon: React.FC<PropsWithChildren<Props>> = ({
    classname,
    size,
    type = 'Default',
    children
}) => {

    return (
        <div
            className={classNames(
                classname,
                s.icon,
                size === 'small' && s.small,
                size === 'large' && s.large,
                type === 'circle' && s.circle,
            )}
        >
            {children}
        </div>
    )
}

export default Icon