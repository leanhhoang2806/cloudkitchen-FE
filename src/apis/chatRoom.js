import axios from 'axios'

const postChatRoom = async (buyerId, sellerId, authToken) => {
  if (!authToken) {
    throw new Error('No authentication token found')
  }

  const accessToken = await authToken()
  const payload = {
    seller_id: sellerId,
    buyer_id: buyerId,
  }

  const response = await axios.post(
    `http://localhost:8000/api/v1/chat/`,
    { ...payload },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  return response.data
}

export { postChatRoom }
