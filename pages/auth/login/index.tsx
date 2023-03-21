import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { ILogin } from '@features/auth/login/interface';
import { getUserFromStorage } from '@shared/utils/cookies-utils/cookies.util';
import { showToast, TOAST_TYPES } from '@shared/utils/toast-utils/toast.util';
import { useAppDispatch } from '@store/redux-Hooks';
import { Button, Checkbox, ConfigProvider, Form, Input } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import AuthLayout from '@features/auth/layout';
import { NextPageWithLayout } from '@pages/_app';
import Head from 'next/head';

const Login: NextPageWithLayout = ({ title, description, imageUrl }: any) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [disabled, setDisabled] = useState(false);
  const [form] = Form.useForm();
  // const { testData } = useAppSelector(
  //   (state: any) => state.testData
  // );
  const handleLogin = async (values: ILogin) => {
    setDisabled(true);
    const { userName, password, rememberMe } = values;
    // const [response] = await loginUser({ userName, password, rememberMe })
    // if (response && getUserFromStorage()) {
    showToast(TOAST_TYPES.success, 'Successfully logged in.');
    router.push('/');
    // }
    setDisabled(false);
  };

  useEffect(() => {
    // dispatch(getTestData());
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

// export const getServerSideProps = async () => {
//   // Fetch dynamic data from an API or database
//   // const apiUrl = 'https://jsonplaceholder.typicode.com/albums/1/photos';

//   // Use axios to fetch data from the API
//   const response = store.dispatch(getMetaDescription({}));
//   console.log('response', response);

//   // const responseData = response.data[0];

//   // const data = {
//   //   title: responseData.title,
//   //   description: responseData.url,
//   //   imageUrl: responseData.thumbnailUrl,
//   // };
//   return {
//     props: response,
//   };
// };

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async (ctx) => {
//     console.log(ctx);
//   }
// );
