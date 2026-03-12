import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  searchRidesApi,
  getRideByIdApi,
  getMyRidesApi,
  getMyBookingsApi,
  createRideApi,
  updateRideApi,
  cancelRideApi,
  startRideApi,
  completeRideApi,
  bookRideApi,
  getRideBookingsApi,
  acceptBookingApi,
  rejectBookingApi,
  cancelBookingApi,
} from "@/apis/rides";
import { CreateRideDto, UpdateRideDto, CreateBookingDto, CompleteRideDto, RideSearchQuery } from "@/apis/rides/types";

export const rideKeys = {
  all: ["rides"] as const,
  search: (query: RideSearchQuery) => ["rides", "search", query] as const,
  detail: (id: string) => ["rides", id] as const,
  mine: (page: number, size: number) => ["rides", "me", page, size] as const,
  bookings: (page: number, size: number) => ["rides", "bookings", "me", page, size] as const,
  rideBookings: (rideId: string) => ["rides", rideId, "bookings"] as const,
};

export function useSearchRides(query: RideSearchQuery) {
  return useQuery({
    queryKey: rideKeys.search(query),
    queryFn: () => searchRidesApi(query).then((r) => r.data.data),
  });
}

export function useRideById(id: string) {
  return useQuery({
    queryKey: rideKeys.detail(id),
    queryFn: () => getRideByIdApi(id).then((r) => r.data.data),
    enabled: !!id,
  });
}

export function useMyRides(page = 1, size = 10) {
  return useQuery({
    queryKey: rideKeys.mine(page, size),
    queryFn: () => getMyRidesApi(page, size).then((r) => r.data.data),
  });
}

export function useMyBookings(page = 1, size = 10) {
  return useQuery({
    queryKey: rideKeys.bookings(page, size),
    queryFn: () => getMyBookingsApi(page, size).then((r) => r.data.data),
  });
}

export function useRideBookings(rideId: string) {
  return useQuery({
    queryKey: rideKeys.rideBookings(rideId),
    queryFn: () => getRideBookingsApi(rideId).then((r) => r.data.data),
    enabled: !!rideId,
  });
}

export function useCreateRide() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateRideDto) => createRideApi(dto).then((r) => r.data.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: rideKeys.all }),
  });
}

export function useUpdateRide() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateRideDto }) =>
      updateRideApi(id, dto).then((r) => r.data.data),
    onSuccess: (_data, { id }) => {
      qc.invalidateQueries({ queryKey: rideKeys.detail(id) });
      qc.invalidateQueries({ queryKey: rideKeys.all });
    },
  });
}

export function useCancelRide() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => cancelRideApi(id).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: rideKeys.all }),
  });
}

export function useStartRide() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => startRideApi(id).then((r) => r.data.data),
    onSuccess: (_data, id) => qc.invalidateQueries({ queryKey: rideKeys.detail(id) }),
  });
}

export function useCompleteRide() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto?: CompleteRideDto }) =>
      completeRideApi(id, dto).then((r) => r.data.data),
    onSuccess: (_data, { id }) => qc.invalidateQueries({ queryKey: rideKeys.detail(id) }),
  });
}

export function useBookRide() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ rideId, dto }: { rideId: string; dto?: CreateBookingDto }) =>
      bookRideApi(rideId, dto).then((r) => r.data.data),
    onSuccess: (_data, { rideId }) => {
      qc.invalidateQueries({ queryKey: rideKeys.rideBookings(rideId) });
      qc.invalidateQueries({ queryKey: rideKeys.bookings(1, 10) });
    },
  });
}

export function useAcceptBooking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ rideId, bookingId }: { rideId: string; bookingId: string }) =>
      acceptBookingApi(rideId, bookingId).then((r) => r.data.data),
    onSuccess: (_data, { rideId }) =>
      qc.invalidateQueries({ queryKey: rideKeys.rideBookings(rideId) }),
  });
}

export function useRejectBooking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ rideId, bookingId }: { rideId: string; bookingId: string }) =>
      rejectBookingApi(rideId, bookingId).then((r) => r.data.data),
    onSuccess: (_data, { rideId }) =>
      qc.invalidateQueries({ queryKey: rideKeys.rideBookings(rideId) }),
  });
}

export function useCancelBooking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ rideId, bookingId }: { rideId: string; bookingId: string }) =>
      cancelBookingApi(rideId, bookingId).then((r) => r.data.data),
    onSuccess: (_data, { rideId }) => {
      qc.invalidateQueries({ queryKey: rideKeys.rideBookings(rideId) });
      qc.invalidateQueries({ queryKey: rideKeys.bookings(1, 10) });
    },
  });
}
