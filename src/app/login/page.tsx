"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [useDebugToken, setUseDebugToken] = useState(false);
  const [debugAvailable, setDebugAvailable] = useState(false);
  const router = useRouter();

  // Check if debug endpoint is available
  useEffect(() => {
    const checkDebugAvailable = async () => {
      try {
        const response = await fetch("/api/auth/debug", {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          setDebugAvailable(data.available);
        }
      } catch {
        setDebugAvailable(false);
      }
    };
    checkDebugAvailable();
  }, []);

  const handleOAuthSignIn = (provider: string) => {
    setLoading(true);
    signIn(provider, { callbackUrl: "/dashboard" });
  };

  const handleDebugLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/debug", {
        method: "POST",
      });

      if (response.ok) {
        window.location.href = "/dashboard";
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to log in with debug token.");
      }
    } catch {
      setError("An error occurred during debug login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Virlet
        </h1>
        <h2 className="mt-6 text-center text-2xl font-bold text-primary-600 dark:text-primary-400">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          {debugAvailable && (
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={useDebugToken}
                  onChange={(e) => setUseDebugToken(e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Use debug token (for testing only)
                </span>
              </label>
            </div>
          )}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  {useDebugToken ? "Debug login" : "Sign in with"}
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              {useDebugToken ? (
                <button
                  onClick={handleDebugLogin}
                  disabled={loading}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Logging in..." : "Use Debug Token"}
                </button>
              ) : (
                <button
                  onClick={() => handleOAuthSignIn("instagram")}
                  disabled={loading}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Instagram
                </button>
              )}
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              {useDebugToken
                ? "Using a debug token for testing. Do not use in production."
                : "Sign in with your Instagram account to access Virlet."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}