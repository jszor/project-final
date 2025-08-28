import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/inventory/medicine/$itemId')({
  component: MedicineItem,
})

function MedicineItem() {
  const { itemId } = Route.useParams()
  return <div>Hello "/app/inventory/medicine/${itemId}"!</div>
}
