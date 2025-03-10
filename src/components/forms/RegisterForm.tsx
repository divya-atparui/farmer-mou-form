"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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

import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePostRegister } from "@/api/auth/use-post-register";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useState } from "react";
import { triggerOtp } from "@/api/auth/auth";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  otp: z.string().min(6, {
    message: "OTP must be at least 6 characters.",
  }),
});

export default function RegisterForm() {
  const router = useRouter();
  // OTP related states
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  // Add a countdown timer for resend OTP
  const [resendTimer, setResendTimer] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      phoneNumber: "",
      otp: "",
    },
  });

  const { mutate: register, isPending: isRegistering } = usePostRegister();

  // Validate phone number
  const validatePhoneNumber = (value: string) => {
    if (!value || value.length < 10) {
      setPhoneError('Please enter a valid phone number');
      return false;
    }
    setPhoneError('');
    return true;
  };

  // Start countdown timer for resend OTP
  const startResendTimer = () => {
    setResendTimer(30); // 30 seconds countdown
    const interval = setInterval(() => {
      setResendTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  // Handle sending OTP
  const handleSendOtp = async (isResend = false) => {
    const phoneNumber = form.getValues('phoneNumber');
    
    if (!validatePhoneNumber(phoneNumber)) {
      return;
    }

    // Only check these if not resending
    if (!isResend) {
      if (!form.getValues('fullName')) {
        toast.error('Please enter your full name');
        return;
      }

      if (!form.getValues('email')) {
        toast.error('Please enter your email');
        return;
      }

      if (!form.getValues('password')) {
        toast.error('Please enter your password');
        return;
      }
    }

    setIsSendingOtp(true);
    
    try {
      await triggerOtp({ phoneNumber });
      toast.success(isResend ? 'OTP resent successfully!' : 'OTP sent successfully!');
      setShowOtpInput(true);
      setOtpSent(true);
      // Start the resend timer
      startResendTimer();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send OTP');
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!otpSent) {
      toast.error('Please send OTP to your phone first');
      return;
    }

    const otp = values.otp;
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    register(
      {
        email: values.email,
        password: values.password,
        fullName: values.fullName,
        phoneNumber: values.phoneNumber,
        otp: values.otp,
      },
      {
        onSuccess: () => {
          setOtpVerified(true);
          toast.success("Registration successful!");
          router.push("/login");
        },
        onError: (error) => {
          toast.error("Please Try Again: " + error.message);
        },
      }
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-6 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-blue-500">
            Create an Account
          </h1>
          <p className="text-blue-500">Enter your details to register</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john@example.com"
                      type="email"
                      {...field}
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
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel> 
                  <div className="space-y-2">
                    <FormControl>
                      <PhoneInput
                        international
                        defaultCountry="IN"
                        placeholder="Enter phone number"
                        value={field.value}
                        onChange={field.onChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                        disabled={otpSent}
                      />
                    </FormControl>
                    {phoneError && <p className="text-sm text-red-500">{phoneError}</p>}
                    {!otpSent && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => handleSendOtp(false)}
                        disabled={isSendingOtp}
                        className="w-full"
                      >
                        {isSendingOtp ? "Sending OTP..." : "Send OTP"}
                      </Button>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {showOtpInput && (
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OTP Verification</FormLabel>
                    <div className="space-y-2">
                      <FormControl>
                        <Input 
                          placeholder="Enter 6-digit OTP" 
                          {...field}
                          disabled={otpVerified}
                          maxLength={6}
                          inputMode="numeric"
                          type="text"
                          className="text-center tracking-wider"
                          onChange={(e) => {
                            // Only allow digits
                            const value = e.target.value.replace(/\D/g, '');
                            if (value.length <= 6) {
                              field.onChange(value);
                            }
                          }}
                        />
                      </FormControl>
                      <div className="flex gap-2">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => handleSendOtp(true)}
                          disabled={isSendingOtp || resendTimer > 0}
                          className="w-full"
                        >
                          {isSendingOtp 
                            ? "Sending..." 
                            : resendTimer > 0 
                              ? `Resend in ${resendTimer}s` 
                              : "Resend OTP"}
                        </Button>
                      </div>
                      {otpVerified && (
                        <p className="text-sm text-green-500">OTP verified successfully</p>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isRegistering || !otpSent || !form.getValues('otp')}
            >
              {isRegistering ? "Processing..." : "Verify & Register"}
            </Button>
            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
