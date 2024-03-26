import { getRequestWithToken, postRequestWithToken } from './GenericRequest'

const getConversationByConversationId = async (conversationid, authToken) => {
  const url = `http://localhost:8000/api/v1/chat/${conversationid}`
  return getRequestWithToken(url, authToken)
}
const postChatRoom = async (buyerId, sellerId, authToken) => {
  const url = `http://localhost:8000/api/v1/chat/`
  const payload = {
    seller_id: sellerId,
    buyer_id: buyerId,
  }
  return postRequestWithToken(url, payload, authToken)
}

const getChatRoomByBuyer = async (buyerId, authToken) => {
  const url = `http://localhost:8000/api/v1/chat/${buyerId}`
  return getRequestWithToken(url, authToken)
}

const getAllChatRoomByBuyer = async (buyerId, authToken) => {
  const url = `http://localhost:8000/api/v1/chat/buyer/${buyerId}`
  return getRequestWithToken(url, authToken)
}

const postChatMessage = async (
  chatId,
  sender,
  receiver,
  content,
  authToken,
) => {
  const url = `http://localhost:8000/api/v1/chat/${chatId}`
  const payload = {
    sender,
    receiver,
    content,
  }
  return postRequestWithToken(url, payload, authToken)
}

// ====== Seller =========

const getChatListBySellerId = async (sellerId, authToken) => {
  const url = `http://localhost:8000/api/v1/chat/seller/${sellerId}`
  return getRequestWithToken(url, authToken)
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
