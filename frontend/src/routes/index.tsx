import { createFileRoute } from '@tanstack/react-router'

export const Index = () => {
  return (
    <div className="p-4 h-120">
      <h1 className="text-2xl">Main content of the landing page goes here</h1>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Index,
})