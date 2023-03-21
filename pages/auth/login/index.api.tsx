import {
    EyeInvisibleOutlined,
    EyeTwoTone, LockOutlined, UserOutlined
} from '@ant-design/icons';
import { ILogin } from '@features/auth/login/interface';
import { showToast, TOAST_TYPES } from '@shared/utils/toast-utils/toast.util';
import { useRouter } from 'next/router';
import React from 'react';

import AuthLayout from '@features/auth/layout';
import { NextPageWithLayout } from '@pages/_app';
import { Button, Checkbox, ConfigProvider, Form, Input } from 'antd';
import axios from 'axios';
import { setCookie } from 'cookies-next';
import { useState } from 'react';



const Login: NextPageWithLayout = () => {
    const router = useRouter();
    const [disabled, setDisabled] = useState(false);
    const [form] = Form.useForm();

    const handleLogin = async (values: ILogin) => {
        const { userName, password } = values;
        try {
            const res = await axios.post('/api/auth/login', {
                userName,
                password,
            });
            setCookie('user', res.data.token);
            router.push('/');
            showToast(TOAST_TYPES.success, 'Successfully logged in.');
        } catch (error: any) {
            showToast(
                TOAST_TYPES.error,
                error?.response?.data?.message ||
                'Something went wrong while trying to log in please try again.'
            );
        } finally {
        }
    };


    return (
        <>
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