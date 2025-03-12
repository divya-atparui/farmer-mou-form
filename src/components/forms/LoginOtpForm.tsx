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
import { usePostOtpLogin } from "@/api/auth/use-post-login";
import { useQueryClient } from "@tanstack/react-query";
import PhoneInput from 'react-phone-number-input';
import "react-phone-number-input/style.css";
import { useState } from "react";
import { triggerOtp } from "@/api/auth/auth";
import Image from "next/image";

const otpLoginSchema = z.object({
  phoneNumber: z.string().min(1, "Phone number is required"),
  otp: z.string().min(6, {
    message: "OTP must be at least 6 characters.",
  }),
});

export default function LoginOtpForm() {
  const router = useRouter();
  const { mutate: otpLogin, isPending: isOtpLoginPending } = usePostOtpLogin();
  const queryClient = useQueryClient();

  // OTP related states
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  const form = useForm<z.infer<typeof otpLoginSchema>>({
    resolver: zodResolver(otpLoginSchema),
    defaultValues: {
      phoneNumber: "",
      otp: "",
    },
  });

  // Validate phone number
  const validatePhoneNumber = (value: string) => {
    // Remove any spaces or special characters from the phone number
    const digitsOnly = value?.replace(/\D/g, '');
    
    if (!digitsOnly || digitsOnly.length < 10) {
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
    
    if (!phoneNumber) {
      toast.error('Please enter a phone number');
      return;
    }


    
    if (!validatePhoneNumber(phoneNumber)) {
      return;
    }

    setIsSendingOtp(true);
    
    try {
      await triggerOtp({ phoneNumber: phoneNumber });
      toast.success(isResend ? 'OTP resent successfully!' : 'OTP sent successfully!');
      setShowOtpInput(true);
      setOtpSent(true);
      startResendTimer();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send OTP');
    } finally {
      setIsSendingOtp(false);
    }
  };

  function onSubmit(values: z.infer<typeof otpLoginSchema>) {
    console.log("this is a values",values)
    if (!otpSent) {
      toast.error('Please send OTP to your phone first');
      return;
    }

    const otp = values.otp;
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    // Clean the phone number before sending to API
 

    otpLogin(
      {
        phoneNumber: values.phoneNumber,
        otp: values.otp,
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
        {/* Logo and Brand Name */}
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-3 mb-4 p-3 bg-gradient-to-r from-blue-50 to-amber-50 rounded-lg shadow-sm">
            <Image 
              src="/aurex.jpeg" 
              alt="Aurex Logo" 
              width={50} 
              height={50} 
            />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-blue-600">Aurex</span>
              <span className="text-xs text-blue-800 opacity-80">Powered by Aurigraph</span>
            </div>
          </div>
          <div className="h-px w-full bg-gray-200 my-2"></div>
        </div>
        
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-blue-500">Login with OTP</h1>
          <p className="text-sm text-gray-500">Please verify your phone number</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                        onChange={(value) => {
                          field.onChange(value || '');
                          if (value) validatePhoneNumber(value);
                        }}
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
                        disabled={isSendingOtp || !form.getValues('phoneNumber')}
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
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isOtpLoginPending || !otpSent || !form.getValues('otp')}
            >
              {isOtpLoginPending ? "Processing..." : "Verify & Login"}
            </Button>
            <div className="flex justify-between text-sm mt-2">
              <Link 
                href="/login" 
                className="text-blue-500 hover:underline"
              >
                Back to password login
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
