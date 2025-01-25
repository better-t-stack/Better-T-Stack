import SignUp from '@/components/sign-up-form'
import { trpc } from '@/utils/trpc'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/')({
  component: HomeComponent,
})

function HomeComponent() {
  const healthCheck = trpc.healthCheck.useQuery()
  const privateData = trpc.privateData.useQuery()
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <Link to="/dashboard">Go to Dashboard</Link>
      <p>healthCheck: {healthCheck.data}</p>
      <p>privateData: {privateData.data?.message}</p>
      <SignUp />
    </div>
  )
}
