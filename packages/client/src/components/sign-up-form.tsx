import { authClient } from "@/lib/auth-client";
import { signInSchema, signUpSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
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
  const { data: session, isPending } = authClient.useSession();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(isSignUp ? signUpSchema : signInSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

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
    return (
      <div className="flex h-svh items-center justify-center">
        <Loader2 size="48" className="animate-spin" />
      </div>
    );
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
