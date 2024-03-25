import axios from 'axios'

const postDishReview = async (buyerId, dishId, content, rating, authToken) => {
  if (!authToken) {
    throw new Error('No authentication token found')
  }

  const accessToken = await authToken()

  const payload = {
    buyer_id: buyerId,
    dish_id: dishId,
    content,
    rating,
  }

  const response = await axios.post(
    'http://localhost:8000/api/v1/dish-review',
    { ...payload },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  return response.data
}

const getDishReviewByDishId = async (dishId) => {
  const response = await axios.get(
    `http://localhost:8000/api/v1/dish-review/dish/${dishId}`,
  )

  return response.data
}

export { postDishReview, getDishReviewByDishId }
