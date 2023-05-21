import { Card, Layout } from 'antd';
import Head from 'next/head';

const { Content } = Layout;
const AuthLayout = ({
  children,
  title,
}: any) => {
  return (
    <Layout>
      <Head>
        <title>{title ? `${title} - Codebase` : 'Codebase'} </title>
      </Head>
      <Content className={'min-h-[100vh] flex  justify-center items-center'}>
        <Card
          title={
            <h2
              className='uppercase text-center '
            // style={{ textAlign: 'center', textTransform: 'uppercase' }}
            >
              {title}
            </h2>
          }
          style={{ width: 400 }}
        >
          {children}
        </Card>
      </Content>
    </Layout>
  );
};

export default AuthLayout;
