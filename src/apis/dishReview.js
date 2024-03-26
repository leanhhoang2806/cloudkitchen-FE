import {
  getRequestWithToken,
  getRequestWithoutToken,
  postRequestWithToken,
} from './GenericRequest'

const postDishReview = async (buyerId, dishId, content, rating, authToken) => {
  const url = `http://localhost:8000/api/v1/dish-review`
  const payload = {
    buyer_id: buyerId,
    dish_id: dishId,
    content,
    rating,
  }
  return postRequestWithToken(url, payload, authToken)
}

const getDishReviewByDishId = async (dishId) => {
  const url = `http://localhost:8000/api/v1/dish-review/dish/${dishId}`
  return getRequestWithoutToken(url)
}

const getDishRatingByDishId = async (dishId) => {
  const url = `http://localhost:8000/api/v1/dish-review/rating/${dishId}`
  return getRequestWithoutToken(url)
}

const gerDishReviewByBuyerIdAndDishId = async (dishId, buyerId, authToken) => {
  const url = `http://localhost:8000/api/v1/dish-review/dish/${dishId}/buyer/${buyerId}`
  return getRequestWithToken(url, authToken)
}
export {
  postDishReview,
  getDishReviewByDishId,
  getDishRatingByDishId,
  gerDishReviewByBuyerIdAndDishId,
}
