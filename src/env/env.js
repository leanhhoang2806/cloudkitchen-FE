const URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000/api/v1'
    : 'https://app.popo24.com/api/v1'

export { URL }
