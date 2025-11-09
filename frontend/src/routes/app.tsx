import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'
import { useAuthStore } from '../store/auth'
import { AppHeader } from '../components/app/AppHeader'
import { LeftPanel } from '../components/app/LeftPanel'

export const Route = createFileRoute('/app')({
  beforeLoad: ({ location }) => {
    const state = useAuthStore.getState()

    if (!state.token) {
      throw redirect({ to: '/login' })
    }

    if (location.pathname === '/app' || location.pathname === '/app/') {
      throw redirect({ to: '/app/menu' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <AppHeader />
        <div className="flex flex-col lg:flex-row lg:mr-0 lg:ml-0 lg:gap-[20px]">
          <div className="w-full lg:w-1/2 h-auto lg:h-[720px] bg-ammo-700 mx-0 lg:ml-[2rem] lg:mr-0 mb-[2rem] py-[2rem] lg:py-0 rounded-[25px] border-2 border-ammo-600">
            <LeftPanel />
          </div>
          <div className="w-full lg:w-1/2 h-auto lg:h-[720px] bg-ammo-700 mx-0 lg:mr-[2rem] lg:ml-0 mb-[2rem] py-[4rem] lg:py-0 rounded-[25px] border-2 border-ammo-600">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
