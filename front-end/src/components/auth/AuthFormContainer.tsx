'use client';

import { ForgotPasswordFormType, LoginFormType, RegisterFormType } from '@/types/auth';
import { Card, Form, message } from 'antd';
import LoginForm from './LoginForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import type { FormProps } from 'antd';
import { useAuth, useLogin, useForgotPassword, useRegister } from '@/hooks/useAuth';
import { usePathname } from 'next/navigation';
import RegisterForm from './RegisterForm';

const AuthFormContainer = () => {
    const pathname = usePathname();
    const { form, loading } = useAuth();
    const [messageApi, contextHolder] = message.useMessage();

    const { handleLogin } = useLogin(messageApi);
    const { handleForgotPassword } = useForgotPassword();
    const { handleRegister } = useRegister(messageApi);

    const renderForm = () => {
        switch (pathname) {
            case '/login':
                return <LoginForm loading={loading} />
            case '/forgot-password':
                return <ForgotPasswordForm loading={loading} />
            case '/register':
                return <RegisterForm loading={loading} />
            default:
                return <></>
        }
    }

    const onFinishFailed: FormProps<LoginFormType | ForgotPasswordFormType | RegisterFormType>['onFinishFailed'] = (errorInfo) => {
        try {
            console.log('[onFinishFailed]', errorInfo);
            
        } catch (error) {
            console.log('[onFinishFailed]', error);
        }
    }

    const cardTitle: Record<string, string> = {
        '/login': 'Đăng nhập',
        '/forgot-password': 'Quên mật khẩu',
        '/register': 'Đăng ký',
    }

    const handleOnFinish = (values: LoginFormType | ForgotPasswordFormType | RegisterFormType) => {
        switch (pathname) {
            case '/login':
                return handleLogin(values as LoginFormType);
            case '/forgot-password':
                return handleForgotPassword(values as ForgotPasswordFormType);
            case '/register':
                return handleRegister(values as RegisterFormType);
            default:
                return;
        }
    }

    return (
        <>
            {contextHolder}
            <Card
                title={cardTitle[pathname as keyof typeof cardTitle]}
                className='w-full max-w-[450px] mx-10 !rounded-2xl !bg-white/[0.93]'
                classNames={{
                    title: 'text-2xl font-medium text-center',
                }}
            >
                <Form
                    form={form}
                    initialValues={{ remember: true }}
                    onFinish={handleOnFinish}
                    onFinishFailed={onFinishFailed}
                    layout='vertical'

                // autoComplete="off"
                >
                    {renderForm()}
                </Form>
            </Card>
        </>
    )
}

export default AuthFormContainer