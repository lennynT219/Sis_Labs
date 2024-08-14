import { SideBar } from '../components'

export function DashboardLayout ({ children, home }) {
  return (
    <>
      <SideBar home={home} />
      <div className='all-content'>
        {children}
      </div>
    </>
  )
}
