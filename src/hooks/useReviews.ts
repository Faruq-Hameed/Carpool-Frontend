import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createReviewApi,
  getMyReviewForRideApi,
  getUserReviewsApi,
} from "@/apis/reviews";
import { CreateReviewDto } from "@/apis/reviews/types";

export const useMyReviewForRide = (rideId: string) =>
  useQuery({
    queryKey: ["my-review", rideId],
    queryFn: () => getMyReviewForRideApi(rideId).then((r) => r.data.data),
    enabled: !!rideId,
  });

export const useUserReviews = (userId: string, page = 1) =>
  useQuery({
    queryKey: ["user-reviews", userId, page],
    queryFn: () => getUserReviewsApi(userId, page).then((r) => r.data.data),
    enabled: !!userId,
  });

export const useCreateReview = (rideId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateReviewDto) =>
      createReviewApi(rideId, dto).then((r) => r.data.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["my-review", rideId] });
    },
  });
};
