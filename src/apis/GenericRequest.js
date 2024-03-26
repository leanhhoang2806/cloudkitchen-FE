import axios from 'axios'

const getRequestWithoutToken = async (url, params = {}) => {
  try {
    const response = await axios.get(url, {
      params: {
        ...params,
      },
    })

    return response.data
  } catch {
    window.location.href = '/error-page'
  }
}

const getRequestWithToken = async (url, authToken, params = {}) => {
  try {
    if (!authToken) {
      throw new Error('No authentication token found')
    }

    const accessToken = await authToken()

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        ...params,
      },
    })

    return response.data
  } catch {
    window.location.href = '/error-page'
  }
}

const postRequestWithToken = async (url, payload, authToken) => {
  try {
    if (!authToken) {
      throw new Error('No authentication token found')
    }

    const accessToken = await authToken()

    const response = await axios.post(
      url,
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    return response.data
  } catch {
    window.location.href = '/error-page'
  }
}

export { getRequestWithoutToken, getRequestWithToken, postRequestWithToken }
