'use client'

import { TOP_NAVIGATION_ITEMS, USER_PROFILE_ITEMS } from '@/lib/constants'
import { BellOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Badge, Dropdown, Layout, Menu, Space, Typography } from 'antd'
import Image from 'next/image'

const { Header } = Layout

const TopNavigation = () => {
    return (
        <Header>
            <div className='flex items-center justify-between'>
                {/* Logo */}
                <div className='flex items-center gap-2'>  
                    <Image
                        src='/images/logo.gif'
                        alt='logo'
                        width={50}
                        height={50}
                        className='object-contain'
                    />
                    <Typography.Title level={5} style={{ marginBottom: 0}}>
                        Git-Gud Store
                    </Typography.Title>
                </div>

                {/* Navigation Menu Items */}
                <Menu
                    className='min-w-md flex-1'
                    mode='horizontal'
                    items={TOP_NAVIGATION_ITEMS}
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
                            items: USER_PROFILE_ITEMS
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