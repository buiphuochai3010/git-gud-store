'use client'

import { BellOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Badge, Dropdown, Layout, Menu, Space } from 'antd'
import type { MenuProps } from 'antd'
import { signOut } from 'next-auth/react'

const { Header } = Layout

const top_navigation_items: MenuProps['items'] = [
    {
        key: '1',
        label: 'Home',
    },
    {
        key: '2',
        label: 'About',
    },
    {
        key: '3',
        label: 'Contact',
    },
]

const user_profile_items: MenuProps['items'] = [
    {
        key: '1',
        label: 'Thông tin cá nhân',
    },
    {
        key: '2',
        label: 'Cài đặt',
    },
    {
        key: '3',
        label: 'Đăng xuất',
        onClick: () => {
            signOut({
                callbackUrl: '/login',
            })
        }
    },
]

const TopNavigation = () => {
    return (
        <Header>
            <div className='flex items-center justify-between'>
                {/* Navigation Menu Items */}
                <Menu
                    mode='horizontal'
                    items={top_navigation_items}
                />

                <div className='flex items-center gap-4'>
                    {/* User Profile */}
                    <Space>
                        {/* Notification Bell */}
                        <Badge count={5} size="small" >
                            <BellOutlined />
                        </Badge>
                    </Space>

                    <Dropdown
                        menu={{
                            items: user_profile_items
                        }}
                    >
                        <div className='cursor-pointer'>
                            <Space>
                                <Avatar
                                    size={32}
                                    icon={<UserOutlined />}
                                />
                                <span>John Doe</span>
                            </Space>
                        </div>
                    </Dropdown>
                </div>
            </div>
        </Header>
    )
}

export default TopNavigation