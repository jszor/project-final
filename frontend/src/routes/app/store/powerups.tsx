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

  if (loading) return <p className="text-center">Loading powerups...</p>
  if (error) return <p className="text-center">Error: {error}.</p>
  
  if (!powerups.length) {
    return (
      <div className="flex flex-col justify-center items-center gap-8">
        <p className="text-center px-[3rem]">No powerups in the store.</p>
        <Link to="/app/store">
          <div className="text-[1.5rem] w-[75px] pt-1 pb-3 pr-6 pl-5 rounded-[25px] border-2 hover:bg-ammo-600">
            ⏎
          </div>
        </Link>
      </div>
    )
  }

  return (
    <>
      <h2>POWERUPS:</h2>
      <ul className="flex flex-col gap-[2rem]">
        {powerups.map((item) => (
          <li key={item._id} className="text-[16px]">
            <Link to="/app/store/powerups/$itemId" params={{ itemId: item.name }}>
              <div className="flex justify-between w-[100%]">
                <p className="flex-1 hover:underline">{item.name}</p>
                <p className="mx-[2rem]">...............</p>
                <p className="w-[50px]">{item.price}¢</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/app/store">
        <div className="text-[1.5rem] pt-1 pb-3 pr-6 pl-5 rounded-[25px] border-2 hover:bg-ammo-600">
          ⏎
        </div>
      </Link>
    </>
  )
}
