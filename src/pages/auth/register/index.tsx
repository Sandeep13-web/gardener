import { NextPageWithLayout } from '@/pages/_app'
import AuthBanner from '@/shared/components/authBanner'
import AuthBody from '@/shared/components/authBody'
import MainLayout from '@/shared/main-layout'
import Link from 'next/link'
import React from 'react'

const Register: NextPageWithLayout = () => {
    return (
        <>
        <AuthBanner title='Sign Up' breadCrumb='Sign Up' />
        <AuthBody />
        </>
    )
}

export default Register

Register.getLayout = (page) => {
    return <MainLayout>{page}</MainLayout>;
};