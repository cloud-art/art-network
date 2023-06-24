import React, { PropsWithChildren } from 'react'
import s from './index.module.scss'
import Header from '../Header'

type Props = {}

const Layout: React.FC<PropsWithChildren> = ({
    children,
}) => {
    return (
        <>
            <Header />
            <main className="main">{children}</main>
        </>
    )
}

export default Layout