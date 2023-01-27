import { Card, Layout } from 'antd';
import Head from 'next/head';
import {
  content,
} from './layout.styles';

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
      <Content className={content}>
        <Card
          title={
            <h2 style={{ textAlign: 'center', textTransform: 'uppercase' }}>
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
