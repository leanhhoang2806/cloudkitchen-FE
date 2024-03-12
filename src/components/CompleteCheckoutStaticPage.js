import React from 'react'
import { Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import YelloBackGroundBlackTextButton from 'components/shared-component/YellowBlackButton'

function ThankYouPage() {
  const navigate = useNavigate() // Get the navigate function from react-router-dom

  const handleNavigate = () => {
    navigate('/profile') // Navigate to the specified path
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <Typography variant="h4" gutterBottom>
        Thank you for your payment!
      </Typography>
      <YelloBackGroundBlackTextButton
        variant="contained"
        color="primary"
        onClick={handleNavigate} // Call handleNavigate when the button is clicked
        style={{ marginTop: '20px' }}
      >
        See your orders
      </YelloBackGroundBlackTextButton>
    </div>
  )
}

export default ThankYouPage
