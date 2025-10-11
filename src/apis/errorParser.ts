import { AxiosError } from 'axios';
import { ApiError } from './types';

export function parseError(error: AxiosError<ApiError>): string {
  const fallback = 'Something went wrong. Please try again.';

  if (!error.response || !error.response.data) return fallback;

  const { message, error: label, statusCode } = error.response.data;

  // Customize based on statusCode or error label if needed
  if (statusCode === 409) return message || 'Conflict occurred.';
  if (statusCode === 400) return message || 'Bad request.';
  if (statusCode === 401) return message || 'Unauthorized.';
  if (statusCode === 403) return message || 'Forbidden.';
  if (statusCode === 404) return message || 'Not found.';
  if (statusCode === 500) return 'Internal server error. Please try again later.';

  return message || label || fallback;
}