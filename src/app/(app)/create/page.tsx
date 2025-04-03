// Make page client-side to access URL params
'use client';

import React, { useEffect, useState } from 'react';
import { Loader2, File, Calendar, FileType, User, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuthAndGetDocs } from '@/api/api-setu/use-api-setu';

const CreatePage = () => {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'documents'>('loading');
  const [errorDetails, setErrorDetails] = useState<string>('');
  const [authParams, setAuthParams] = useState<{
    code: string;
    state: string;
    codeVerifier: string;
    mobile: string;
  } | null>(null);
  const [documents, setDocuments] = useState<IssuedDocument[]>([]);

  // Initialize API Setu query but don't enable it until we have parameters
  const { data, isLoading, error, isError } = useAuthAndGetDocs({
    variables: authParams || { code: '', state: '', mobile: '', codeVerifier: '' },
    enabled: !!authParams,
  });

  // Handle API response
  useEffect(() => {
    if (!authParams) return;
    
    if (isError && error) {
      console.error('API error:', error);
      setStatus('error');
      setErrorDetails(`API Error: ${error.message || 'Failed to fetch documents'}`);
    }
    
    if (data) {
      console.log('API success:', data);
      // Clean up session storage
      sessionStorage.removeItem('digilocker_code_verifier');
      sessionStorage.removeItem('user_phone_number');
      
      // Store documents and update status
      setDocuments(data.issuedDocuments || []);
      setStatus('documents');
    }
  }, [data, isError, error, authParams]);

  // Extract and process query parameters on mount
  useEffect(() => {
    async function processCallback() {
      try {
        // Get URL search params
        const params = new URLSearchParams(window.location.search);
        
        // Extract relevant parameters
        const code = params.get('code');
        const state = params.get('state');
        const error = params.get('error');
        const error_description = params.get('error_description');

        // Log all parameters for debugging
        console.log('DigiLocker Response Parameters:', {
          code,
          state,
          error,
          error_description,
          raw_url: window.location.href,
          all_params: Object.fromEntries(params.entries())
        });

        // Handle error from DigiLocker
        if (error) {
          console.error('Error from DigiLocker:', error);
          console.error('Error description:', error_description);
          setStatus('error');
          setErrorDetails(`DigiLocker Error: ${error}${error_description ? ` - ${error_description}` : ''}`);
          return;
        }

        // Check required parameters
        if (!code || !state) {
          console.error('Missing required parameters');
          setStatus('error');
          setErrorDetails('Missing required parameters in the callback');
          return;
        }

        // Verify state matches what we sent
        if (state !== 'oidc_flow') {
          console.error('State mismatch - possible CSRF attack');
          setStatus('error');
          setErrorDetails('Invalid state parameter - authentication verification failed');
          return;
        }

        // Retrieve code verifier from session storage
        const codeVerifier = sessionStorage.getItem('digilocker_code_verifier');
        if (!codeVerifier) {
          console.error('Code verifier not found in session storage');
          setStatus('error');
          setErrorDetails('Authentication session expired or invalid');
          return;
        }

        const userPhoneNumber = sessionStorage.getItem('user_phone_number');
        if (!userPhoneNumber) {
          console.error('User phone number not found in session storage');
          setStatus('error');
          setErrorDetails('User phone number not found in session storage');
          return;
        }

        // Log the received values for testing
        console.log('Authentication details:', {
          code,
          codeVerifier,
          state,
          userPhoneNumber
        });

        // Set auth parameters for the API call
        setAuthParams({
          code,
          state,
          codeVerifier,
          mobile: userPhoneNumber,
        });

      } catch (error) {
        console.error('Error during authentication processing:', error);
        setStatus('error');
        setErrorDetails(`Unexpected error: ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    processCallback();
  }, []);
  const handleContinue = () => {
    router.push('/');
  };

    // // Format file size
    // const formatFileSize = (size: string) => {
    //   const sizeNum = parseInt(size);
    //   if (isNaN(sizeNum)) return size;
      
    //   if (sizeNum < 1024) return `${sizeNum} B`;
    //   if (sizeNum < 1024 * 1024) return `${(sizeNum / 1024).toFixed(1)} KB`;
    //   return `${(sizeNum / (1024 * 1024)).toFixed(1)} MB`;
    // };

  // Format date
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-IN', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      });
    } catch {
      return dateStr;
    }
  };

  // Show different UI states based on current status
  if (status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="text-red-500 font-medium">Authentication Failed</div>
        <p className="text-muted-foreground max-w-md text-center">
          {errorDetails}
        </p>
        <button 
          onClick={() => router.push('/')}
          className="px-4 py-2 bg-primary text-white rounded-md mt-4"
        >
          Return to Home
        </button>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="text-green-500 font-medium">Authentication Successful</div>
        <p className="text-muted-foreground">
          Redirecting to dashboard...
        </p>
      </div>
    );
  }

  if (status === 'documents') {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Your DigiLocker Documents</h1>
        
        {documents.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <div className="text-gray-500 mb-4">No documents found in your DigiLocker account</div>
            <button 
              onClick={handleContinue}
              className="px-4 py-2 bg-primary text-white rounded-md"
            >
              Continue to Dashboard
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 mb-6">
              {documents.map((doc, index) => (
                <div key={index} className="bg-white rounded-lg border p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-50 p-3 rounded-md">
                        <File className="h-6 w-6 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">{doc.name}</h3>
                        <p className="text-sm text-gray-500">{doc.description || doc.type}</p>
                        
                        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                          <div className="flex items-center text-gray-600">
                            <FileType className="h-4 w-4 mr-2" />
                            <span>{doc.doctype || doc.type}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>{formatDate(doc.date)}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <User className="h-4 w-4 mr-2" />
                            <span>{doc.issuer}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <File className="h-4 w-4 mr-2" />
                            <span>{doc.size}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center">
              <button 
                onClick={handleContinue}
                className="flex items-center px-6 py-3 bg-primary text-white rounded-md shadow-sm hover:bg-primary/90"
              >
                Continue to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-muted-foreground">
        {isLoading ? 'Fetching documents from DigiLocker...' : 'Processing DigiLocker authentication...'}
      </p>
    </div>
  );
};

export default CreatePage;