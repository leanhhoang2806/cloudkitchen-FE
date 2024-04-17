import axios from 'axios'
import {
  getRequestWithToken,
  getRequestWithoutToken,
  postRequestWithToken,
} from './GenericRequest'
import { URL } from 'env/env'

const postDish = async (data, s3Path, authToken, sellerId) => {
  if (data.price > 100) {
    data.price = parseFloat(data.price)
    if (isNaN(data.price)) {
      throw new Error('Invalid price format')
    }
  }
  const url = `${URL}/dish`
  const payload = {
    ...data,
    seller_id: sellerId,
    s3_path: s3Path,
  }
  return postRequestWithToken(url, payload, authToken)
}

const getDishBySellerId = async (sellerId, authToken) => {
  const url = `${URL}/dish/seller/${sellerId}`
  return getRequestWithToken(url, authToken)
}

const getDishesPagination = async (skip) => {
  const url = `${URL}/dish/`
  const params = {
    skip: skip,
    limit: 20,
  }
  return getRequestWithoutToken(url, params)
}

const getAllFeaturedDish = async (dishIds) => {
  const stringifiedIds = dishIds.join(',')
  const url = `${URL}/dish/featured/ids`
  const params = { dish_ids: stringifiedIds }
  return getRequestWithoutToken(url, params)
}

const deleteDishBySeller = async (dishId, authToken) => {
  if (!authToken) {
    throw new Error('No authentication token found')
  }

  const accessToken = await authToken()

  const response = await axios.delete(
    `${URL}/dish/${dishId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  return response.data
}

const getDishById = async (dishId, authToken) => {
  const url = `${URL}/dish/${dishId}`
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
