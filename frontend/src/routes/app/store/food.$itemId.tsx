import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { usePetStore } from '../../../store/pet'
import { useStoreStore } from '../../../store/store'

export const Route = createFileRoute('/app/store/food/$itemId')({
  component: FoodItem,
})

function FoodItem() {
  const { itemId } = useParams({ from: '/app/store/food/$itemId' })
  const { items: storeItems, fetchItems, buyItem } = useStoreStore()
  const { pet, fetchPet } = usePetStore()
  const [buying, setBuying] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchItems()
    fetchPet()
  }, [fetchItems, fetchPet])

  if (!storeItems.length) return <p>Loading store items...</p>
  if (!pet) return <p>Loading pet data...</p>

  const storeItem = storeItems.find((i) => i.name === itemId)
  if (!storeItem) {
    return (
      <div className="flex flex-col justify-center items-center gap-8">
        <p className="text-center px-[2rem]">Item not found in the store.</p>
        <Link to="/app/store/food">
          <div className="text-[1.5rem] w-[75px] pt-1 pb-3 pr-6 pl-5 rounded-[25px] border-2 hover:bg-ammo-600">
            ⏎
          </div>
        </Link>
      </div>
    )
  }

  const handleBuy = async () => {
    setBuying(true)
    setMessage('')
    const result = await buyItem(storeItem.name)
    setMessage(result.message)
    setBuying(false)
  }

  return (
    <div className="flex flex-col h-full justify-center items-center text-ammo-100 text-[1rem] gap-[2rem]">
      <h2 className="text-[1.5rem]">&lt;{storeItem.name}&gt;</h2>
      <p className="underline">Description:</p> 
      <p className="max-w-[80%] text-center px-[1.5rem]">{storeItem.description || 'No description available'}</p>
      <p className="underline">Price:</p>
      <p>{storeItem.price} coins</p>

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
              ? `${storeItem.powerup.duration / 3600000} hours`
              : `${storeItem.powerup.duration / 60000} minutes`}
          </p>
        </>
      )}

      {message && <p className="text-ammo-100 text-center px-[2rem]">"{message}"</p>}
      <div className="flex gap-8">
        <button
          onClick={handleBuy}
          disabled={buying}
          className="text-ammo-100 border-2 hover:bg-ammo-600 cursor-pointer px-6 py-3 rounded-[25px] disabled:opacity-50"
        >
          Buy
        </button>

        <Link to="/app/store/food">
          <div className="text-[1.5rem] pt-1 pb-3 pr-6 pl-5 rounded-[25px] border-2 hover:bg-ammo-600">
            ⏎
          </div>
        </Link>
      </div>
    </div>
  )
}
