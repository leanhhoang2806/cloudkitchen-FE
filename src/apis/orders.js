import axios from 'axios'
import { getRequestWithToken, postRequestWithToken } from './GenericRequest'

const getOrderBySellerId = async (sellerId, authToken) => {
  const url = `http://localhost:8000/api/v1/order/seller/${sellerId}`
  return getRequestWithToken(url, authToken)
}

const getOrderByBuyerId = async (buyerId, authToken) => {
  const url = `http://localhost:8000/api/v1/order/buyer/${buyerId}`
  return getRequestWithToken(url, authToken)
}

const postOrderByBuyer = async (buyerId, orders, authToken) => {
  const url = `http://localhost:8000/api/v1/order/`
  const payload = {
    buyer_id: buyerId,
    dish_id: orders,
  }
  return postRequestWithToken(url, payload, authToken)
}

const getOrderDetailsByOrderId = async (orderId, authToken) => {
  const url = `http://localhost:8000/api/v1/order/${orderId}/dish`
  return getRequestWithToken(url, authToken)
}

const getOrderByOrderId = async (orderId, authToken) => {
  const url = `http://localhost:8000/api/v1/order/${orderId}`
  return getRequestWithToken(url, authToken)
}

const updateOrderStatusById = async (updatedOrder, authToken) => {
  if (!authToken) {
    throw new Error('No authentication token found')
  }

  const accessToken = await authToken()
  const payload = {
    status: updatedOrder.status,
    buyer_id: updatedOrder.buyerId,
  }

  const response = await axios.put(
    `http://localhost:8000/api/v1/order/${updatedOrder.id}/status`,
    { ...payload },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  return response.data
}

export {
  getOrderDetailsByOrderId,
  getOrderBySellerId,
  getOrderByBuyerId,
  postOrderByBuyer,
  updateOrderStatusById,
  getOrderByOrderId,
}
