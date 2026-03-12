import request from "../interceptor";
import { GenericResponse, PaginatedData } from "../types";
import {
  Ride,
  RideBooking,
  CreateRideDto,
  UpdateRideDto,
  CreateBookingDto,
  CompleteRideDto,
  RideSearchQuery,
} from "./types";

/** Search available rides */
export function searchRidesApi(query: RideSearchQuery) {
  return request.get<GenericResponse<PaginatedData<Ride>>>("/rides", {
    params: query,
  });
}

/** Get a single ride by ID */
export function getRideByIdApi(id: string) {
  return request.get<GenericResponse<Ride>>(`/rides/${id}`);
}

/** Get rides created by the current user (as driver) */
export function getMyRidesApi(page = 1, size = 10) {
  return request.get<GenericResponse<PaginatedData<Ride>>>("/rides/me", {
    params: { page, size },
  });
}

/** Get bookings made by the current user (as passenger) */
export function getMyBookingsApi(page = 1, size = 10) {
  return request.get<GenericResponse<PaginatedData<RideBooking>>>(
    "/rides/bookings/me",
    { params: { page, size } }
  );
}

/** Create a new ride offer */
export function createRideApi(dto: CreateRideDto) {
  return request.post<GenericResponse<Ride>>("/rides", dto);
}

/** Update ride details (before it starts) */
export function updateRideApi(id: string, dto: UpdateRideDto) {
  return request.patch<GenericResponse<Ride>>(`/rides/${id}`, dto);
}

/** Cancel a ride */
export function cancelRideApi(id: string) {
  return request.delete<GenericResponse<null>>(`/rides/${id}`);
}

/** Start a ride */
export function startRideApi(id: string) {
  return request.patch<GenericResponse<Ride>>(`/rides/${id}/start`);
}

/** Complete a ride (optionally with specific booking IDs) */
export function completeRideApi(id: string, dto?: CompleteRideDto) {
  return request.patch<GenericResponse<Ride>>(`/rides/${id}/complete`, dto);
}

/** Book a seat on a ride */
export function bookRideApi(rideId: string, dto?: CreateBookingDto) {
  return request.post<GenericResponse<RideBooking>>(
    `/rides/${rideId}/bookings`,
    dto
  );
}

/** Get all bookings for a ride (driver view) */
export function getRideBookingsApi(rideId: string) {
  return request.get<GenericResponse<RideBooking[]>>(
    `/rides/${rideId}/bookings`
  );
}

/** Accept a booking */
export function acceptBookingApi(rideId: string, bookingId: string) {
  return request.patch<GenericResponse<RideBooking>>(
    `/rides/${rideId}/bookings/${bookingId}/accept`
  );
}

/** Reject a booking */
export function rejectBookingApi(rideId: string, bookingId: string) {
  return request.patch<GenericResponse<RideBooking>>(
    `/rides/${rideId}/bookings/${bookingId}/reject`
  );
}

/** Cancel a booking (passenger) */
export function cancelBookingApi(rideId: string, bookingId: string) {
  return request.delete<GenericResponse<RideBooking>>(
    `/rides/${rideId}/bookings/${bookingId}`
  );
}
