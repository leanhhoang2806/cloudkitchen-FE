import axios from 'axios'

const getFeaturedDishPagination = async (skip) => {
  const response = await axios.get(
    `http://localhost:8000/api/v1/featured-dish/`,
    {
      params: {
        skip: skip,
        limit: 20,
      },
    },
  )

  return response.data
}

const postFeatureDish = async (dishId, authToken) => {
  if (!authToken) {
    throw new Error('No authentication token found')
  }

  const accessToken = await authToken()

  const response = await axios.post(
    `http://localhost:8000/api/v1/featured-dish/`,
    {
      dish_id: dishId,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  return response.data
}



export { getFeaturedDishPagination, postFeatureDish }
