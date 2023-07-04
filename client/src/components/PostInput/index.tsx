import ButtonBase from '@/components/UI/ButtonBase';
import Icon from '@/components/UI/Icon';
import TextArea from '@/components/UI/TextArea'
import React, { FormEvent, useEffect, useState } from 'react'
import { FiSend } from 'react-icons/fi';
import s from './index.module.scss'
import { artNetworkApi } from '@/services/artNetworkService';
import TextInput from '@/components/UI/TextInput';
import classNames from 'classnames';
import { useTypedSelector } from '@/hooks/useTypedSelector';

type Props = {
    classname: string;
}

const PostInput: React.FC<Props> = ({
    classname,
}) => {
    const userId = useTypedSelector(state => state.userReducer.user?._id)
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [addPost] = artNetworkApi.useAddPostMutation()

    useEffect(() => {
        if (textareaRef && textareaRef.current) {
            textareaRef.current.style.height = "inherit";
            textareaRef.current.style.height = `${Math.max(
                textareaRef.current.scrollHeight
            )}px`;
        }
    }, [text]);

    const onSubmit = async (e: FormEvent<EventTarget>) => {
        e.preventDefault()
        try {
            await addPost({ title, text, userId }).unwrap()
            setText('')
            setTitle('')
        }
        catch (e) {
            console.log(e)
        }

    }

    return (
        <form className={classNames(s.form, classname, 'container')} onSubmit={onSubmit}>
            <div className={s.inputs}>
                <TextInput
                    label='Название'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    classname={s.input}
                />
                <TextArea
                    label='Текст'
                    ref={textareaRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>

            <ButtonBase
                classname={s.buttonSend}
                type='submit'
            >
                <Icon>
                    <FiSend />
                </Icon>
            </ButtonBase>
        </form>
    )
}

export default PostInput