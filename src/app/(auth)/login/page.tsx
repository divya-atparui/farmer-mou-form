"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import { loginSchema } from "@/app/types/schema";
import type { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePostLogin } from "@/api/auth/use-post-login";
import { useQueryClient } from "@tanstack/react-query";

export default function LoginPage() {
  const router = useRouter();
  const { mutate: login, isPending } = usePostLogin();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    login({
      email: values.email,
      password: values.password
    }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['userLandDetails'] });
        toast.success("Login successful!");  
        router.push("/");
      },
      onError: (error) => {
        toast.error(error.message || "Login failed. Please try again.");
      },
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-6 shadow-lg">
        <div className="space-y-2 text-center">

          <h1 className="text-3xl font-bold text-blue-500">Welcome Back</h1>
          <p className="text-blue-500">Please sign in to continue</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" type="email" {...field} />
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
                    <Input placeholder="Enter your password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Signing in..." : "Sign In"}
            </Button>
            <p className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-blue-500 hover:underline">
                Register
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  )
}