import axios from 'axios'

const sellerPost = async (data, authToken, userEmail) => {
  if (!authToken) {
    throw new Error('No authentication token found')
  }

  const accessToken = await authToken()

  const response = await axios.post(
    'http://localhost:8000/api/v1/seller_info',
    { ...data, email: userEmail },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  return response.data
}

const getSellerByEmail = async (email, authToken) => {
  if (!authToken) {
    throw new Error('No authentication token found')
  }

  const accessToken = await authToken()

  const response = await axios.get(`http://localhost:8000/api/v1/seller_info`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      email: email,
    },
  })

  return response.data
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
  if (!authToken) {
    throw new Error('No authentication token found')
  }

  const accessToken = await authToken()

  const response = await axios.get(
    `http://localhost:8000/api/v1/seller_info/${sellerId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  return response.data
}

const getSellerNameByDishId = async (dishId) => {
  const response = await axios.get(
    `http://localhost:8000/api/v1/seller_info/name-only/${dishId}`,
  )

  return response.data
}

export {
  sellerPost,
  getSellerByEmail,
  updateSeller,
  getSellerById,
  getSellerNameByDishId,
}
