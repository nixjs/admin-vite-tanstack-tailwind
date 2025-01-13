import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/staking-config/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/staking-config/"!</div>
}
