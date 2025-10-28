import { useEffect } from "react";
import { mutationRegistry } from ".";

type MutationResult<T> = {
  initiateApiCall: (...args: any[]) => void;
  isLoading: boolean;
  message?: string;
  error?: any;
  data?: T;
};

/**
 * useMutationHandler is a custom hook that abstracts mutation logic for API calls.
 * It dynamically selects a mutation hook from a registry using a key, and automatically
 * triggers a success callback when the mutation completes successfully.
 *
 * @template T - The expected shape of the mutation response data.
 *
 * @param {keyof typeof mutationRegistry} key - A string key that maps to a mutation hook in the mutationRegistry.
 * @param {(data: T, message: string) => void} onSuccess - A callback function that runs when the mutation succeeds.
 *
 * @returns {MutationResult<T>} An object containing:
 *   - initiateApiCall: Function to trigger the API call.
 *   - isLoading: Boolean indicating if the request is in progress.
 *   - message: Optional success message from the API.
 *   - error: Optional error object if the request fails.
 *   - data: Optional response data from the API.
 *
 * @example
 * const { initiateApiCall, isLoading, error } = useMutationHandler("signUp", (data, message) => {
 *   navigation.navigate("EnterOTP", {
 *     message,
 *     email: data.email,
 *     purpose: VerifyOtpPurposes.VERIFY_EMAIL,
 *   });
 * });
 *
 * // Trigger the API call
 * initiateApiCall({ email: "user@example.com", password: "secure123" });
 */
export function useMutationHandler<T = unknown>(
  key: keyof typeof mutationRegistry,
  onSuccess: (data: T | null, message: string) => void,
  onError?: (message: string)=> void
) {
  const useMutation = mutationRegistry[key];
  const mutation = useMutation() as MutationResult<T>;

  const { isLoading, message, error, data } = mutation;

   useEffect(() => {
    if (!isLoading) {
      if (error && onError) {
        onError(message || "Something went wrong"); //this give me direct access to error
      } else if (message) {
        onSuccess(data ?? null, message);
      }
    }
  }, [isLoading, message, error, data]);


  return mutation; // gives access to error, isLoading, etc.
}
