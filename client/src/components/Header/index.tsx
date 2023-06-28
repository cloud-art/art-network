import React from 'react'
import { FiUser } from 'react-icons/fi'
import { FiMoreVertical } from 'react-icons/fi'
import s from './index.module.scss'
import Icon from '@/components/UI/Icon'
import classNames from 'classnames'
import { useTypedSelector } from '@/hooks/useTypedSelector'

const Header = () => {
    const selectedUser = useTypedSelector(state => state.userReducer.selectedUser)

    return (
        <header className={classNames(s.header, 'container')}>
            {selectedUser &&
                <>
                    <div className={s.left}>
                        <Icon type='circle'>
                            <FiUser />
                        </Icon>
                        <span className={s.username}>{selectedUser.username}</span>
                    </div>
                    <Icon size={'small'}>
                        <FiMoreVertical />
                    </Icon>
                </>
            }
        </header>
    )
}

export default Header