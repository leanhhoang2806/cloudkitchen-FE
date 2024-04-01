import axios from 'axios'
import { postRequestWithToken } from './GenericRequest'

const postStripePayment = async (buyerId, dishIds, authToken) => {
  try {
    const url = `http://localhost:8000/api/v1/stripe-payment/`
    const payload = {
      buyer_id: buyerId,
      dish_ids: dishIds,
    }
    return postRequestWithToken(url, payload, authToken)
  } catch (error) {
    console.log(error)
  }
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
