import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/store')({
  component: Store,
})

function Store() {
  return <div>Hello "/app/store"!</div>
}
