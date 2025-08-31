import { createFileRoute, Link, Outlet, useLocation } from '@tanstack/react-router'

export const Route = createFileRoute('/app/store')({
  component: Store,
})

function Store() {
  const location = useLocation()
  const isFoodRoute = location.pathname.includes('/food')
  const isToysRoute = location.pathname.includes('/toys')
  const isMedicineRoute = location.pathname.includes('/medicine')
  const isPowerupsRoute = location.pathname.includes('/powerups')

  return (
    <div className="flex flex-col h-full justify-center items-center text-ammo-100 text-[1.5rem] gap-[3rem]">
      {!isFoodRoute && !isToysRoute && !isMedicineRoute && !isPowerupsRoute && (
        <>
          <h2 className="text-[1.5rem]">
            STORE:
          </h2>
          <Link to="/app/store/food" className="hover:underline">food</Link>
          <Link to="/app/store/toys" className="hover:underline">toys</Link>
          {/* <Link to="/app/store/medicine" className="hover:underline">medicine</Link>
          <Link to="/app/store/powerups" className="hover:underline">powerups</Link> */}
          <Link to="/app/menu">
            <div className="text-[1.5rem] pt-1 pb-3 pr-6 pl-5 rounded-[25px] border-2 hover:bg-ammo-600">
              ⏎
            </div>
          </Link>
        </>
      )}
      <Outlet />
    </div>
  )
}
