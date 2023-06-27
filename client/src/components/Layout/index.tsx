import React, { PropsWithChildren } from 'react'
import s from './index.module.scss'
import Sidebar from '../Sidebar'
import classNames from 'classnames'
import Header from '../Header'

const Layout: React.FC<PropsWithChildren> = ({
    children,
}) => {
    return (
        <main className={classNames(s.main, 'appContainer')}>
            <Sidebar></Sidebar>
            <div className={s.page}>
                <Header />
                {children}
            </div>
        </main>
    )
}

export default Layout