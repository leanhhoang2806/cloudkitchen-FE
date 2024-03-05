import axios from 'axios'

const uploadFile = async (file, sellerId, getAccessTokenSilently) => {
  try {
    const accessToken = await getAccessTokenSilently()
    const formData = new FormData()
    formData.append('file', file)

    const response = await axios.post(
      `http://localhost:8000/api/v1/s3/upload/${sellerId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    return response.data
  } catch (error) {
    // Handle error
    console.error('Error uploading file:', error)
    throw error
  }
}

export default uploadFile
