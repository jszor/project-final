import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { usePetStore } from '../../../store/pet'
import { useStoreStore } from '../../../store/store'

export const Route = createFileRoute('/app/inventory/food/$itemId')({
  component: FoodItem,
})

function FoodItem() {
  const { itemId } = useParams({ from: '/app/inventory/food/$itemId' })
  const { pet, fetchPet, useItem } = usePetStore()
  const { items: storeItems, fetchItems } = useStoreStore()
  const [using, setUsing] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    fetchPet()
    fetchItems() 
  }, [fetchPet, fetchItems])

  if (!pet) return <p className="text-[0.75rem] xs:text-[1rem] sm:text-[1.5rem] text-center px-[1.5rem]">Loading pet data...</p>

  const inventoryItem = pet.inventory.find((i) => i.itemName === itemId)
  if (!inventoryItem) {
    return (
      <div className="flex flex-col justify-center items-center gap-8">
        <p className="text-center px-[2rem] text-[0.75rem] xs:text-[1rem] sm:text-[1.5rem]">Item not currently found in your inventory.</p>
        <Link to="/app/inventory/food">
          <div className="text-[1.125rem] xs:text-[1.5rem] sm:text-[1.75rem] w-[75px] pt-1 pb-3 pr-6 pl-5 rounded-[25px] border-2 hover:bg-ammo-600">
            ⏎
          </div>
      </Link>
      </div>
    )
  } 

  const storeItem = storeItems.find((i) => i.name === itemId)
  if (!storeItem) return <p className="text-[0.75rem] xs:text-[1rem] sm:text-[1.5rem] text-center px-[1.5rem]">Loading item details...</p>

  const handleUse = async () => {
    setUsing(true)
    setSuccessMsg('')
    const result = await useItem(inventoryItem.itemName);
    setSuccessMsg(result.message);
    setUsing(false);
  }

  return (
    <div className="flex flex-col h-full justify-center items-center text-ammo-100 text-[0.75rem] xs:text-[1rem] sm:text-[1.5rem] gap-[2rem]">
      <h2 className="text-[0.75rem] xs:text-[1rem] sm:text-[1.5rem]">&lt;{storeItem.name}&gt;</h2>
      <p className="underline text-[0.75rem] xs:text-[1rem] sm:text-[1.5rem]">Description:</p> 
      <p className="max-w-[80%] text-center px-[1.5rem] text-[0.75rem] xs:text-[1rem] sm:text-[1.5rem]">{storeItem.description || 'No description available'}</p>
      <p className="underline text-[0.75rem] xs:text-[1rem] sm:text-[1.5rem]">Price:</p>
      <p className="text-[0.75rem] xs:text-[1rem] sm:text-[1.5rem]">{storeItem.price} coins</p>

      {storeItem.effects.length > 0 && (
        <>
          <p className="underline text-[0.75rem] xs:text-[1rem] sm:text-[1.5rem]">Effects:</p>
          <ul>
            {storeItem.effects.map((effect, idx) => (
              <li key={idx} className="text-center text-[0.75rem] xs:text-[1rem] sm:text-[1.5rem]">{effect.stat} +{effect.amount}</li>
            ))}
          </ul>
        </>
      )}

      {storeItem.powerup && (
        <>
          <p className="underline text-[0.75rem] xs:text-[1rem] sm:text-[1.5rem]">Duration:</p>
          <p className="text-[0.75rem] xs:text-[1rem] sm:text-[1.5rem]">
              {storeItem.powerup.duration >= 3600000
                ? `${(storeItem.powerup.duration / 3600000)} hours`
                : `${storeItem.powerup.duration / 60000} minutes`}
          </p>
        </>
      )}

      {successMsg && <p className="text-ammo-100 text-center px-[2rem] text-[0.75rem] xs:text-[1rem] sm:text-[1.5rem]">"{successMsg}"</p>}
      <div className="flex gap-8">
        <button
          onClick={handleUse}
          disabled={using || inventoryItem.quantity <= 0}
          className="text-ammo-100 border-2 hover:bg-ammo-600 cursor-pointer px-6 py-3 rounded-[25px] disabled:opacity-50 text-[0.75rem] xs:text-[1rem] sm:text-[1.5rem]"
        >
          Feed
        </button>

        <Link to="/app/inventory/food">
          <div className="text-[1.125rem] xs:text-[1.5rem] sm:text-[1.75rem] pt-1 pb-3 pr-6 pl-5 rounded-[25px] border-2 hover:bg-ammo-600">
            ⏎
          </div>
        </Link>
      </div>
    </div>
  )
}
