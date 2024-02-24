import axios from 'axios';

const sellerPost = async (data, authToken, userEmail) => {
    if (!authToken) {
      throw new Error('No authentication token found');
    }

    const accessToken = await authToken()

    const response = await axios.post('http://localhost:8000/api/v1/seller_info', {...data, email: userEmail}, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    return response.data;
}

export {
    sellerPost
}
