import React, { useState, useEffect } from 'react'

const GeolocationExample = () => {
  const [coordinates, setCoordinates] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!navigator.permissions || !navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      return
    }

    const requestPermission = async () => {
      try {
        const permissionStatus = await navigator.permissions.query({
          name: 'geolocation',
        })
        if (permissionStatus.state === 'granted') {
          getLocation()
        } else if (permissionStatus.state === 'prompt') {
          await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
          })
          getLocation()
        } else {
          setError('Geolocation permission denied')
        }
      } catch (error) {
        setError(`Error querying permission: ${error}`)
      }
    }

    requestPermission()
  }, [])

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setCoordinates({ latitude, longitude })
      },
      (error) => {
        setError(`Geolocation error: ${error.message}`)
      },
    )
  }

  return (
    <div>
      {coordinates && (
        <div>
          Latitude: {coordinates.latitude}, Longitude: {coordinates.longitude}
        </div>
      )}
      {error && <div>Error: {error}</div>}
    </div>
  )
}

export default GeolocationExample
