import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect } from 'react'
import { usePetStore } from '../../store/pet'

export const Route = createFileRoute('/app/stats')({
  component: Stats,
})

function Stats() {
  const { pet, fetchPet, loading, error } = usePetStore()

  // Fetch pet data when component mounts or user navigates to this page
  useEffect(() => {
    fetchPet()
  }, [fetchPet])

  if (loading) {
    return <div className="flex flex-col h-full justify-center items-center text-center px-[1.5rem] text-ammo-100 text-[0.75rem] xs:text-[1rem] sm:text-[1.5rem]">Loading pet stats...</div>
  }

  if (error) {
    return <div className="flex flex-col h-full justify-center items-center text-center px-[2rem] text-ammo-100 text-[0.75rem] xs:text-[1rem] sm:text-[1.5rem]">Error: {error}</div>
  }

  if (!pet) {
    return <div className="flex flex-col h-full justify-center items-center text-center px-[2rem] text-ammo-100 text-[0.75rem] xs:text-[1rem] sm:text-[1.5rem]">No pet found</div>
  }

  return (
    <div className="flex flex-col gap-[1.5rem] h-full justify-center items-center text-ammo-100">
      <h2 className="text-[0.75rem] xs:text-[1rem] sm:text-[1.5rem] mb-[1rem] text-center">PET STATS:</h2>
      <ul className="flex flex-col gap-[1rem] text-[0.625rem] xs:text-[1rem] sm:text-[1.125rem]">
        <li className="text-center">
          <span>Name: </span>
          <span>{pet.name}</span>
        </li>
        <li className="text-center">
          <span>Born on: </span>
          <span>{new Date(pet.bornAt).toLocaleDateString()}</span>
        </li>
        <li className="text-center">
          <span>Health: </span>
          <span>{pet.health}</span>
        </li>
        <li className="text-center">
          <span>Happiness: </span>
          <span>{pet.happiness}</span>
        </li>
        <li className="text-center">
          <span>Hunger: </span>
          <span>{pet.hunger}</span>
        </li>
        <li className="text-center">
          <span>Pooped: </span>
          <span>{pet.conditions.isPooped ? 'Yes' : 'No'}</span>
        </li>
        <li className="text-center">
          <span>Sick: </span>
          <span>{pet.conditions.isSick ? 'Yes' : 'No'}</span>
        </li>
        <li className="text-center">
          <span>Coins: x</span>
          <span>{pet.coins}</span>
        </li>
        <li className="text-center">
          <span>Status: </span>
          <span>{pet.status}</span>
        </li>
        <li className="text-center">
          <span>Active Powerups: </span>
          <span>{pet.activePowerups.length > 0 ? pet.activePowerups.map(p => p.type).join(', ') : 'None'}</span>
        </li>
      </ul>
      <Link to="/app/menu">
        <div className="text-[0.75rem] xs:text-[1rem] sm:text-[1.5rem] mt-[1rem] pt-1 pb-3 pr-6 pl-5 rounded-[25px] border-2 hover:bg-ammo-600">
          ⏎
        </div>
      </Link>
    </div>
  )
}
