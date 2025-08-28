import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/app/inventory')({
  component: Inventory,
})

function Inventory() {
  return (
    <div className="flex flex-col h-full justify-center items-center text-ammo-100 text-[1.5rem] gap-[3rem]">
      <h2 className="text-[1.5rem]">
        INVENTORY:
      </h2>
      <Link to="/app/inventory/food">food</Link>
      <Link to="/app/inventory/toys">toys</Link>
      <Link to="/app/inventory/medicine">medicine</Link>
      <Link to="/app/inventory/powerups">powerups</Link>
      <Outlet />
  </div>
  )
}
