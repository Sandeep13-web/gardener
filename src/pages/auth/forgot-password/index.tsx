import { NextPageWithLayout } from '@/pages/_app'
import AuthBanner from '@/shared/components/authBanner'
import AuthBody from '@/shared/components/authBody'
import MainLayout from '@/shared/main-layout'
import React from 'react'

const ForgotPassword: NextPageWithLayout = () => {
    return (
        <>
            <AuthBanner title='Forgot Password' breadCrumb='Forgot Password' />
            <AuthBody />
        </>
    )
}

export default ForgotPassword

ForgotPassword.getLayout = (page) => {
    return <MainLayout>{page}</MainLayout>;
};