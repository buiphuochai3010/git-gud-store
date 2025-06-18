import { LoginFormType } from '@/types/auth'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input } from 'antd'
import React from 'react'

interface LoginFormItemProps {
    setFormType: (formType: 'login' | 'forgot-password') => void
    loading: boolean
}

const LoginFormItem = ({
    setFormType,
    loading,
}: LoginFormItemProps) => {
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
                    <Button type="link" onClick={() => setFormType('forgot-password')}>Quên mật khẩu?</Button>
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

export default LoginFormItem