import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/privpolicy')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/privpolicy"!</div>
}
