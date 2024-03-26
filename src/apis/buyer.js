import { getRequestWithToken, getRequestWithoutToken } from './GenericRequest'

const getBuyerByEmail = async (authToken, email) => {
  const url = `http://localhost:8000/api/v1/buyer/`
  const params = {
    email: email,
  }
  return getRequestWithToken(url, authToken, params)
}

const getBuyerById = async (buyerId, authToken) => {
  const url = `http://localhost:8000/api/v1/buyer/${buyerId}`
  return getRequestWithToken(url, authToken)
}

const getBuyerByIdNoValidation = async (buyerId) => {
  const url = `http://localhost:8000/api/v1/buyer/no-validation/${buyerId}`
  return getRequestWithoutToken(url)
}

export { getBuyerByEmail, getBuyerById, getBuyerByIdNoValidation }
