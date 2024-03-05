import axios from 'axios'

const postDish = async (data, s3Path, authToken, sellerId) => {
  if (!authToken) {
    throw new Error('No authentication token found')
  }

  if (!s3Path) {
    throw new Error('No valid s3 path before posting dishes')
  }

  const accessToken = await authToken()

  const payload = {
    ...data,
    seller_id: sellerId,
    s3_path: s3Path
  }

  const response = await axios.post(
    'http://localhost:8000/api/v1/dish',
    payload,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  return response
}

const getDishBySellerId = async (sellerId, authToken) => {
  if (!authToken) {
    throw new Error('No authentication token found')
  }

  const accessToken = await authToken()

  const response = await axios.get(
    `http://localhost:8000/api/v1/dish/seller/${sellerId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  return response.data
}

const getDishesPagination = async (skip) => {
  const response = await axios.get(`http://localhost:8000/api/v1/dish/`, {
    params: {
      skip: skip,
      limit: 20,
    },
  })

  return response.data
}

const getAllFeaturedDish = async (dishIds, authToken) => {
  if (!authToken) {
    throw new Error('No authentication token found')
  }

  const stringifiedIds = dishIds.join(',');

  const accessToken = await authToken()
  const response = await axios.get(
    `http://localhost:8000/api/v1/dish/featured/ids`,
    {
      params: { dish_ids: stringifiedIds },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  return response.data
}

export { postDish, getDishBySellerId, getDishesPagination, getAllFeaturedDish }
