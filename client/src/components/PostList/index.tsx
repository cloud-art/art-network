import React from 'react'
import s from './index.module.scss'
import PostItem from '../PostItem'
import { artNetworkApi } from '@/services/artNetworkService'
import classNames from 'classnames'

type Props = {
  userId: string;
}

const PostList: React.FC<Props> = ({
  userId
}) => {
  const { data: posts } = artNetworkApi.useFetchUserPostsQuery(userId)

  return (
    <ul className={classNames(s.list, 'container')}>
      {posts?.map(post => {
        return <PostItem key={post._id} title={post.title} text={post.text} />
      })}
    </ul>
  )
}

export default PostList