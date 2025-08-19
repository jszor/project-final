import { createFileRoute } from '@tanstack/react-router'

export const Index = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome Home!</h1>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Index,
})