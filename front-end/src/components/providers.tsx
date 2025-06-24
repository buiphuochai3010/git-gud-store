'use client'

import { SessionProvider } from "next-auth/react"
import { AntdRegistry } from "@ant-design/nextjs-registry"
import { ConfigProvider, theme } from "antd"

const Providers = ({ children }: { children: React.ReactNode }) => {

    const is_dark_mode = false;

    return (
        <SessionProvider>
            <AntdRegistry>
                <ConfigProvider
                    theme={{
                        algorithm: is_dark_mode ? theme.darkAlgorithm : theme.defaultAlgorithm,
                        token: {
                            // colorPrimary: '#000',
                        },
                        components: {
                            Layout: {
                                headerBg: is_dark_mode ? '#001529' : '#fff',
                            },
                            Menu: {
                                // horizontalItemSelectedBg: 'transparent',
                            }
                        }
                    }}
                >
                    {children}
                </ConfigProvider>
            </AntdRegistry>
        </SessionProvider>
    )
}

export default Providers;