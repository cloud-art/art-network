import React from 'react'
import s from './index.module.scss'
import PostList from '@/components/PostList'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import PostInput from '@/components/PostInput'

const Posts = () => {
    const { selectedUser, user } = useTypedSelector(state => state.userReducer)

    return (
        <>
            {
                selectedUser &&
                <PostList userId={selectedUser._id} />
            }
            {
                selectedUser?._id === user?._id &&
                <PostInput classname={s.postInput} />
            }
        </>
    )
}

export default Posts