import {
  getRequestWithToken,
  getRequestWithoutToken,
} from './GenericRequest'
import { URL } from 'env/env'
import axios from 'axios';


const postDishReview = async (buyerId, dishId, content, rating, imageFile, authToken) => {
  const url = `${URL}/dish-review`;
  
  // Read image file as data URL (Base64)
  const reader = new FileReader();
  reader.readAsDataURL(imageFile);
  
  return new Promise((resolve, reject) => {
    reader.onload = async () => {
      const imageBase64 = reader.result.split(',')[1]; // Extract base64 data
      
      const payload = {
        buyer_id: buyerId,
        dish_id: dishId,
        content: content,
        rating: rating,
        image_data: imageBase64 // Include image data directly in payload
      };
      
      const accessToken = await authToken();
      
      try {
        const response = await axios.post(url, {...payload}, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json' // Set content type to JSON
          },
        });
        
        if (response.status !== 200) {
          // Handle error
          throw new Error('Failed to post review');
        }
        
        resolve(response.data);
      } catch (error) {
        console.error("Error:", error);
        
        if (error.response && error.response.status === 500) {
          // Redirect to error page for 500 errors
          window.location.href = '/error-page';
        } else {
          // Handle other errors as needed
          reject(error.response.data.detail);
        }
      }
    };
    
    reader.onerror = error => {
      reject(error);
    };
  });
};


const getDishReviewByDishId = async (dishId) => {
  const url = `${URL}/dish-review/dish/${dishId}`
  return getRequestWithoutToken(url)
}

const getDishRatingByDishId = async (dishId) => {
  const url = `${URL}/dish-review/rating/${dishId}`
  return getRequestWithoutToken(url)
}

const gerDishReviewByBuyerIdAndDishId = async (dishId, buyerId, authToken) => {
  const url = `${URL}/dish-review/dish/${dishId}/buyer/${buyerId}`
  return getRequestWithToken(url, authToken)
}
export {
  postDishReview,
  getDishReviewByDishId,
  getDishRatingByDishId,
  gerDishReviewByBuyerIdAndDishId,
}
