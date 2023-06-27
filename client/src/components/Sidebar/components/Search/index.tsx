import React, { ChangeEvent, useRef, useState } from 'react'
import TextInput from '@/components/UI/TextInput'
import s from './index.module.scss'
import ButtonBase from '@/components/UI/ButtonBase'
import Icon from '@/components/UI/Icon'
import { FiArrowLeft, FiX } from 'react-icons/fi'
import useOnClickOutside from '@/hooks/useOnClickOutside'
import classNames from 'classnames'

const Search = () => {
    const [value, setValue] = useState('')
    const [isBackVisible, setBackVisible] = useState(false)
    const formRef = useRef<HTMLFormElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const onUndoClick = (e: any) => {
        e.preventDefault()
        setValue('')
        inputRef.current?.focus()
    }

    const onBackClick = (e: any) => {
        e.preventDefault()
        setValue('')
        setBackVisible(false)
    }

    useOnClickOutside(formRef, () => setBackVisible(false));

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    return (
        <form
            ref={formRef}
            className={classNames(s.search, 'container')}
        >
            {isBackVisible && <ButtonBase classname={s.back} onClick={onBackClick}>
                <Icon size='small'>
                    <FiArrowLeft />
                </Icon>
            </ButtonBase>}

            <TextInput
                ref={inputRef}
                classname={s.input}
                value={value}
                placeholder='Поиск...'
                onChange={onChangeHandler}
                onClick={() => { setBackVisible(true) }}
                type='search'
            />

            {value !== '' && <ButtonBase classname={s.undo} onClick={onUndoClick}>
                <Icon size='small'>
                    <FiX />
                </Icon>
            </ButtonBase>}
        </form>
    )
}

export default Search