import { getRequestWithToken, getRequestWithoutToken } from './GenericRequest'
import axios from 'axios'
import { URL } from 'env/env'

const getBuyerByEmail = async (authToken, email) => {
  const url = `${URL}/buyer/`
  const params = {
    email: email,
  }
  return getRequestWithToken(url, authToken, params)
}

const getBuyerById = async (buyerId, authToken) => {
  const url = `${URL}/buyer/${buyerId}`
  return getRequestWithToken(url, authToken)
}

const getBuyerByIdNoValidation = async (buyerId) => {
  const url = `${URL}/buyer/no-validation/${buyerId}`
  return getRequestWithoutToken(url)
}

const updateBuyerInfo = async (buyerId, payload, authToken) => {
  if (!authToken) {
    throw new Error('No authentication token found')
  }

  const accessToken = await authToken()
  const url = `${URL}/buyer/${buyerId}`

  try {
    const response = await axios.put(url, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error updating discounted dish:', error)
    return null
  }
}

export {
  getBuyerByEmail,
  getBuyerById,
  getBuyerByIdNoValidation,
  updateBuyerInfo,
}
