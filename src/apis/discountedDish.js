import axios from 'axios'

const getDiscountedDish = async (discountedDishId, authToken) => {
  if (!authToken) {
    throw new Error('No authentication token found')
  }

  const accessToken = await authToken()

  try {
    const response = await axios.get(
      `http://localhost:8000/api/v1/discounted-dish/dish/${discountedDishId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Error fetching discounted dish:', error)
    return null
  }
}
const createDiscountedDish = async (discountedDishData, authToken) => {
  if (!authToken) {
    throw new Error('No authentication token found')
  }

  const accessToken = await authToken()

  try {
    const response = await axios.post(
      'http://localhost:8000/api/v1/discounted-dish/',
      { ...discountedDishData },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    return response.data
  } catch (error) {
    console.error('Error creating discounted dish:', error)
    return null
  }
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
      `http://localhost:8000/api/v1/discounted-dish/${discountedDishId}`,
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
      `http://localhost:8000/api/v1/discounted-dish/${discountedDishId}`,
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
      `http://localhost:8000/api/v1/discounted-dish/dish/${dishId}`,
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
