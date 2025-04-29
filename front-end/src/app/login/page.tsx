'use client';

import type { FormProps } from 'antd';
import { Form, Input, Button, Checkbox, Card } from 'antd';

type FieldType = {
    username?: string;
    password?: string;
    remember?: boolean;
}

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('[onFinish]', values);
}

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('[onFinishFailed]', errorInfo);
}

const Login = () => {
    const [form] = Form.useForm();
    return (
        <div className='w-full h-full flex justify-center items-center'>
            <Card>
                <Form
                    form={form}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                // autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Tên đăng nhập"
                        name="username"
                        rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
                    >
                        <Input placeholder='Username' />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password placeholder='Password' />
                    </Form.Item>

                    <Form.Item<FieldType>
                        wrapperCol={{
                            offset: 8,
                            span: 16
                        }}
                    >
                        <Checkbox>Ghi nhớ tài khoản</Checkbox>
                    </Form.Item>

                    <Form.Item<FieldType>
                        wrapperCol={{
                            offset: 8,
                            span: 16
                        }}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login;