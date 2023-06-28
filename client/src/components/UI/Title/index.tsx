import { FC, PropsWithChildren } from 'react';
import s from './index.module.scss';
import classNames from 'classnames';

interface TitleProps {
    className?: string;
    variant?: Sizes;
    isBold?: Boolean;
}

type Sizes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export const Title: FC<PropsWithChildren<TitleProps>> = ({
    className,
    variant = 'h1',
    isBold = false,
    children,
    ...props
}) => {
    const Tag = `${variant}` as keyof JSX.IntrinsicElements;

    const weightStyle = isBold ? s.bold : s.normal

    return (
        <Tag className={classNames(s.title, className, weightStyle)} {...props}>
            {children}
        </Tag>
    );
};
