import { createFileRoute, Link } from '@tanstack/react-router'
import { useParams } from '@tanstack/react-router'
import { useEffect } from 'react'
import { usePetStore } from '../../../store/pet'
import { useStoreStore } from '../../../store/store'

export const Route = createFileRoute('/app/inventory/food/$itemId')({
  component: FoodItem,
})

function FoodItem() {
  const { itemId } = useParams({ from: '/app/inventory/food/$itemId' })
  const { pet, fetchPet } = usePetStore()
  const { items: storeItems, fetchItems } = useStoreStore()

  useEffect(() => {
    fetchPet()
    fetchItems() 
  }, [fetchPet, fetchItems])

  if (!pet) return <p>Loading pet data...</p>
  const inventoryItem = pet.inventory.find((i) => i.itemName === itemId)
  if (!inventoryItem) return <p>Item not found in your inventory.</p>

  const storeItem = storeItems.find((i) => i.name === itemId)
  if (!storeItem) return <p>Loading item details...</p>

  return (
    <div className="flex flex-col h-full justify-center items-center text-ammo-100 text-[1rem] gap-[2rem]">
      <h2 className="text-[1.5rem]">{storeItem.name}</h2>
      <p className="underline">Description:</p> 
      <p className="max-w-[80%] text-center">{storeItem.description || 'No description available'}</p>
      <p className="underline">Quantity:</p>
      <p>x {inventoryItem.quantity}</p>

      {storeItem.effects.length > 0 && (
        <>
          <p className="underline">Effects:</p>
          <ul>
            {storeItem.effects.map((effect, idx) => (
              <li key={idx}>{effect.stat} +{effect.amount}</li>
            ))}
          </ul>
        </>
      )}

      {storeItem.powerup && (
        <p>Powerup: {storeItem.powerup.type} ({storeItem.powerup.duration / 1000}s)</p>
      )}
      <Link to="/app/inventory/food">
        <div className="text-[1.5rem]">
          ⏎
        </div>
      </Link>
    </div>
  )
}
