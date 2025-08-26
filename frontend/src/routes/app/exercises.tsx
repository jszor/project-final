import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/exercises')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/exercises"!</div>
}
