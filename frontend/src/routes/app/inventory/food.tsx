import { createFileRoute, Link, useLocation, Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'
import { usePetStore } from '../../../store/pet'

export const Route = createFileRoute('/app/inventory/food')({
  component: Food,
})

function Food() {
  const { fetchPet, foodItems, loading, error } = usePetStore()
  const location = useLocation()
  
  // Check if user is viewing a specific food item
  const isViewingItem = location.pathname.includes('/food/')

  // Fetch pet data on mount
  useEffect(() => {
    fetchPet()
  }, [fetchPet])

  // If viewing a specific item, render the outlet for the child route
  if (isViewingItem) {
    return <Outlet />
  }

  const foods = foodItems() 

  if (loading) return <p className="text-center px-[1.5rem] text-[0.75rem] xs:text-[1rem] sm:text-[1.5rem]">Loading food items...</p>
  if (error) return <p className="text-center text-[0.75rem] xs:text-[1rem] sm:text-[1.5rem]">Error: {error}.</p>
  
  if (!foods.length) {
    return (
      <div className="flex flex-col justify-center items-center gap-8">
        <p className="text-center px-[3rem] text-[0.75rem] xs:text-[1rem] sm:text-[1.5rem]">Currently no food in inventory.</p>
        <Link to="/app/inventory">
          <div className="text-[0.75rem] xs:text-[1rem] sm:text-[1.5rem] pt-1 pb-3 pr-6 pl-5 rounded-[25px] border-2 hover:bg-ammo-600">
            ⏎
          </div>
      </Link>
      </div>
    )
  }

  return (
    <>
      <h2 className="text-[0.75rem] xs:text-[1rem] sm:text-[1.5rem]">FOOD:</h2>
      <ul className="flex flex-col gap-[2rem]">
        {foods.map((item) => (
          <li key={item.itemName} className="text-[12px] xs:text-[16px]">
            <Link to="/app/inventory/food/$itemId" params={{ itemId: item.itemName }}>
              <div className="flex justify-between items-center w-full gap-2 sm:gap-0">
                <p className="flex-1 min-w-0 hover:underline truncate">{item.itemName}</p>
                <p className="hidden sm:block mx-[2rem] flex-shrink-0">......</p>
                <p className="w-[50px] flex-shrink-0 text-right">x {item.quantity}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/app/inventory">
        <div className="text-[0.75rem] xs:text-[1rem] sm:text-[1.5rem] pt-1 pb-3 pr-6 pl-5 rounded-[25px] border-2 hover:bg-ammo-600">
          ⏎
        </div>
      </Link>
    </>
  )
}