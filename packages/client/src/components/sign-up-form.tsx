"use client";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { data: session, isPending, error } = authClient.useSession();

  const signUp = async () => {
    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onRequest: (ctx) => {},
        onSuccess: (ctx) => {
          console.log(ctx.data);
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      },
    );
  };

  return (
    <div>
      <div>session: {session?.user.name}</div>
      <Input
        type="name"
        value={name}
        className="border"
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="email"
        value={email}
        className="border"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        className="border"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={signUp}>Sign Up</Button>
    </div>
  );
}
