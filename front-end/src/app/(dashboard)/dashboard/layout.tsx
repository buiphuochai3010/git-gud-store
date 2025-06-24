import HeaderLayout from '@/components/layout/HeaderLayout'
import React from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <HeaderLayout>
      {children}
    </HeaderLayout>
  )
}

export default DashboardLayout