import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/inventory/powerups/$itemId')({
  component: PowerupItem,
})

function PowerupItem() {
  const { itemId } = Route.useParams()
  return <div>Hello "/app/inventory/powerups/${itemId}"!</div>
}
