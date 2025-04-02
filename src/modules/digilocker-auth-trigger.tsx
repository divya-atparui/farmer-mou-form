'use client';

import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { generatePKCEPair } from '@/utils/pkce';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import PhoneInput from 'react-phone-number-input';
import "react-phone-number-input/style.css";
import { Phone } from 'lucide-react';

// Define form schema with validation
const phoneFormSchema = z.object({
  phoneNumber: z.string().min(10, { message: 'Phone number is required' }),
});

type PhoneFormValues = z.infer<typeof phoneFormSchema>;

const DigilockerAuthTrigger = () => {
  const [authUrl, setAuthUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showDialog, setShowDialog] = useState<boolean>(false);
  
  // Initialize form
  const form = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneFormSchema),
    defaultValues: {
      phoneNumber: '',
    },
  });

  useEffect(() => {
    const generateAuthUrl = async () => {
      try {
        // Generate PKCE pair
        const { codeVerifier, codeChallenge } = await generatePKCEPair();
        
        console.log('Generated PKCE values:', {
          codeVerifier,
          codeChallenge
        });
        
        // Store code verifier in session storage for later use
        sessionStorage.setItem('digilocker_code_verifier', codeVerifier);
        console.log('Stored code verifier in session storage');

        // Construct the authorization URL
        const baseUrl = 'https://digilocker.meripehchaan.gov.in/public/oauth2/1/authorize';
        const params = new URLSearchParams({
          response_type: 'code',
          // client_id: 'GY0D963725',
          client_id: 'NGE9C9DA54',
          state: 'oidc_flow',
          redirect_uri: 'http://acm.atparui.com/create',
          // redirect_uri: 'http://aurigraphfarmers-api.atparui.com/apisetuauth',
          code_challenge: codeChallenge,
          code_challenge_method: 'S256',
          acr: 'aadhaar',
          amr: 'aadhaar',
          scope: 'files.issueddocs files.uploadeddocs openid userdetails email careof address picture avs_parent',
        });

        const finalUrl = `${baseUrl}?${params.toString()}`;
        setAuthUrl(finalUrl);
      } catch (error) {
        console.error('Error generating auth URL:', error);
        setError('Failed to generate authentication URL. Please try again.');
      }
    };

    generateAuthUrl();
  }, []);

  // Handle form submission
  const onSubmit = (data: PhoneFormValues) => {
    // Save phone number to session storage
    sessionStorage.setItem('user_phone_number', data.phoneNumber);
    console.log('Phone number saved:', data.phoneNumber);
    
    // Close dialog and redirect to DigiLocker auth URL
    setShowDialog(false);
    
    // Use window.location for full page navigation
    window.location.href = authUrl;
  };

  // Handle dialog button click
  const handleAuthButtonClick = () => {
    if (!authUrl) return;
    setShowDialog(true);
  };
  
  if (error) {
    return (
      <div className="text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div>
      <Button disabled={!authUrl} onClick={handleAuthButtonClick}>
        <span className="flex items-center gap-2">Link to DigiLocker</span>
      </Button>
      
      {/* Phone Number Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Phone Number Verification</DialogTitle>
            <DialogDescription>
              Please enter your phone number before connecting to DigiLocker.
            </DialogDescription>
          </DialogHeader>
          
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
              
              <DialogFooter>
                <Button type="submit">Continue to DigiLocker</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DigilockerAuthTrigger;