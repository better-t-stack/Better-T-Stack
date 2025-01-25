import { ModeToggle } from "@/components/mode-toggle";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <div className="p-2 flex gap-4 text-lg">
          <Link
            to="/"
            activeProps={{
              className: "font-bold",
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            activeProps={{
              className: "font-bold",
            }}
            activeOptions={{ exact: true }}
          >
            Dashboard
          </Link>
          <Link
            to="/about"
            activeProps={{
              className: "font-bold",
            }}
          >
            About
          </Link>
        </div>
        <ModeToggle />
      </div>
      <hr />
      <Outlet />
    </div>
  );
}
