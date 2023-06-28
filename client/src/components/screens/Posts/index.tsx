import React from 'react'
import s from './index.module.scss'
import classNames from 'classnames'
import PostList from '@/components/PostList'
import { useTypedSelector } from '@/hooks/useTypedSelector'

const Posts = () => {
    const { selectedUser } = useTypedSelector(state => state.userReducer)

    return (
        <div className={classNames(s.page, 'container')}>
            {selectedUser && <PostList userId={selectedUser._id} />}

        </div>
    )
}

export default Posts