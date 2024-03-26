// ErrorPage.js
import React from 'react'
import { Container, Typography, Button } from '@mui/material'

const ErrorPage = () => {
  return (
    <Container maxWidth="sm" style={{ marginTop: '64px' }}>
      <Typography variant="h1" align="center" gutterBottom>
        Oops! Something went wrong.
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        We apologize for the inconvenience. Please try again later.
      </Typography>
      <Button
        variant="contained"
        onClick={() => (window.location.href = '/')}
        color="primary"
      >
        Go Back
      </Button>
    </Container>
  )
}

export default ErrorPage
