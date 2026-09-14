import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/edit/$facilityId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/edit/$facilityId"!</div>
}
