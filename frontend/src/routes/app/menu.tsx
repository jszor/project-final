import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/menu')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <p>hi</p>
    </div>
  )
}
