import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form } from 'antd';
import { LoginFormType, ForgotPasswordFormType, RegisterFormType } from '@/types/auth';
import { signIn } from 'next-auth/react';
import { sendRequest } from '@/lib/api';
import type { MessageInstance } from 'antd/es/message/interface';

export const useAuth = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    return { form, loading, setLoading };
};

export const useLogin = (messageApi: MessageInstance) => {
    const router = useRouter();
    const { setLoading } = useAuth();

    const handleLogin = async (values: LoginFormType) => {
        const hide = messageApi.loading('Đang đăng nhập...', 0);
        try {
            console.log('is this triggered?`')
            setLoading(true);
            const { username, password } = values;
            const res = await signIn('credentials', {
                username,
                password,
                redirect: false,
            })

            hide();
            if (res?.error) {
                messageApi.error(res?.error, 5);
                return;
            } else if (res?.ok) {
                messageApi.success('Đăng nhập thành công!');
                router.push('/');
                return;
            }
        } catch (error) {
            console.log('[handleLogin] error', error);
            hide();
            messageApi.error('Có lỗi xảy ra khi đăng nhập, vui lòng thử lại sau');
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

export const useRegister = (messageApi: MessageInstance) => {
    const router = useRouter();
    const { setLoading } = useAuth();

    const handleRegister = async (values: RegisterFormType) => {
        const hide = messageApi.loading('Đang đăng ký...', 0);
        try {
            setLoading(true);
            const { username, email, password } = values;
            const res = await sendRequest('/auth/register', {
                method: 'POST',
                body: { username, email, password },
            })
            hide();
            if (res?.success) {
                messageApi.success('Đăng ký thành công!');
                router.push('/login');
                return;
            } else {
                messageApi.error(res?.message, 5);
                return;
            }
        } catch (error) {
            console.log('[handleRegister]', error);
            hide();
            messageApi.error('Có lỗi xảy ra khi đăng ký, vui lòng thử lại sau');
        } finally {
            setLoading(false);
        }
    }

    return { handleRegister };
}