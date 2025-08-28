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
        {/* App Header */}
        <AppHeader />

        {/* Main content: left + right panels */}
        <div className="flex flex-1">
          {/* Left panel with tamagotchi console */}
          <LeftPanel />

          {/* Right panel changes depending on nested route */}
          <div className="flex-1 p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
