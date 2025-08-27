import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Header } from "../components/layout/Header"
import { Footer } from "../components/layout/Footer"

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen px-8">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      {/* <TanStackRouterDevtools /> */}
    </div>
  ),
})