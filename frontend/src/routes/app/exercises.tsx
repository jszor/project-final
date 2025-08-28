import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/exercises')({
  component: Exercises,
})

function Exercises() {
  return <div>Hello "/app/exercises"!</div>
}
