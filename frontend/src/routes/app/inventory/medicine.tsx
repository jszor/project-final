import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/inventory/medicine')({
  component: Medicine,
})

function Medicine() {
  return <div>Hello "/app/inventory/medicine"!</div>
}
