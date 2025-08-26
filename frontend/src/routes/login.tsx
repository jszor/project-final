import { createFileRoute } from '@tanstack/react-router'

export const Login = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Log In</h1>
    </div>
  )
}

export const Route = createFileRoute('/login')({
  component: Login,
})