import { authClient } from "@/lib/auth-client";
import { signInSchema, signUpSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import Loader from "./loader";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

export default function AuthForm() {
  const navigate = useNavigate({
    from: "/",
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const { isPending } = authClient.useSession();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(isSignUp ? signUpSchema : signInSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const signInWithGithub = async () => {
    try {
      await authClient.signIn.social(
        {
          provider: "github",
          callbackURL: "http://localhost:3001/dashboard",
        },
        {
          onSuccess: () => {
            toast.success("GitHub sign in successful");
            navigate({
              to: "/dashboard",
            });
          },
          onError: (err) => {
            toast.error(`GitHub sign in failed: ${err.error.message}`);
          },
        },
      );
    } catch (error) {
      toast.error("GitHub authentication failed");
    }
  };

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    if (isSignUp) {
      await authClient.signUp.email(
        {
          email: values.email,
          password: values.password,
          name: values.name,
        },
        {
          onSuccess: () => {
            toast.success("Sign up successful");
            navigate({
              to: "/dashboard",
            });
          },
          onError: (ctx) => {
            form.setError("email", {
              type: "manual",
              message: ctx.error.message,
            });
          },
        },
      );
    } else {
      await authClient.signIn.email(
        {
          email: values.email,
          password: values.password,
        },
        {
          onSuccess: () => {
            toast.success("Sign in successful");
            navigate({
              to: "/dashboard",
            });
          },
          onError: (ctx) => {
            form.setError("email", {
              type: "manual",
              message: ctx.error.message,
            });
          },
        },
      );
    }
  };

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="mx-auto mt-10 max-w-md p-6">
      <h1 className="mb-6 text-center text-3xl font-bold">
        {isSignUp ? "Create Account" : "Welcome Back"}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {isSignUp && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
        </form>
      </Form>

      <div className="mt-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Button
          onClick={signInWithGithub}
          variant="outline"
          className="flex w-full items-center justify-center gap-2"
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          Continue with GitHub
        </Button>
      </div>

      <div className="mt-4 text-center">
        <Button
          variant="link"
          onClick={() => {
            setIsSignUp(!isSignUp);
            form.reset();
          }}
          className="text-indigo-600 hover:text-indigo-800"
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : "Need an account? Sign Up"}
        </Button>
      </div>
    </div>
  );
}
