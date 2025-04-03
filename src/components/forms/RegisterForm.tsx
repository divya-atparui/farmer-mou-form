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
import { Eye, EyeOff, User, Mail, Lock, Phone, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
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
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formProgress, setFormProgress] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
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

  // Password strength calculation
  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  // Update form progress
  const updateFormProgress = () => {
    const values = form.getValues();
    let progress = 0;
    if (values.fullName) progress += 20;
    if (values.email) progress += 20;
    if (values.password) progress += 20;
    if (values.confirmPassword) progress += 20;
    if (values.phoneNumber) progress += 20;
    setFormProgress(progress);
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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-8 m-2">
      <div className="w-full max-w-2xl space-y-6 rounded-lg border bg-white p-8 shadow-lg">
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
          <h1 className="text-xl font-bold text-blue-500">Create an Account</h1>

     
        </div>
        
        <div className="space-y-2 text-center">
         
          {/* Progress bar */}
          <div className="mt-4 h-2 w-full rounded-full bg-gray-200">
            <div 
              className="h-full rounded-full bg-blue-500 transition-all duration-300"
              style={{ width: `${formProgress}%` }}
            />
          </div>
         
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" onChange={updateFormProgress}>
            {/* Full Name field */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder="John Doe" 
                        {...field}
                        className="pl-10"
                      />
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email and Phone in a grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="john@example.com"
                          type="email"
                          {...field}
                          className="pl-10"
                        />
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number field */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone Number
                    </FormLabel> 
                    <div className="space-y-2">
                      <FormControl>
                        <div className="relative">
                          <PhoneInput
                            international
                            defaultCountry="IN"
                            placeholder="Enter phone number"
                            value={field.value}
                            onChange={field.onChange}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10"
                            disabled={otpSent}
                          />
                          <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        </div>
                      </FormControl>
                      {phoneError && (
                        <p className="text-sm text-red-500 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          {phoneError}
                        </p>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Password fields in a grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Password field */}
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

              {/* Confirm Password field */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Confirm your password"
                          type={showConfirmPassword ? "text" : "password"}
                          {...field}
                          className="pl-10 pr-10"
                        />
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? (
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
            </div>

            {/* Password strength indicator */}
            {form.watch('password') && (
              <div className="space-y-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "h-1 w-full rounded-full",
                        i < calculatePasswordStrength(form.watch('password'))
                          ? "bg-blue-500"
                          : "bg-gray-200"
                      )}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-xs text-gray-500 space-y-1">
                    <div className="flex items-center gap-1">
                      {form.watch('password').length >= 8 ? (
                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                      ) : (
                        <AlertCircle className="h-3 w-3 text-gray-400" />
                      )}
                      <span>8+ characters</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {/[A-Z]/.test(form.watch('password')) ? (
                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                      ) : (
                        <AlertCircle className="h-3 w-3 text-gray-400" />
                      )}
                      <span>Uppercase</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1">
                    <div className="flex items-center gap-1">
                      {/[0-9]/.test(form.watch('password')) ? (
                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                      ) : (
                        <AlertCircle className="h-3 w-3 text-gray-400" />
                      )}
                      <span>Number</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {/[^A-Za-z0-9]/.test(form.watch('password')) ? (
                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                      ) : (
                        <AlertCircle className="h-3 w-3 text-gray-400" />
                      )}
                      <span>Special character</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* OTP Section */}
            <div className="flex justify-between items-center">
              {!otpSent && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => handleSendOtp(false)}
                  disabled={isSendingOtp || !form.getValues('phoneNumber') || form.getValues('phoneNumber').length < 10}
                  className="w-full"
                >
                  {isSendingOtp ? (
                    <>
                      <span className="loading loading-spinner loading-sm mr-2"></span>
                      Sending OTP...
                    </>
                  ) : (
                    "Send OTP"
                  )}
                </Button>
              )}
            </div>
            
            {showOtpInput && (
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <FormLabel className="flex items-center gap-2 text-blue-700">
                      <CheckCircle2 className="h-4 w-4" />
                      OTP Verification
                    </FormLabel>
                    <div className="space-y-2">
                      <FormControl>
                        <Input 
                          placeholder="Enter 6-digit OTP" 
                          {...field}
                          disabled={otpVerified}
                          maxLength={6}
                          inputMode="numeric"
                          type="text"
                          className="text-center tracking-[1em] text-lg font-medium"
                          onChange={(e) => {
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
                        <p className="text-sm text-green-500 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4" />
                          OTP verified successfully
                        </p>
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
              {isRegistering ? (
                <>
                  <span className="loading loading-spinner loading-sm mr-2"></span>
                  Processing...
                </>
              ) : (
                "Verify & Register"
              )}
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
