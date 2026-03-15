import User from "@/models/User";

export type RideStatus = "PENDING" | "ONGOING" | "COMPLETED" | "CANCELLED";
export type BookingStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "COMPLETED"
  | "CANCELLED";
export type RoutePointType = "START" | "INTERMEDIATE" | "END";

export interface RideRoutePoint {
  id: string;
  orderIndex: number;
  pointType: RoutePointType;
  latitude: number;
  longitude: number;
  label?: string;
}

/** Minimal car info embedded in Ride */
export interface RideCar {
  id: string;
  vehicleMake: string;
  vehicleModel: string;
  color: string;
  plateNumber: string;
  carStatus: string;
}

export interface Ride {
  id: string;
  origin: string;
  destination: string;
  departureTime: string;
  totalSeats: number;
  availableSeats: number;
  pricePerSeat: number;
  /** Total route distance in km, computed from route points at creation */
  distanceKm?: number;
  status: RideStatus;
  notes?: string;
  ownerId: string;
  owner: User;
  carId: string;
  car: RideCar;
  bookings: RideBooking[];
  routePoints: RideRoutePoint[];
  createdAt: string;
  updatedAt: string;
}

export interface RideBooking {
  id: string;
  seatsBooked: number;
  status: BookingStatus;
  /** Passenger's boarding point */
  boardingLat: number;
  boardingLng: number;
  boardingLabel?: string;
  /** Passenger's alighting point */
  alightingLat: number;
  alightingLng: number;
  alightingLabel?: string;
  /** Proportional fare for this passenger's segment */
  fareAmount: number;
  /** Platform fee on top of fareAmount */
  platformFee: number;
  rideId: string;
  ride: Ride;
  passengerId: string;
  passenger: User;
  createdAt: string;
  updatedAt: string;
}

// ─── DTOs ────────────────────────────────────────────────────────────────────

export interface RideRoutePointDto {
  orderIndex: number;
  pointType: RoutePointType;
  latitude: number;
  longitude: number;
  label?: string;
}

export interface CreateRideDto {
  carId: string;
  origin: string;
  destination: string;
  departureTime: string;
  totalSeats: number;
  pricePerSeat: number;
  notes?: string;
  routePoints: RideRoutePointDto[];
}

export interface UpdateRideDto {
  origin?: string;
  destination?: string;
  departureTime?: string;
  totalSeats?: number;
  pricePerSeat?: number;
  notes?: string;
}

export interface CreateBookingDto {
  seatsBooked?: number;
  boardingLat: number;
  boardingLng: number;
  boardingLabel?: string;
  alightingLat: number;
  alightingLng: number;
  alightingLabel?: string;
}

export interface CompleteRideDto {
  bookingIds?: string[];
}

export interface RideSearchQuery {
  page?: number;
  size?: number;
  seats?: number;
  origin?: string;
  destination?: string;
  date?: string;
  originLat?: number;
  originLng?: number;
  destinationLat?: number;
  destinationLng?: number;
}
