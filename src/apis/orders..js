import axios from 'axios';

const getOrderBySellerId = async (sellerId, authToken) => {
    if (!authToken) {
      throw new Error('No authentication token found');
    }

    const accessToken = await authToken()

    const response = await axios.get(`http://localhost:8000/api/v1/order/seller/${sellerId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    return response.data;
}

export {
    getOrderBySellerId
}
