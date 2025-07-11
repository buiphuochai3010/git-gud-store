import { passwordConfirmValidation } from '@/lib/validations'
import { RegisterFormType } from '@/types/auth'
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import Link from 'next/link'

interface RegisterFormProps {
    loading: boolean
}

const RegisterForm = ({
    loading,
}: RegisterFormProps) => {
    return (
        <>
            <Form.Item<RegisterFormType>
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

            <Form.Item<RegisterFormType>
                label="Email"
                name="email"
                className='font-medium'
                rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
            >
                <Input
                    prefix={<MailOutlined />}
                    autoComplete="email"
                    placeholder='Vui lòng nhập email'
                />
            </Form.Item>

            <Form.Item<RegisterFormType>
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

            <Form.Item<RegisterFormType>
                label="Xác nhận mật khẩu"
                name="confirm_password"
                className='font-medium'
                rules={[
                    { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                    passwordConfirmValidation
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined />}
                    autoComplete="confirm-password"
                    placeholder='Vui lòng nhập lại mật khẩu'
                />
            </Form.Item>

            <Form.Item<RegisterFormType>
                className='font-medium'
            >
                <div className='flex flex-col items-end gap-2'>
                    <Link href="/login">Đăng nhập</Link>
                    <Link href="/forgot-password">Quên mật khẩu?</Link>
                </div>
            </Form.Item>

            <Form.Item<RegisterFormType>
                className='w-full !mb-0'
            >
                <Button
                    type="primary"
                    htmlType="submit"
                    className='w-full !font-medium'
                    loading={loading}
                >
                    Đăng ký
                </Button>
            </Form.Item>
        </>
    )
}

export default RegisterForm