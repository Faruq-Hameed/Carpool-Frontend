import request from "../interceptor";
import { GenericResponse } from "../types";
import { Review, ReviewsResponse, CreateReviewDto } from "./types";

/** POST /rides/:rideId/reviews */
export const createReviewApi = (rideId: string, dto: CreateReviewDto) =>
  request.post<GenericResponse<Review>>(`/rides/${rideId}/reviews`, dto);

/** GET /rides/:rideId/my-review */
export const getMyReviewForRideApi = (rideId: string) =>
  request.get<GenericResponse<Review | null>>(`/rides/${rideId}/my-review`);

/** GET /users/:userId/reviews */
export const getUserReviewsApi = (userId: string, page = 1, size = 20) =>
  request.get<GenericResponse<ReviewsResponse>>(`/users/${userId}/reviews`, {
    params: { page, size },
  });
