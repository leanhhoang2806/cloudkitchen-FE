import { getRequestWithoutToken } from './GenericRequest'

const searchDishesByNameOrZipcode = async (zipcode, sellerName) => {
  if (zipcode.trim() === '') {
    return
  }
  const url = `http://localhost:8000/api/v1/search`
  const params = {
    seller_name: sellerName,
    zip_code: zipcode,
  }
  return getRequestWithoutToken(url, params)
}

export { searchDishesByNameOrZipcode }
