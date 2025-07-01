import type { MenuProps } from "antd";
import { signOut } from "next-auth/react";

// Top navigation menu items
export const TOP_NAVIGATION_ITEMS: MenuProps['items'] = [
    {
        key: '1',
        label: 'Dashboard',
    },
    {
        key: '2',
        label: 'Khách hàng',
    },
    {
        key: '3',
        label: 'Sản phẩm',
    },
    {
        key: '4',
        label: 'Đơn hàng',
    }
]

// User profile menu items
export const USER_PROFILE_ITEMS: MenuProps['items'] = [
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

// Side navigation menu items (Must be dynamic)
export const SIDE_NAVIGATION_ITEMS: MenuProps['items'] = [
    {
        key: '1',
        label: 'Side Item 1',
    },
]