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
import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePostLogin } from "@/api/auth/use-post-login";
import { useQueryClient } from "@tanstack/react-query";
import PhoneInput from 'react-phone-number-input';
import "react-phone-number-input/style.css";

const loginSchema = z.object({
  phoneNumber: z.string().min(1, "Phone number is required"),
  password: z.string().min(4, "Password must be at least 8 characters"),
});

export default function LoginForm() {
  const router = useRouter();
  const { mutate: login, isPending } = usePostLogin();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    // Clean the phone number before sending to API
    console.log("this is a values number",values)
    login(
      {
        phoneNumber: values.phoneNumber,
        password: values.password,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["userLandDetails"] });
          toast.success("Login successful!");
          router.push("/");
        },
        onError: (error) => {
          toast.error(error.message || "Login failed. Please try again.");
        },
      }
    );
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
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <PhoneInput
                      international
                      defaultCountry="IN"
                      placeholder="Enter phone number"
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value || '');
                      }}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                    />
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
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Signing in..." : "Sign In"}
            </Button>
            <div className="flex justify-between text-sm mt-2">
              <Link 
                href="/login/otp" 
                className="text-blue-500 hover:underline"
              >
                Forgot password? Login with OTP
              </Link>
              <Link href="/register" className="text-blue-500 hover:underline">
                Register
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
