'use client'

import { Layout } from "antd"
import TopNavigation from "./TopNavigation"

const { Content } = Layout

interface HeaderLayoutProps {
    children: React.ReactNode
}

const HeaderLayout = ({ children }: HeaderLayoutProps) => {
    return (
        <Layout>
            <TopNavigation />
            <Content>
                {children}
            </Content>
        </Layout>
    )
}

export default HeaderLayout