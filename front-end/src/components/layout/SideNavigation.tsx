'use client'

import { Layout, Menu } from 'antd'

const { Sider } = Layout

const SideNavigation = () => {
  return (
    <Sider collapsible>
        <Menu
            mode='inline'
            items={[
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
                }
            ]}
        />
    </Sider>
  )
}

export default SideNavigation