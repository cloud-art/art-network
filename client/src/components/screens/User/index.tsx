import React from 'react'
import s from './index.module.scss'
import { useTypedSelector } from '@/hooks/useTypedSelector'

type Props = {}

const User = (props: Props) => {
    const user = useTypedSelector(state => state.userReducer.user)
    console.log(user)
    return (
        <div>UserPage</div>
    )
}

export default User