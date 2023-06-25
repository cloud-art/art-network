import React, { useEffect } from 'react'
import s from './index.module.scss'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { artNetworkApi, fetchUser } from '@/services/artNetworkService'
import { useActions } from '@/hooks/useAction'
import { API_URL } from '@/constants/api'

const User = () => {

    return (
        <div>
            UserPage
        </div>
    )
}

export default User