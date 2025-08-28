import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/app/menu')({
  component: Menu,
})

function Menu() {
  return (
    <div className="flex flex-col h-full justify-center items-center text-ammo-100 text-[1.5rem] gap-[3rem]">
      <h2 className="text-[1.5rem]">
        MAIN MENU:
      </h2>
      <Link to="/app/exercises">quests</Link>
      <Link to="/app/inventory">inventory</Link>
      <Link to="/app/store">store</Link>
      <Link to="/app/stats">stats</Link>
      <Link to="/app/leaderboard">leaderboard</Link>
      <Link to="/app/settings">settings</Link>
    </div>
  )
}
