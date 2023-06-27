import React from 'react'
import { FiUser } from 'react-icons/fi'
import { FiMoreVertical } from 'react-icons/fi'
import s from './index.module.scss'
import Icon from '@/components/UI/Icon'
import classNames from 'classnames'

const Header = () => {
    return (
        <header className={classNames(s.header, 'container')}>
            <Icon type='circle'>
                <FiUser />
            </Icon>
            <Icon size={'small'}>
                <FiMoreVertical />
            </Icon>
        </header>
    )
}

export default Header