import {
  EyeInvisibleOutlined,
  EyeTwoTone, LockOutlined, UserOutlined
} from '@ant-design/icons';

import { ILogin } from '@features/auth/login/interface';
import { loginUser } from '@shared/services/auth';
import { getUserFromStorage } from '@shared/utils/cookies-utils/cookies.util';
import { showToast, TOAST_TYPES } from '@shared/utils/toast-utils/toast.util';
import { Button, Checkbox, ConfigProvider, Form, Input } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import AuthLayout from '@features/auth/layout';
import { NextPageWithLayout } from '@pages/_app';
import Head from 'next/head';

const Login: NextPageWithLayout = () => {
  const router = useRouter();
  const [disabled, setDisabled] = useState(false);
  const [form] = Form.useForm();

  const handleLogin = async (values: ILogin) => {
    setDisabled(true);
    const { userName, password, rememberMe } = values;
    const [response] = await loginUser({ userName, password, rememberMe })
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
        <meta property="og:title" content="title" />
        <meta property="og:description" content='this is the description of a page for testing purpose' />
        <meta property="og:image" content='https://media.istockphoto.com/id/637696304/photo/patan.jpg?s=612x612&w=0&k=20&c=-53aSTGBGoOOqX5aoC3Hs1jhZ527v3Id_xOawHHVPpg=' />
      </Head>
      <ConfigProvider theme={{
        token: {
          colorBgBase: '#ffffff',
        }
      }}>
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
                message: "Username is required",
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
                message: "Password is required",
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
          <Form.Item name="rememberMe" valuePropName="checked" initialValue={false}>
            <Checkbox>
              Remember me
            </Checkbox>
          </Form.Item>
          <Form.Item>

            <Button
              type='primary'
              htmlType="submit"
              size='large'
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
