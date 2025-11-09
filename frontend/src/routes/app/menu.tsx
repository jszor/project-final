import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/app/menu')({
  component: Menu,
})

function Menu() {
  return (
    <div className="flex flex-col h-full justify-center items-center text-ammo-100 text-[0.75rem] xs:text-[1rem] sm:text-[1.5rem] gap-[2rem] xs:gap-[3rem]">
      <h2 className="text-[0.75rem] xs:text-[1rem] sm:text-[1.5rem] text-center">
        MAIN MENU:
      </h2>
        <Link to="/app/inventory" className="hover:underline">inventory</Link>
        <Link to="/app/store" className="hover:underline">store</Link>
        <Link to="/app/stats" className="hover:underline">stats</Link>
    </div>
  )
}
