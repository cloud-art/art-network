import React, { PropsWithChildren } from 'react'
import s from './index.module.scss'

type Props = {}

const PostList: React.FC<PropsWithChildren<Props>> = ({
  children,
}) => {
  return (
    <ul>
      {children}
    </ul>
  )
}

export default PostList