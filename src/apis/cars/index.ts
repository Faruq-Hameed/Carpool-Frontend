import request from "../interceptor";
import { GenericResponse, PaginatedData } from "../types";
import { Car, CreateCarDto, UpdateCarDto } from "./types";

/** Register a new car */
export function createCarApi(dto: CreateCarDto) {
  return request.post<GenericResponse<Car>>("/cars", dto);
}

/** Upload images to an existing car */
export function addCarImagesApi(carId: string, files: FormData) {
  return request.post<GenericResponse<Car>>(`/cars/${carId}`, files, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

/** Get all cars owned by the current user */
export function getMyCarsApi(page = 1, size = 10) {
  return request.get<GenericResponse<PaginatedData<Car>>>("/cars/me", {
    params: { page, size },
  });
}

/** Get a single car by ID */
export function getCarByIdApi(id: string) {
  return request.get<GenericResponse<Car>>(`/cars/${id}`);
}

/** Update car details */
export function updateCarApi(id: string, dto: UpdateCarDto) {
  return request.patch<GenericResponse<Car>>(`/cars/${id}`, dto);
}

/** Delete a car */
export function deleteCarApi(id: string) {
  return request.delete<GenericResponse<null>>(`/cars/${id}`);
}
