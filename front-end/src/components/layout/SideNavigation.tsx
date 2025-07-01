'use client'

import { SIDE_NAVIGATION_ITEMS } from '@/lib/constants'
import { Layout, Menu } from 'antd'

const { Sider } = Layout

const SideNavigation = () => {
  return (
    <Sider collapsible>
        <Menu
            mode='inline'
            items={SIDE_NAVIGATION_ITEMS}
        />
    </Sider>
  )
}

export default SideNavigation