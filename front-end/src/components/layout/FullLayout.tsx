'use client'

import { Layout } from "antd"
import SideNavigation from "./SideNavigation"
import TopNavigation from "./TopNavigation"

const { Content } = Layout

interface FullLayoutProps {
    children: React.ReactNode
}

const FullLayout = ({ children }: FullLayoutProps) => {
    return (
        <Layout>
            <SideNavigation />
            <Layout>
                <TopNavigation />
                <Content>
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default FullLayout