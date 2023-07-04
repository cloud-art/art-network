import React, { ChangeEvent, TextareaHTMLAttributes, forwardRef } from 'react'
import s from './index.module.scss'
import classNames from 'classnames';


interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    classname?: string;
    labelClassName?: string;
}

const TextArea: React.FC<Props> = forwardRef<HTMLTextAreaElement, Props>(({
    label,
    value,
    onChange,
    classname,
    labelClassName,
    ...props
}, ref) => {
    return (
        <label className={classNames(s.label, labelClassName)}>
            {label && <span className={s.caption}>{label}</span>}
            <textarea
                ref={ref}
                className={classNames(s.textField, classname)}
                value={value}
                onChange={onChange}
                {...props}
            />
        </label>
    )
})

export default TextArea
