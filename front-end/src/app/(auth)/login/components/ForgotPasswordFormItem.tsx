import { LoginFormType } from '@/types/auth'
import { Button, Form, Input } from 'antd'
import React from 'react'

interface ForgotPasswordFormItemProps {
    setFormType: (formType: 'login' | 'forgot-password') => void
    loading: boolean
}

const ForgotPasswordFormItem = ({
    setFormType,
    loading,
}: ForgotPasswordFormItemProps) => {
    return (
        <>
            <Form.Item<LoginFormType>
                label="Tên đăng nhập"
                name="username"
                className='font-medium'
                rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
            >
                <Input placeholder='Vui lòng nhập tên đăng nhập hoặc Email' />
            </Form.Item>

            <Form.Item<LoginFormType>
                className='font-medium text-right'
            >
                <Button type="link" onClick={() => setFormType('login')}>Trở về đăng nhập</Button>
            </Form.Item>

            <Form.Item<LoginFormType>
                className='w-full !mb-0'
            >
                <Button
                    type="primary"
                    htmlType="submit"
                    className='w-full !font-medium'
                    loading={loading}
                >
                    Tiếp theo
                </Button>
            </Form.Item>
        </>
    )
}

export default ForgotPasswordFormItem