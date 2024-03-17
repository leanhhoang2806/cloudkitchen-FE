import axios from 'axios'

const postStripePayment = async (dishIds, authToken) => {
  if (!authToken) {
    throw new Error('No authentication token found')
  }

  const accessToken = await authToken()
  const payload = {
    dish_ids: dishIds,
  }

  const response = await axios.post(
    `http://localhost:8000/api/v1/stripe-payment/`,
    { ...payload },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  return response.data
}

const putStripePaymentUpdate = async (email, authToken) => {
  if (!authToken) {
    throw new Error('No authentication token found')
  }

  const accessToken = await authToken()
  const payload = {
    email,
  }

  const response = await axios.put(
    `http://localhost:8000/api/v1/stripe-payment/update-limit`,
    { ...payload },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  return response.data
}


export { postStripePayment, putStripePaymentUpdate }
