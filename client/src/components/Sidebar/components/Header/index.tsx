import React from 'react'
import { FiUser } from 'react-icons/fi'
import { FiMoreVertical } from 'react-icons/fi'
import s from './index.module.scss'
import Icon from '@/components/UI/Icon'
import classNames from 'classnames'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { useActions } from '@/hooks/useAction'
import ButtonBase from '@/components/UI/ButtonBase'

const Header = () => {
    const user = useTypedSelector(state => state.userReducer.user)
    const { setSelectedUser } = useActions()

    const onClickHandler = () => {
        setSelectedUser(user)
    }

    return (
        <header className={classNames(s.header, 'container')}>
            <ButtonBase onClick={onClickHandler}>
                <Icon type='circle'>
                    <FiUser />
                </Icon>
            </ButtonBase>

            <Icon size={'small'}>
                <FiMoreVertical />
            </Icon>
        </header>
    )
}

export default Header