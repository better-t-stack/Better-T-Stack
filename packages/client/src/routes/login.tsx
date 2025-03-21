import { createFileRoute } from "@tanstack/react-router";
import SignUp from "@/components/sign-up-form";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <SignUp />
    </div>
  );
}
