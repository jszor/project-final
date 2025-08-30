import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { usePetStore } from '../../../store/pet'
import { useStoreStore } from '../../../store/store'

export const Route = createFileRoute('/app/inventory/toys/$itemId')({
  component: ToyItem,
})

function ToyItem() {
  const { itemId } = useParams({ from: '/app/inventory/toys/$itemId' })
  const { pet, fetchPet, useItem } = usePetStore()
  const { items: storeItems, fetchItems } = useStoreStore()
  const [using, setUsing] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    fetchPet()
    fetchItems() 
  }, [fetchPet, fetchItems])

  if (!pet) return <p>Loading pet data...</p>

  const inventoryItem = pet.inventory.find((i) => i.itemName === itemId)
  if (!inventoryItem) {
    return (
      <div className="flex flex-col justify-center items-center gap-8">
        <p className="text-center px-[2rem]">Item not currently found in your inventory.</p>
        <Link to="/app/inventory/toys">
          <div className="text-[1.5rem] w-[75px] pt-1 pb-3 pr-6 pl-5 rounded-[25px] border-2 hover:bg-ammo-600">
            ⏎
          </div>
      </Link>
      </div>
    )
  } 

  const storeItem = storeItems.find((i) => i.name === itemId)
  if (!storeItem) return <p>Loading item details...</p>

  const handleUse = async () => {
    setUsing(true)
    setSuccessMsg('')
    const result = await useItem(inventoryItem.itemName);
    setSuccessMsg(result.message);
    setUsing(false);
  }

  return (
    <div className="flex flex-col h-full justify-center items-center text-ammo-100 text-[1rem] gap-[2rem]">
      <h2 className="text-[1.5rem]">&lt;{storeItem.name}&gt;</h2>
      <p className="underline">Description:</p> 
      <p className="max-w-[80%] text-center px-[1.5rem]">{storeItem.description || 'No description available'}</p>
      <p className="underline">Quantity:</p>
      <p>x {inventoryItem.quantity}</p>

      {storeItem.effects.length > 0 && (
        <>
          <p className="underline">Effects:</p>
          <ul>
            {storeItem.effects.map((effect, idx) => (
              <li key={idx} className="text-center">{effect.stat} +{effect.amount}</li>
            ))}
          </ul>
        </>
      )}

      {storeItem.powerup && (
        <>
          <p className="underline">Duration:</p>
          <p>
              {storeItem.powerup.duration >= 3600000
                ? `${(storeItem.powerup.duration / 3600000)} hours`
                : `${storeItem.powerup.duration / 60000} minutes`}
          </p>
        </>
      )}

      {successMsg && <p className="text-ammo-100 text-center px-[2rem]">"{successMsg}"</p>}
      <div className="flex gap-8">
        <button
          onClick={handleUse}
          disabled={using || inventoryItem.quantity <= 0}
          className="text-ammo-100 border-2 hover:bg-ammo-600 cursor-pointer px-6 py-3 rounded-[25px] disabled:opacity-50"
        >
          Play
        </button>

        <Link to="/app/inventory/toys">
          <div className="text-[1.5rem] pt-1 pb-3 pr-6 pl-5 rounded-[25px] border-2 hover:bg-ammo-600">
            ⏎
          </div>
        </Link>
      </div>
    </div>
  )
}
