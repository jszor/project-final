import { createFileRoute, Link, Outlet, useLocation } from '@tanstack/react-router'

export const Route = createFileRoute('/app/inventory')({
  component: Inventory,
})

function Inventory() {
  const location = useLocation()
  const isFoodRoute = location.pathname.includes('/food')
  const isToysRoute = location.pathname.includes('/toys')
  const isMedicineRoute = location.pathname.includes('/medicine')
  const isPowerupsRoute = location.pathname.includes('/powerups')

  return (
    <div className="flex flex-col h-full justify-center items-center text-ammo-100 text-[0.75rem] xs:text-[1rem] sm:text-[1.5rem] gap-[2rem] xs:gap-[3rem]">
      {!isFoodRoute && !isToysRoute && !isMedicineRoute && !isPowerupsRoute && (
        <>
          <h2 className="text-[0.75rem] xs:text-[1rem] sm:text-[1.5rem]">
            INVENTORY:
          </h2>
          <Link to="/app/inventory/food" className="hover:underline">food</Link>
          <Link to="/app/inventory/toys" className="hover:underline">toys</Link>
          <Link to="/app/inventory/medicine" className="hover:underline">medicine</Link>
          <Link to="/app/inventory/powerups" className="hover:underline">powerups</Link>
          <Link to="/app/menu">
            <div className="text-[0.75rem] xs:text-[1rem] sm:text-[1.5rem] pt-1 pb-3 pr-6 pl-5 rounded-[25px] border-2 hover:bg-ammo-600">
              ⏎
            </div>
          </Link>
        </>
      )}
      <Outlet />
    </div>
  )
}