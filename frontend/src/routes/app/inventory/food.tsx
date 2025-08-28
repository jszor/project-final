import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/inventory/food')({
  component: Food,
})

function Food() {
  return <div>Hello "/app/inventory/food"!</div>
}
