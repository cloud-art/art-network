import Icon from '@/components/UI/Icon';
import React from 'react'
import { FiUser } from 'react-icons/fi';
import s from './index.module.scss'
import classNames from 'classnames';
import { useActions } from '@/hooks/useAction';
import IUser from '@/types/IUser';

type Props = {
    // image: string;
    user: IUser;
}

const Item: React.FC<Props> = ({
    user
}) => {
    const { setSelectedUser } = useActions()
    const onClickHandler = () => {
        setSelectedUser(user)
    }
    return (
        <li className={classNames(s.item, 'container')} onClick={onClickHandler}>
            <Icon type='circle'>
                <FiUser />
            </Icon>
            <div className={s.right}>
                <span className={s.username}>{user.username}</span>
            </div>
        </li>
    )
}

export default Item