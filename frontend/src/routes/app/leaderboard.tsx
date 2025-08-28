import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/leaderboard')({
  component: Leaderboard,
})

function Leaderboard() {
  return <div>Hello "/app/leaderboard"!</div>
}
