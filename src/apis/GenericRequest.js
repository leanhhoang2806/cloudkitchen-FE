import axios from 'axios'

// const getRequestWithoutToken = async (url, params = {}) => {
//   try {
//     const response = await axios.get(url, {
//       params: {
//         ...params,
//       },
//     })

//     return response.data
//   } catch (error) {
//     if (error.response && error.response.status === 500) {
//       // Redirect to error page for 500 errors
//       window.location.href = '/error-page'
//     } else {
//       // Handle other errors as needed
//       console.error('Error:', error)
//     }
//   }
// }

// const getRequestWithToken = async (url, authToken, params = {}) => {
//   try {
//     if (!authToken) {
//       throw new Error('No authentication token found')
//     }

//     const accessToken = await authToken()

//     const response = await axios.get(url, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//       params: {
//         ...params,
//       },
//     })

//     return response.data
//   } catch (error) {
//     if (error.response && error.response.status === 500) {
//       // Redirect to error page for 500 errors
//       window.location.href = '/error-page'
//     } else {
//       // Handle other errors as needed
//       console.error('Error:', error)
//     }
//   }
// }

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
  } catch (error) {
    if (error.response && error.response.status === 500) {
      // Redirect to error page for 500 errors
      window.location.href = '/error-page'
    } else {
      // Handle other errors as needed
      return Promise.reject(error.response.data.detail)
    }
  }
}

//  =========== uncommented below for debugger ========

const getRequestWithoutToken = async (url, params = {}) => {
  try {
    const response = await axios.get(url, {
      params: {
        ...params,
      },
    })

    return response.data
  } catch (error) {
    console.error('Error:', error)
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
  } catch (error) {
    console.error('Error:', error)
  }
}

// const postRequestWithToken = async (url, payload, authToken) => {
//   try {
//     if (!authToken) {
//       throw new Error('No authentication token found')
//     }

//     const accessToken = await authToken()

//     const response = await axios.post(
//       url,
//       { ...payload },
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       },
//     )

//     return response.data
//   } catch (error) {
//     console.error('Error:', error)
//   }
// }

export { getRequestWithoutToken, getRequestWithToken, postRequestWithToken }
