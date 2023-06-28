import React from 'react'
import s from './index.module.scss'
import Item from './components/Item'
import { artNetworkApi } from '@/services/artNetworkService'
import IUser from '@/types/IUser'
import { useTypedSelector } from '@/hooks/useTypedSelector'

const List = () => {
    const user = useTypedSelector(state => state.userReducer.user)
    user && artNetworkApi.useGetContactsQuery(user._id)
    const contacts = useTypedSelector(state => state.userReducer.contacts)

    return (
        <ul className={s.list}>
            {contacts.map((user: IUser) => (
                <Item key={user._id} user={user} />
            ))}
        </ul>
    )
}

export default List