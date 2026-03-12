import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCarApi,
  addCarImagesApi,
  getMyCarsApi,
  getCarByIdApi,
  updateCarApi,
  deleteCarApi,
} from "@/apis/cars";
import { CreateCarDto, UpdateCarDto } from "@/apis/cars/types";

export const carKeys = {
  all: ["cars"] as const,
  mine: (page: number, size: number) => ["cars", "me", page, size] as const,
  detail: (id: string) => ["cars", id] as const,
};

export function useMyCars(page = 1, size = 10) {
  return useQuery({
    queryKey: carKeys.mine(page, size),
    queryFn: () => getMyCarsApi(page, size).then((r) => r.data.data),
  });
}

export function useCarById(id: string) {
  return useQuery({
    queryKey: carKeys.detail(id),
    queryFn: () => getCarByIdApi(id).then((r) => r.data.data),
    enabled: !!id,
  });
}

export function useCreateCar() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateCarDto) => createCarApi(dto).then((r) => r.data.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: carKeys.all }),
  });
}

export function useAddCarImages() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ carId, files }: { carId: string; files: FormData }) =>
      addCarImagesApi(carId, files).then((r) => r.data.data),
    onSuccess: (_data, { carId }) => qc.invalidateQueries({ queryKey: carKeys.detail(carId) }),
  });
}

export function useUpdateCar() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateCarDto }) =>
      updateCarApi(id, dto).then((r) => r.data.data),
    onSuccess: (_data, { id }) => {
      qc.invalidateQueries({ queryKey: carKeys.detail(id) });
      qc.invalidateQueries({ queryKey: carKeys.all });
    },
  });
}

export function useDeleteCar() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCarApi(id).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: carKeys.all }),
  });
}
