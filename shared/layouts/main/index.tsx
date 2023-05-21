import { Layout } from 'antd';
import Head from 'next/head';
import React, { useState } from 'react';
import MainLayoutHeader from './header';
import MainLayoutSidebar from './side-bar';

const { Content } = Layout;

type IProps = {
  children: React.ReactNode;
  title?: string;
};

const MainLayout: React.FC<IProps> = ({ children, title }) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <Head >
        <title>{!title ? 'Dashboard - Codebase' : `${title} - Codebase`}</title>
        <meta
          name="description"
          content="Codebase for dashboard designed with Ant Design."
        />
      </Head>
      <Layout className="layout">
        <MainLayoutSidebar {...{ collapsed }}></MainLayoutSidebar>
        <Layout className="site-layout min-h-[100vh]"
        // style={{ minHeight: '100vh' }}
        >
          <MainLayoutHeader {...{ collapsed, setCollapsed }}></MainLayoutHeader>
          <Content
            className='mx-1 p-10'
          // style={{
          //   margin: '24px 16px',
          //   padding: 24,
          // }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MainLayout;
