import { getRequestWithoutToken } from './GenericRequest'
import { URL } from 'env/env'

const searchDishesByNameOrZipcode = async (zipcode, sellerName) => {
  if (zipcode.trim() === '') {
    return
  }
  const url = `${URL}/search`
  const params = {
    seller_name: sellerName,
    zip_code: zipcode,
  }
  return getRequestWithoutToken(url, params)
}

export { searchDishesByNameOrZipcode }
