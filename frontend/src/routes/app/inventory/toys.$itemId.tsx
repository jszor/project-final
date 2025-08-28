import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/inventory/toys/$itemId')({
  component: ToyItem,
})

function ToyItem() {
  const { itemId } = Route.useParams()
  return <div>Hello "/app/inventory/toys/${itemId}"!</div>
}
