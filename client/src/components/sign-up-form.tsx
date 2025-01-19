"use client";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

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

      <input
        type="name"
        value={name}
        className="border"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        value={email}
        className="border"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="border"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signUp}>Sign Up</button>
    </div>
  );
}
