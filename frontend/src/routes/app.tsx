import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'
import { useAuthStore } from '../store/auth'
import { AppHeader } from '../components/app/AppHeader'
import { LeftPanel } from '../components/app/LeftPanel'

export const Route = createFileRoute('/app')({
  beforeLoad: ({ location }) => {
    const state = useAuthStore.getState()
    console.log('beforeLoad auth state:', state)

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
        <div className="flex gap-[20px]">
          <div className="w-1/2 h-[720px] bg-ammo-700 ml-[2rem] mb-[2rem] rounded-[25px] border-2 border-ammo-600">
            <LeftPanel />
          </div>
          <div className="w-1/2 h-[720px] bg-ammo-700 mr-[2rem] mb-[2rem] rounded-[25px] border-2 border-ammo-600">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
