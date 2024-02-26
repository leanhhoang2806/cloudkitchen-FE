import axios from "axios";

const searchDishesByNameOrZipcode = async (sellerName, zipcode, authToken) => {
    if (!authToken) {
      throw new Error('No authentication token found');
    }

    const accessToken = await authToken()

    const response = await axios.get(`http://localhost:8000/api/v1/search`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        params: {
            seller_name: sellerName,
            zip_code : zipcode
        }
    });

    return response.data;
}

export {
    searchDishesByNameOrZipcode
}
