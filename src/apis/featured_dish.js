import axios from 'axios'
import { getRequestWithoutToken, postRequestWithToken } from './GenericRequest'
import { URL } from 'env/env'

const getFeaturedDishPagination = async (skip) => {
  const url = `${URL}/featured-dish/`
  const params = {
    skip: skip,
    limit: 20,
  }
  return getRequestWithoutToken(url, params)
}

const postFeatureDish = async (dishId, authToken) => {
  const url = `${URL}/featured-dish/`
  const payload = {
    dish_id: dishId,
  }
  return postRequestWithToken(url, payload, authToken)
}

const deleteFeaturedDish = async (dishId, authToken) => {
  if (!authToken) {
    throw new Error('No authentication token found')
  }

  const accessToken = await authToken()

  const response = await axios.delete(`${URL}/featured-dish/${dishId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response.data
}

export { getFeaturedDishPagination, postFeatureDish, deleteFeaturedDish }
