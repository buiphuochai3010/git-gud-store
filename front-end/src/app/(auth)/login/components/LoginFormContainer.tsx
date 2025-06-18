'use client';

import { LoginFormType } from '@/types/auth';
import { Card, Form, message } from 'antd';
import { useState } from 'react';
import LoginFormItem from './LoginFormItem';
import ForgotPasswordFormItem from './ForgotPasswordFormItem';
import type { FormProps } from 'antd';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';


const onFinishFailed: FormProps<LoginFormType>['onFinishFailed'] = (errorInfo) => {
    console.log('[onFinishFailed]', errorInfo);
}


const LoginFormContainer = () => {
    const [form] = Form.useForm();
    const [formType, setFormType] = useState<'login' | 'forgot-password'>('login');
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleLogin: FormProps<LoginFormType>['onFinish'] = async (values) => {
        const hide = message.loading('Đang đăng nhập...', 0);
        try {
            setLoading(true);
            const { username, password } = values;
            const res = await signIn('credentials', {
                username,
                password,
                redirect: false,
            })
            hide();
            if (res?.error) {
                message.error('Có lỗi xảy ra khi đăng nhập, vui lòng thử lại sau');
                return;
            } else if (res?.ok) {
                message.success('Đăng nhập thành công!');
                router.push('/');
                return;
            }
        } catch (error) {
            console.log('[handleLogin] error', error);
            hide();
            message.error('Có lỗi xảy ra khi đăng nhập, vui lòng thử lại sau');
        } finally {
            setLoading(false);
        }
    }

    const handleForgotPassword: FormProps<LoginFormType>['onFinish'] = (values) => {
        try {
            console.log('[handleForgotPassword]', values);
        } catch (error) {
            console.log('[handleForgotPassword]', error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <Card
            title={formType === 'login' ? 'Đăng nhập' : 'Quên mật khẩu'}
            className='w-full max-w-[450px] mx-10 !rounded-2xl !bg-white/[0.93]'
            classNames={{
                title: 'text-2xl font-medium text-center',
            }}
        >
            <Form
                form={form}
                initialValues={{ remember: true }}
                onFinish={formType === 'login' ? handleLogin : handleForgotPassword}
                onFinishFailed={onFinishFailed}
                layout='vertical'

            // autoComplete="off"
            >
                {formType === 'login'
                    ? <LoginFormItem setFormType={setFormType} loading={loading} />
                    : <ForgotPasswordFormItem setFormType={setFormType} loading={loading} />}
            </Form>
        </Card>
    )
}

export default LoginFormContainer