export interface Reviewer {
  id: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
}

export interface Review {
  id: string;
  rating: number;
  comment?: string;
  rideId: string;
  bookingId: string;
  reviewerId: string;
  reviewer: Reviewer;
  revieweeId: string;
  createdAt: string;
}

export interface ReviewsResponse {
  total_docs: number;
  page: number;
  total_pages: number;
  size: number;
  avgRating: number | null;
  docs: Review[];
}

export interface CreateReviewDto {
  rating: number;
  comment?: string;
}
