import { createFileRoute, Link, useLocation, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'
import { usePetStore } from '../../../store/pet'

export const Route = createFileRoute('/app/inventory/toys')({
  component: Toys,
})

function Toys() {
  const { fetchPet, toyItems, loading, error } = usePetStore()
  const location = useLocation()
  
  // Check if user is viewing a specific toy item
  const isViewingItem = location.pathname.includes('/toys/')

  // Fetch pet data on mount
  useEffect(() => {
    fetchPet()
  }, [fetchPet])

  // If viewing a specific item, render the outlet for the child route
  if (isViewingItem) {
    return <Outlet />
  }

  const toys = toyItems() 

  if (loading) return <p className="text-center">Loading toys...</p>
  if (error) return <p className="text-center">Error: {error}</p>
  
  if (!toys.length) {
    return (
      <div className="flex flex-col justify-center items-center gap-8">
        <p className="text-center px-[3rem]">Currently no toys in inventory.</p>
        <Link to="/app/inventory">
          <div className="text-[1.5rem] w-[75px] pt-1 pb-3 pr-6 pl-5 rounded-[25px] border-2 hover:bg-ammo-600">
            ⏎
          </div>
      </Link>
      </div>
    )
  }

  return (
    <>
      <h2>TOYS:</h2>
      <ul className="flex flex-col gap-[2rem]">
        {toys.map((item) => (
          <li key={item.itemName} className="text-[16px]">
            <Link to="/app/inventory/toys/$itemId" params={{ itemId: item.itemName }}>
              <div className="flex justify-between w-[100%]">
                <p className="flex-1 hover:underline">{item.itemName}</p>
                <p className="mx-[2rem]">...............</p>
                <p className="w-[50px]">x {item.quantity}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/app/inventory">
        <div className="text-[1.5rem] pt-1 pb-3 pr-6 pl-5 rounded-[25px] border-2 hover:bg-ammo-600">
          ⏎
        </div>
      </Link>
    </>
  )
}
