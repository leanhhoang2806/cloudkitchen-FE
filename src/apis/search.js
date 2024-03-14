import axios from 'axios'

const searchDishesByNameOrZipcode = async (zipcode, sellerName) => {
  const response = await axios.get(`http://localhost:8000/api/v1/search`, {
    params: {
      seller_name: sellerName,
      zip_code: zipcode,
    },
  })

  return response.data
}

export { searchDishesByNameOrZipcode }
