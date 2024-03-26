import axios from 'axios'
import {
  getRequestWithToken,
  getRequestWithoutToken,
  postRequestWithToken,
} from './GenericRequest'

const sellerPost = async (data, authToken, userEmail) => {
  const url = `http://localhost:8000/api/v1/seller_info`
  const payload = { ...data, email: userEmail }
  return postRequestWithToken(url, payload, authToken)
}

const getSellerByEmail = async (email, authToken) => {
  const url = `http://localhost:8000/api/v1/seller_info`
  const params = {
    email: email,
  }
  return getRequestWithToken(url, authToken, params)
}

const updateSeller = async (sellerId, formData, authToken) => {
  if (!authToken) {
    throw new Error('No authentication token found')
  }

  const accessToken = await authToken()

  const response = await axios.put(
    `http://localhost:8000/api/v1/seller_info/${sellerId}`,
    { ...formData },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  return response.data
}

const getSellerById = async (sellerId, authToken) => {
  const url = `http://localhost:8000/api/v1/seller_info/${sellerId}`
  return getRequestWithToken(url, authToken)
}

const getSellerNameByDishId = async (dishId) => {
  const url = `http://localhost:8000/api/v1/seller_info/name-only/${dishId}`
  return getRequestWithoutToken(url)
}

export {
  sellerPost,
  getSellerByEmail,
  updateSeller,
  getSellerById,
  getSellerNameByDishId,
}
