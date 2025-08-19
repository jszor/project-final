import { createFileRoute } from '@tanstack/react-router'

export const About = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">About</h1>
    </div>
  )
}

export const Route = createFileRoute('/about')({
  component: About,
})