import { createFileRoute, Link, useLocation, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useStoreStore } from '../../../store/store'

export const Route = createFileRoute('/app/store/powerups')({
  component: Powerups,
})

function Powerups() {
  const { items, fetchItems, loading, error } = useStoreStore()
  const location = useLocation()

  // Check if user is viewing a specific store item
  const isViewingItem = location.pathname.includes('/powerups/')

  // Fetch store data on mount
  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  // If viewing a specific item, render the outlet for the child route
  if (isViewingItem) {
    return <Outlet />
  }

  // Filter for powerups category
  const powerups = items.filter((i) => i.category === 'powerup')

  if (loading) return <p className="text-center px-[1.5rem] text-[0.75rem] xs:text-[1rem] sm:text-[1.5rem]">Loading powerups...</p>
  if (error) return <p className="text-center text-[0.75rem] xs:text-[1rem] sm:text-[1.5rem]">Error: {error}.</p>
  
  if (!powerups.length) {
    return (
      <div className="flex flex-col justify-center items-center gap-8">
        <p className="text-center px-[3rem] text-[0.75rem] xs:text-[1rem] sm:text-[1.5rem]">No powerups in the store.</p>
        <Link to="/app/store">
          <div className="text-[0.75rem] xs:text-[1rem] sm:text-[1.5rem] w-[75px] pt-1 pb-3 pr-6 pl-5 rounded-[25px] border-2 hover:bg-ammo-600">
            ⏎
          </div>
        </Link>
      </div>
    )
  }

  return (
    <>
      <h2 className="text-[0.75rem] xs:text-[1rem] sm:text-[1.5rem]">POWERUPS:</h2>
      <ul className="flex flex-col gap-[2rem]">
        {powerups.map((item) => (
          <li key={item._id} className="text-[12px] xs:text-[16px]">
            <Link to="/app/store/powerups/$itemId" params={{ itemId: item.name }}>
              <div className="flex justify-between items-center w-full gap-2 sm:gap-0">
                <p className="flex-1 min-w-0 hover:underline truncate">{item.name}</p>
                <p className="hidden sm:block mx-[2rem] flex-shrink-0">......</p>
                <p className="w-[50px] flex-shrink-0 text-right">{item.price}¢</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/app/store">
        <div className="text-[0.75rem] xs:text-[1rem] sm:text-[1.5rem] pt-1 pb-3 pr-6 pl-5 rounded-[25px] border-2 hover:bg-ammo-600">
          ⏎
        </div>
      </Link>
    </>
  )
}
