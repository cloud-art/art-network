import React, { ChangeEvent, InputHTMLAttributes, forwardRef } from 'react'
import s from './index.module.scss'
import classNames from 'classnames';


interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    classname?: string;
}

const TextInput: React.FC<Props> = forwardRef<HTMLInputElement, Props>(({
    label,
    value,
    onChange,
    classname,
    ...props
}, ref) => {

    return (
        <label className={s.label}>
            {label && <span className={s.caption}>{label}</span>}
            <input
                ref={ref}
                className={classNames(s.textField, classname)}
                value={value}
                onChange={onChange}
                {...props}
            />
        </label>
    )
})

export default TextInput