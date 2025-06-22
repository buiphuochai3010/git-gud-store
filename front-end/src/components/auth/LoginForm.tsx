import { LoginFormType } from '@/types/auth'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input } from 'antd'
import Link from 'next/link'
import React from 'react'

interface LoginFormProps {
    loading: boolean
}

const LoginForm = ({
    loading,
}: LoginFormProps) => {
    return (
        <>
            <Form.Item<LoginFormType>
                label="Tên đăng nhập"
                name="username"
                className='font-medium'
                rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
            >
                <Input
                    prefix={<UserOutlined />}
                    autoComplete="username"
                    placeholder='Vui lòng nhập tên đăng nhập hoặc Email'
                />
            </Form.Item>

            <Form.Item<LoginFormType>
                label="Mật khẩu"
                name="password"
                className='font-medium'
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            >
                <Input.Password
                    prefix={<LockOutlined />}
                    autoComplete="current-password"
                    placeholder='Vui lòng nhập mật khẩu'
                />
            </Form.Item>

            <div className='flex place-content-between'>
                <Form.Item<LoginFormType>
                    name="remember"
                    valuePropName="checked"
                >
                    <Checkbox>Ghi nhớ tài khoản</Checkbox>
                </Form.Item>

                <Form.Item<LoginFormType>
                    className='font-medium'
                >
                    <div className='flex flex-col items-end gap-2'>
                        <Link href="/forgot-password">Quên mật khẩu?</Link>
                        <Link href="/register">Đăng ký</Link>
                    </div>
                </Form.Item>
            </div>

            <Form.Item<LoginFormType>
                className='w-full !mb-0'
            >
                <Button
                    type="primary"
                    htmlType="submit"
                    className='w-full !font-medium'
                    loading={loading}
                >
                    Đăng nhập
                </Button>
            </Form.Item>
        </>
    )
}

export default LoginForm