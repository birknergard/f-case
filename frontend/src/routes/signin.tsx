import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/signin")({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    const { isAuthenticated, loading } = context.auth;
    if (isAuthenticated && !loading) {
      throw redirect({
        to: "/start",
      });
    }
  },
});

function RouteComponent() {
  return <SignInAuthScreen onSignIn={() => {}} />;
}
