import React, { useEffect } from 'react'
import s from './index.module.scss'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { artNetworkApi, fetchUser } from '@/services/artNetworkService'
import { useActions } from '@/hooks/useAction'
import { API_URL } from '@/constants/api'
import classNames from 'classnames'
import PostList from '@/components/PostList'
import PostItem from '@/components/PostItem'

const userPosts = [
    { id: 1, title: 'title1', text: 'text1 text1 text1 text1 text1 text1 text1 text1 text1 text1 text1 text1 text1 text1 text1 text1 text1 text1 text1 text1 text1 text1 text1 text1 text1 text1 text1 text1 ', userId: 1 },
    { id: 2, title: 'title2', text: 'text2 text2 text2 text2 text2 text2 text2 text2 text2 text2 text2 text2 text2 text2 text2 text2 text2 text2 text2 text2 text2 text2 text2 text2 text2 ', userId: 1 },
    { id: 3, title: 'title3', text: 'text3 text3 text3 text3 text3 text3 text3 text3 text3 text3 text3 text3 text3 text3 text3 text3 text3 text3 text3 text3 text3 text3 text3 text3 text3 text3 text3 text3 text3 ', userId: 1 },
    { id: 4, title: 'title4', text: 'text4 text4 text4 text4 text4 text4 text4 text4 text4 text4 text4 text4 text4 text4 text4 text4 text4 text4 text4 text4 text4 text4 text4 text4 text4 text4 text4 text4 text4 text4 text4 text4 ', userId: 1 },
    { id: 5, title: 'title5', text: 'text5 text5 text5 text5 text5 text5 text5 text5 text5 text5 text5 text5 text5 text5 text5 text5 text5 text5 text5 text5 text5 text5 text5 text5 text5 text5 text5 text5 ', userId: 1 },
    { id: 6, title: 'title6', text: 'text6 text6 text6 text6 text6 text6 text6 text6 text6 text6 text6 text6 text6 text6 text6 text6 text6 text6 text6 text6 text6 text6 text6 text6 text6 text6 text6 text6 text6 ', userId: 1 },
    { id: 7, title: 'title7', text: 'text7 text7 text7 text7 text7 text7 text7 text7 text7 text7 text7 text7 text7 text7 text7 text7 text7 text7 text7 text7 text7 text7 text7 text7 text7 text7 text7 text7 text7 ', userId: 1 },
]

const User = () => {
    const reversedPosts = [...userPosts].reverse()

    console.log(userPosts)
    console.log(reversedPosts)

    return (
        <div className={classNames(s.page, 'container')}>
            <PostList>
                {
                    userPosts.map((post) =>
                        <PostItem title={post.title} text={post.text} />
                    )
                }
            </PostList>
        </div>
    )
}

export default User