import axios from 'axios'
import {
  getRequestWithToken,
  getRequestWithoutToken,
  postRequestWithToken,
} from './GenericRequest'

const postDish = async (data, s3Path, authToken, sellerId) => {
  const url = `http://localhost:8000/api/v1/dish`
  const payload = {
    ...data,
    seller_id: sellerId,
    s3_path: s3Path,
  }
  return postRequestWithToken(url, payload, authToken)
}

const getDishBySellerId = async (sellerId, authToken) => {
  const url = `http://localhost:8000/api/v1/dish/seller/${sellerId}`
  return getRequestWithToken(url, authToken)
}

const getDishesPagination = async (skip) => {
  const url = `http://localhost:8000/api/v1/dish/`
  const params = {
    skip: skip,
    limit: 20,
  }
  return getRequestWithoutToken(url, params)
}

const getAllFeaturedDish = async (dishIds) => {
  const stringifiedIds = dishIds.join(',')
  const url = `http://localhost:8000/api/v1/dish/featured/ids`
  const params = { dish_ids: stringifiedIds }
  return getRequestWithoutToken(url, params)
}

const deleteDishBySeller = async (dishId, authToken) => {
  if (!authToken) {
    throw new Error('No authentication token found')
  }

  const accessToken = await authToken()

  const response = await axios.delete(
    `http://localhost:8000/api/v1/dish/${dishId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  return response.data
}

const getDishById = async (dishId, authToken) => {
  const url = `http://localhost:8000/api/v1/dish/${dishId}`
  return getRequestWithToken(url, authToken)
}

export {
  postDish,
  getDishBySellerId,
  getDishesPagination,
  getAllFeaturedDish,
  deleteDishBySeller,
  getDishById,
}
