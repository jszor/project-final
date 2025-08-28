import { createRootRoute, Outlet, useRouterState, useNavigate } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Header } from "../components/layout/Header"
import { Footer } from "../components/layout/Footer"
import { useEffect } from 'react'
import { useAuthStore } from '../store/auth'

export const Route = createRootRoute({
  component: () => {
    const pathname = useRouterState({ select: (s) => s.location.pathname })
    const isAppSection = pathname.startsWith('/app')

    const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
    const navigate = useNavigate()

    useEffect(() => {
      if (isAppSection && !isAuthenticated) {
        navigate({ to: '/login' })
      }
    }, [isAppSection, isAuthenticated, navigate])

    return (
      <div className="min-h-screen px-8">
        {!isAppSection && <Header />}
        <main>
          <Outlet />
        </main>
        {!isAppSection && <Footer />}
        {/* <TanStackRouterDevtools /> */}
      </div>
    )
  },
})