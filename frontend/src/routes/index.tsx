import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Link to="/test">
        <h1>Test</h1>
      </Link>
    </>
  );
}
