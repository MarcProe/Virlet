'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleInstagramLogin = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await signIn('instagram', { 
        callbackUrl: '/dashboard',
        redirect: true 
      });
    } catch (err) {
      setError('Failed to connect to Instagram. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-1000 to-dark-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="neumorphic p-6 inline-block">
            <h1 className="text-3xl font-bold text-primary-400">
              Virlet
            </h1>
            <p className="text-gray-400 mt-1">
              Instagram Creator Analytics
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="neumorphic p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">
              Welcome Back
            </h2>
            <p className="text-gray-400 mt-2">
              Sign in with your Instagram account to continue
            </p>
          </div>

          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <button
              onClick={handleInstagramLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed neumorphic-inset"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Continue with Instagram</span>
                </>
              )}
            </button>
          </div>

          <div className="text-center text-gray-500 text-sm">
            <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </div>

        {/* Features Preview */}
        <div className="neumorphic p-6 text-center">
          <h3 className="text-lg font-semibold text-white mb-4">
            What you get with Virlet
          </h3>
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center mb-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                </svg>
              </div>
              <span className="text-gray-400">Analytics</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center mb-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <span className="text-gray-400">Growth</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center mb-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
              </div>
              <span className="text-gray-400">Audience</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
