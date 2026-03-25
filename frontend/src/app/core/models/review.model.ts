export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  title: string;
  body: string;
  rating: string;
  created_at: string;
}

export interface ReviewsApiResponse {
  statuscode: string;
  status: string;
  reviews: Review[];
  total?: string;
}

export interface ReviewWithHelpers extends Review {
  rating_number: number;
}

export function enrichReview(review: Review): ReviewWithHelpers {
  return {
    ...review,
    rating_number: parseFloat(review.rating?.replace(',', '.')) || 0,
  };
}
