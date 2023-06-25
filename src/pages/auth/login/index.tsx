import { NextPageWithLayout } from '@/pages/_app';
import AuthBanner from '@/shared/components/authBanner';
import AuthBody from '@/shared/components/authBody';
import MainLayout from '@/shared/main-layout';
import Head from 'next/head';
import React from 'react'

const Login: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <AuthBanner title='Login' breadCrumb='Login' />
      <AuthBody />
    </>
  )
}

export default Login

Login.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
