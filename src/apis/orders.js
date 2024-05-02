import axios from 'axios'
import { getRequestWithToken, postRequestWithToken } from './GenericRequest'
import { URL } from 'env/env'

const getOrderBySellerId = async (sellerId, authToken) => {
  const url = `${URL}/order/seller/${sellerId}`
  return getRequestWithToken(url, authToken)
}

const getOrderByBuyerId = async (buyerId, authToken) => {
  const url = `${URL}/order/buyer/${buyerId}`
  return getRequestWithToken(url, authToken)
}

const postOrderByBuyer = async (buyerId, orders, quantities, authToken) => {
  const url = `${URL}/order/`
  const payload = {
    buyer_id: buyerId,
    dish_id: orders,
    quantities
  }
  return postRequestWithToken(url, payload, authToken)
}

const getOrderDetailsByOrderId = async (orderId, authToken) => {
  const url = `${URL}/order/${orderId}/dish`
  return getRequestWithToken(url, authToken)
}

const getOrderByOrderId = async (orderId, authToken) => {
  const url = `${URL}/order/${orderId}`
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
    `${URL}/order/${updatedOrder.id}/status`,
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
