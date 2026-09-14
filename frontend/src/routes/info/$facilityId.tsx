import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/info/$facilityId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/info/$facilityId"!</div>
}
