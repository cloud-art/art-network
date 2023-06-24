import Layout from '@/components/Layout'
import User from '@/components/screens/User'
import { NextPage } from 'next'
import React from 'react'

const UserPage: NextPage = () => {
    return (
        <Layout>
            <User />
        </Layout>
    )
}

export default UserPage