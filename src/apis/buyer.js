import axios from 'axios'

const getBuyerByEmail = async (authToken, email) => {
  if (!authToken) {
    throw new Error('No authentication token found')
  }

  const accessToken = await authToken()

  const response = await axios.get(`http://localhost:8000/api/v1/buyer/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      email: email,
    },
  })

  return response.data
}

const getBuyerById = async (buyerId, authToken) => {
  if (!authToken) {
    throw new Error('No authentication token found')
  }

  const accessToken = await authToken()

  const response = await axios.get(
    `http://localhost:8000/api/v1/buyer/${buyerId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  return response.data
}

const getBuyerByIdNoValidation = async (buyerId) => {

  const response = await axios.get(
    `http://localhost:8000/api/v1/buyer/no-validation/${buyerId}`,
  )

  return response.data
}

export { getBuyerByEmail, getBuyerById, getBuyerByIdNoValidation }
