import { createFileRoute } from '@tanstack/react-router'
import { Features } from "../components/landing/Features"

export const Index = () => {
  return (
    <div>
      <Features />
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: Index,
})