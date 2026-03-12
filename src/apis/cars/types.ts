export type CarStatus = "NOT_VERIFIED" | "VERIFIED" | "REJECTED";
export type CarImageType = "front" | "back" | "interior" | "right" | "left";

export interface CarImage {
  id: string;
  url: string;
  type: CarImageType;
  carId: string;
}

export interface Car {
  id: string;
  plateNumber: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleCategory: string;
  color: string;
  carStatus: CarStatus;
  ownerId: string;
  images: CarImage[];
  createdAt: string;
  updatedAt: string;
}

// ─── DTOs ────────────────────────────────────────────────────────────────────

export interface CreateCarDto {
  plateNumber: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleCategory: string;
  color: string;
}

export interface UpdateCarDto {
  plateNumber?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleCategory?: string;
  color?: string;
}
