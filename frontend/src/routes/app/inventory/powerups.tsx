import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/inventory/powerups')({
  component: Powerups,
})

function Powerups() {
  return <div>Hello "/app/inventory/powerups"!</div>
}
