import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Header } from "../components/layout/Header"
import { Footer } from "../components/layout/Footer"

export const Route = createRootRoute({
  component: () => {
    const pathname = useRouterState({ select: (s) => s.location.pathname })
    const isAppSection = pathname.startsWith('/app')

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