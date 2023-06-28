import React, { PropsWithChildren } from 'react'
import s from './index.module.scss'
import IPost from '@/types/IPost'
import PostItem from '../PostItem'
import { artNetworkApi } from '@/services/artNetworkService'

type Props = {
  userId: string;
}

const PostList: React.FC<Props> = ({
  userId
}) => {

  const { data: posts } = artNetworkApi.useFetchUserPostsQuery(userId)

  return (
    <ul className={s.list}>
      {posts?.map((post: IPost) => (
        <PostItem key={post._id} title={post.title} text={post.text} />
      ))}
    </ul>
  )
}

export default PostList