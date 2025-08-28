import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/inventory/toys')({
  component: Toys,
})

function Toys() {
  return <div>Hello "/app/inventory/toys"!</div>
}
