import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import SignUp from "@/components/sign-up-form";
import { trpc } from "@/utils/trpc";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const healthCheck = trpc.healthCheck.useQuery();
  const privateData = trpc.privateData.useQuery();
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <p>healthCheck: {healthCheck.data}</p>
      <p>privateData: {privateData.data?.message}</p>
      <SignUp />
    </div>
  );
}
