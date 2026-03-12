import { AxiosError } from 'axios';

export interface GenericResponse<T> {
  message: string;
  data: T;
}

/** Shape returned by all paginated backend endpoints */
export interface PaginatedData<T> {
  total_docs: number;
  page: number;
  total_pages: number;
  size: number;
  docs: T[];
}

export interface ApiError {
  message: string;
  error: string;
  statusCode: number;
}


export type AxiosApiError = AxiosError<ApiError>;
