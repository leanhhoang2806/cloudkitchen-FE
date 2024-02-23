import axios from 'axios';

const buyerGetByEmail = async (authToken, email) => {
    if (!authToken) {
        throw new Error('No authentication token found');
    }

    const accessToken = await authToken();

    const response = await axios.get(`http://localhost:8000/api/v1/buyer}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        params: {
            email: email
        }
    });

    return response.data;
}

export {
    buyerGetByEmail
}
