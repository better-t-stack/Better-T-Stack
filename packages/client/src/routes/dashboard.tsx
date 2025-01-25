import { authClient } from "@/lib/auth-client";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
  loader: async ({ context: { trpcQueryUtils } }) => {
    await trpcQueryUtils.healthCheck.ensureData();
    await trpcQueryUtils.privateData.ensureData();
    return;
  },
});

function RouteComponent() {
  const { data: session, isPending } = authClient.useSession();

  const navigate = Route.useNavigate();

  useEffect(() => {
    if (!session && !isPending) {
      navigate({
        to: "/",
      });
    }
  }, [session, isPending]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {session?.user.name}</p>
    </div>
  );
}
