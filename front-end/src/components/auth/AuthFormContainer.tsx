'use client';

import { ForgotPasswordFormType, LoginFormType, RegisterFormType } from '@/types/auth';
import { Card, Form } from 'antd';
import LoginForm from './LoginForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import type { FormProps } from 'antd';
import { useAuth, useLogin, useForgotPassword, useRegister } from '@/hooks/useAuth';
import { usePathname } from 'next/navigation';
import RegisterForm from './RegisterForm';


const onFinishFailed: FormProps<LoginFormType>['onFinishFailed'] = (errorInfo) => {
    console.log('[onFinishFailed]', errorInfo);
}

const AuthFormContainer = () => {
    const pathname = usePathname();
    const { form, loading } = useAuth();
    const { handleLogin } = useLogin();
    const { handleForgotPassword } = useForgotPassword();
    const { handleRegister } = useRegister();

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
    )
}

export default AuthFormContainer