import React from 'react'
import s from './index.module.scss'
import Header from './components/Header'
import Search from './components/Search'
import List from './components/List'

const Sidebar = () => {
    return (
        <aside className={s.sidebar}>
            <Header />
            <Search />
            <List />
        </aside>
    )
}

export default Sidebar