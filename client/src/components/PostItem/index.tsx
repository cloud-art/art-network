import React from 'react'
import s from './index.module.scss'
import { Title } from '../UI/Title'

type Props = {
    title: string,
    text: string,
}

const PostItem: React.FC<Props> = ({
    title,
    text,
}) => {
    return (
        <li className={s.bubble}>
            <div className={s.header}>
                <Title variant='h2'>{title}</Title>
            </div>
            <div className={s.content}>
                <span>{text}</span>
            </div>
        </li>
    )
}

export default PostItem