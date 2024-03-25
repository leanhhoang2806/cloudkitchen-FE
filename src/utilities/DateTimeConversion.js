const convertToHumanReadable = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleString() // Adjust locale and options as needed
}

const timeFromGivenTime = (timestamp) => {
  const currentTime = new Date()
  const givenTime = new Date(timestamp)
  const timeDifferenceInSeconds = Math.floor((currentTime - givenTime) / 1000) // Time difference in seconds

  // Calculate time difference in minutes, hours, and days
  const minutes = Math.floor(timeDifferenceInSeconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (minutes < 1) {
    return 'Just now'
  } else if (minutes < 60) {
    return `Posted ${minutes} minute${minutes > 1 ? 's' : ''} ago`
  } else if (hours < 24) {
    return `Posted ${hours} hour${hours > 1 ? 's' : ''} ago`
  } else {
    return `Posted ${days} day${days > 1 ? 's' : ''} ago`
  }
}

export { convertToHumanReadable, timeFromGivenTime }
