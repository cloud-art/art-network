import Layout from '@/components/Layout'
import Posts from '@/components/screens/Posts'
import { NextPage } from 'next'
import React from 'react'

const UserPage: NextPage = () => {
    return (
        <Layout>
            <Posts />
        </Layout>
    )
}

export default UserPage