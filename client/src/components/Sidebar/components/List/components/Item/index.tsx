import Icon from '@/components/UI/Icon';
import React from 'react'
import { FiUser } from 'react-icons/fi';
import s from './index.module.scss'
import classNames from 'classnames';

type Props = {
    // image: string;
    username: string;
}

const Item: React.FC<Props> = ({
    username
}) => {
    return (
        <li className={classNames(s.item, 'container')}>
            <Icon type='circle'>
                <FiUser />
            </Icon>
            <div className={s.right}>
                <span className={s.username}>{username}</span>
            </div>
        </li>
    )
}

export default Item