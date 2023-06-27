import React from 'react'
import s from './index.module.scss'
import Item from './components/Item'
import classNames from 'classnames'

const List = () => {
    const userList = [
        { id: 1, username: 'user 1' },
        { id: 2, username: 'user 2' },
        { id: 3, username: 'user 3' },
    ]

    return (
        <ul className={s.list}>
            {userList.map((user) => (
                <Item username={user.username} />
            ))}
        </ul>
    )
}

export default List