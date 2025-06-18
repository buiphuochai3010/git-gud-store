import { LoginFormType } from '@/types/auth'
import { Button, Form, Input } from 'antd'
import Link from 'next/link'
import React from 'react'

interface ForgotPasswordFormProps {
    loading: boolean
}

const ForgotPasswordForm = ({
    loading,
}: ForgotPasswordFormProps) => {
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
                <Link href="/login">Trở về đăng nhập</Link>
                <Link href="/register">Đăng ký</Link>
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

export default ForgotPasswordForm