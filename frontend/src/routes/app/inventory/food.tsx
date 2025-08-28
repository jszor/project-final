import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { usePetStore } from '../../../store/pet'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/app/inventory/food')({
  component: Food,
})

function Food() {
  const { fetchPet, foodItems, loading, error } = usePetStore()

  // Fetch pet data on mount
  useEffect(() => {
    fetchPet()
  }, [fetchPet])

  const foods = foodItems() // get only food items

  if (loading) return <p>Loading food items...</p>
  if (error) return <p>Error: {error}</p>
  if (!foods.length) return <p>No food items in inventory.</p>

  return (
    <>
      <h2>FOOD:</h2>
      <ul className="flex flex-col gap-[2rem]">
        {foods.map((item) => (
          <li key={item.itemName} className="text-[16px]">
            <Link to="/app/inventory/food/$itemId" params={{ itemId: item.itemName }}>
              <div className="flex justify-between w-[100%]">
                <p className="flex-1 hover:underline">{item.itemName}</p>
                <p className="mx-[2rem]">...............</p>
                <p className="w-[50px]">x {item.quantity}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}