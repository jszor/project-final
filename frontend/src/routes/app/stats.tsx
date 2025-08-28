import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/stats')({
  component: Stats,
})

function Stats() {
  return <div>Hello "/app/stats"!</div>
}
