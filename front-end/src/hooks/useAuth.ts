import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, message } from 'antd';
import { LoginFormType, ForgotPasswordFormType, RegisterFormType } from '@/types/auth';
import { signIn } from 'next-auth/react';

export const useAuth = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    return { form, loading, setLoading };
};

export const useLogin = () => {
    const router = useRouter();
    const { setLoading } = useAuth();

    const handleLogin = async (values: LoginFormType) => {
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

    return { handleLogin };
};

export const useForgotPassword = () => {
    const { setLoading } = useAuth();

    const handleForgotPassword = async (values: ForgotPasswordFormType) => {
        try {
            console.log('[handleForgotPassword]', values);
        } catch (error) {
            console.log('[handleForgotPassword]', error);
        } finally {
            setLoading(false);
        }
    }

    return { handleForgotPassword };
};

export const useRegister = () => {
    const { setLoading } = useAuth();

    const handleRegister = async (values: RegisterFormType) => {
        try {
            console.log('[handleRegister]', values);
        } catch (error) {
            console.log('[handleRegister]', error);
        } finally {
            setLoading(false);
        }
    }

    return { handleRegister };
}