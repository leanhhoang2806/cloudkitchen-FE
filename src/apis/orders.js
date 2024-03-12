import axios from 'axios'

const getOrderBySellerId = async (sellerId, authToken) => {
  if (!authToken) {
    throw new Error('No authentication token found')
  }

  const accessToken = await authToken()

  const response = await axios.get(
    `http://localhost:8000/api/v1/order/seller/${sellerId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  return response.data
}

const getOrderByBuyerId = async (buyerId, authToken) => {
  if (!authToken) {
    throw new Error('No authentication token found')
  }

  const accessToken = await authToken()

  const response = await axios.get(
    `http://localhost:8000/api/v1/order/buyer/${buyerId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  return response.data
}


const getOrderDetailsByOrderIds = async (orderIds, authToken) => {
  if (!authToken) {
    throw new Error('No authentication token found')
  }

  const accessToken = await authToken()

  const stringifiedIds = orderIds.join(',')

  const response = await axios.get(
    `http://localhost:8000/api/v1/order/details/all`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: { order_ids: stringifiedIds },
    },
  )

  return response.data
}

const postOrderByBuyer = async (buyerId, orders, authToken) => {
  if (!authToken) {
    throw new Error('No authentication token found')
  }

  const accessToken = await authToken()
  const payload = {
    buyer_id: buyerId,
    dish_id: orders,
  }

  const response = await axios.post(
    `http://localhost:8000/api/v1/order/`,
    { ...payload },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  return response.data
}


const updateOrderStatusById = async (updatedOrder, authToken) => {
  if (!authToken) {
    throw new Error('No authentication token found')
  }

  const accessToken = await authToken()
  const payload = {
    status: updatedOrder.status,
    buyer_id: updatedOrder.buyerId
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

export { getOrderBySellerId, getOrderByBuyerId, postOrderByBuyer, getOrderDetailsByOrderIds, updateOrderStatusById }
