import axios from 'axios'
import { getRequestWithoutToken, postRequestWithToken } from './GenericRequest'
import { URL } from 'env/env'

const getDiscountedDish = async (dishId) => {
  const url = `${URL}/discounted-dish/dish/${dishId}`
  return getRequestWithoutToken(url)
}
const createDiscountedDish = async (discountedDishData, authToken) => {
  const url = `${URL}/discounted-dish/`
  return postRequestWithToken(url, discountedDishData, authToken)
}

const updateDiscountedDish = async (
  discountedDishId,
  discountedDishData,
  authToken,
) => {
  if (!authToken) {
    throw new Error('No authentication token found')
  }

  const accessToken = await authToken()

  try {
    const response = await axios.put(
      `${URL}/discounted-dish/${discountedDishId}`,
      discountedDishData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Error updating discounted dish:', error)
    return null
  }
}

const deleteDiscountedDish = async (discountedDishId, authToken) => {
  if (!authToken) {
    throw new Error('No authentication token found')
  }

  const accessToken = await authToken()

  try {
    const response = await axios.delete(
      `${URL}/discounted-dish/${discountedDishId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Error deleting discounted dish:', error)
    return null
  }
}

const deleteDiscountedDishbyDishId = async (dishId, authToken) => {
  if (!authToken) {
    throw new Error('No authentication token found')
  }

  const accessToken = await authToken()

  try {
    const response = await axios.delete(
      `${URL}/discounted-dish/dish/${dishId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Error deleting discounted dish:', error)
    return null
  }
}

export {
  deleteDiscountedDish,
  updateDiscountedDish,
  getDiscountedDish,
  createDiscountedDish,
  deleteDiscountedDishbyDishId,
}
