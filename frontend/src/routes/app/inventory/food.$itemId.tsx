import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/inventory/food/$itemId')({
  component: FoodItem,
})

function FoodItem() {
  const { itemId } = Route.useParams()
  return <div>Hello "/app/inventory/food/${itemId}"!</div>
}
