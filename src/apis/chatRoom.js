import axios from 'axios'

const getConversationByConversationId = async (conversationid, authToken) => {
  if (!authToken) {
    throw new Error('No authentication token found')
  }

  const accessToken = await authToken()

  const response = await axios.get(
    `http://localhost:8000/api/v1/chat/${conversationid}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  return response.data
}
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

const getChatRoomByBuyer = async (buyerId, authToken) => {
  if (!authToken) {
    throw new Error('No authentication token found')
  }

  const accessToken = await authToken()

  const response = await axios.get(
    `http://localhost:8000/api/v1/chat/${buyerId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  return response.data
}

const getAllChatRoomByBuyer = async (buyerId, authToken) => {
  if (!authToken) {
    throw new Error('No authentication token found')
  }

  const accessToken = await authToken()

  const response = await axios.get(
    `http://localhost:8000/api/v1/chat/buyer/${buyerId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  return response.data
}

const postChatMessage = async (
  chatId,
  sender,
  receiver,
  content,
  authToken,
) => {
  if (!authToken) {
    throw new Error('No authentication token found')
  }

  const accessToken = await authToken()
  const payload = {
    sender,
    receiver,
    content,
  }

  const response = await axios.post(
    `http://localhost:8000/api/v1/chat/${chatId}`,
    { ...payload },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  return response.data
}

// ====== Seller =========

const getChatListBySellerId = async (sellerId, authToken) => {
  if (!authToken) {
    throw new Error('No authentication token found')
  }

  const accessToken = await authToken()

  const response = await axios.get(
    `http://localhost:8000/api/v1/chat/seller/${sellerId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  return response.data
}

export {
  postChatRoom,
  getChatRoomByBuyer,
  getAllChatRoomByBuyer,
  getConversationByConversationId,
  postChatMessage,

  // ===== Seller ======
  getChatListBySellerId,
}
