import axios from 'axios';

const postDish = async (data, file, authToken) => {
    if (!authToken) {
      throw new Error('No authentication token found');
    }

    const accessToken = await authToken()

    const payload = {
            "name": "Spaghetti Carbonara",
            "description": "Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.",
            "price": 12.99,
            "seller_id": "6506cee7-a5f2-42e5-92fa-1e6088815891"
        }
    

    const response = await axios.post('http://localhost:8000/api/v1/dish', payload, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    return response;
}

const getDishBySellerId = async (sellerId, authToken) => {
    if (!authToken) {
      throw new Error('No authentication token found');
    }

    const accessToken = await authToken()

    const response = await axios.get(`http://localhost:8000/api/v1/dish/seller/${sellerId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    return response.data;
}

export {
    postDish,
    getDishBySellerId
}
