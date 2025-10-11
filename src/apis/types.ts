import { AxiosError } from 'axios';

export interface GenericResponse<T> {
  message: string;
  data: T;
}


export interface ApiError {
  message: string;
  error: string;
  statusCode: number;
}


export type AxiosApiError = AxiosError<ApiError>;
