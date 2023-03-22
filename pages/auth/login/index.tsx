import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined
} from '@ant-design/icons';

import AuthLayout from '@features/auth/layout';
import { ILogin } from '@features/auth/login/interface';
import { NextPageWithLayout } from '@pages/_app';
import { loginUser } from '@shared/services/auth';
import { getUserFromStorage } from '@shared/utils/cookies-utils/cookies.util';
import { showToast, TOAST_TYPES } from '@shared/utils/toast-utils/toast.util';
import { getMetaDescription } from '@store/actions/test-actions';
import { store } from '@store/index';
import { Button, Checkbox, ConfigProvider, Form, Input } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Login: NextPageWithLayout = ({ title, description, imageUrl }: any) => {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const [form] = Form.useForm();

  const handleLogin = async (values: ILogin) => {
    setDisabled(true);
    const { userName, password, rememberMe } = values;
    const [response] = await loginUser({ userName, password, rememberMe });
    if (response && getUserFromStorage()) {
      showToast(TOAST_TYPES.success, 'Successfully logged in.');
      router.push('/');
    }
    setDisabled(false);
  };

  useEffect(() => {
    if (getUserFromStorage()) {
      router.push('/');
    }
  }, []);

  return (
    <>
      <Head>
        <title>test</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
      </Head>
      <ConfigProvider
        theme={{
          token: {
            colorBgBase: '#ffffff',
          },
        }}
      >
        <Form
          onFinish={handleLogin}
          layout="vertical"
          form={form}
          requiredMark={false}
        >
          <Form.Item
            name="userName"
            label={<strong>Username</strong>}
            rules={[
              {
                required: true,
                message: 'Username is required',
              },
            ]}
          >
            <Input prefix={<UserOutlined />} size="large" />
          </Form.Item>
          <Form.Item
            name="password"
            label={<strong>Password</strong>}
            rules={[
              {
                required: true,
                message: 'Password is required',
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="rememberMe"
            valuePropName="checked"
            initialValue={false}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              disabled={disabled}
              loading={disabled}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </>
  );
};

export default Login;

Login.getLayout = function getLayout(page: React.ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export async function getServerSideProps() {
  await store.dispatch(getMetaDescription());
  const state = store.getState();
  const { metaData: { metaDescription } } = state;
  const data = {
    title: metaDescription.title,
    description: metaDescription.url,
    imageUrl: metaDescription.thumbnailUrl,
  };
  return {
    props: data,
  };
}

