import  { ReactNode } from 'react'
import DashboardHeader from './DashboardHeader';

type Props = {
    children: ReactNode;
}

function DashboardLayout({children}: Props) {
  return (
    <div>
        <DashboardHeader/>
        {children}
    </div>
  )
}

export default DashboardLayout