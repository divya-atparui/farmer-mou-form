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
import { Eye, EyeOff, Phone, Lock } from "lucide-react";
import { useState } from "react";

const loginSchema = z.object({
  phoneNumber: z.string().min(1, "Phone number is required"),
  password: z.string().min(4, "Password must be at least 8 characters"),
});

export default function LoginForm() {
  const router = useRouter();
  const { mutate: login, isPending } = usePostLogin();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-6 rounded-lg border bg-white p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-blue-500">Welcome Back</h1>
          <p className="text-sm text-gray-500">Please sign in to continue</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <PhoneInput
                        international
                        defaultCountry="IN"
                        placeholder="Enter phone number"
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value || '');
                        }}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10"
                      />
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    </div>
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
                  <FormLabel className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                        {...field}
                        className="pl-10 pr-10"
                      />
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-sm mr-2"></span>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <div className="flex flex-col space-y-2 text-sm mt-4">
              <Link 
                href="/login/otp" 
                className="text-blue-500 hover:underline text-center"
              >
                Forgot password? Login with OTP
              </Link>
              <p className="text-center">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-blue-500 hover:underline">
                  Register now
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
