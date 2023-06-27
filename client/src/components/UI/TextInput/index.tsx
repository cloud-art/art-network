import React, { ChangeEvent, InputHTMLAttributes, forwardRef } from 'react'
import s from './index.module.scss'
import classNames from 'classnames';


interface Props extends InputHTMLAttributes<HTMLInputElement> {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    classname?: string;
}

const TextInput: React.FC<Props> = forwardRef<HTMLInputElement, Props>(({
    value,
    onChange,
    classname,
    ...props
}, ref) => {

    return (
        <label className={s.label}>
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