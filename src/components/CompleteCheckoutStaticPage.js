import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import YelloBackGroundBlackTextButton from 'components/shared-component/YellowBlackButton'
import { putStripePaymentUpdate } from 'apis/stripe'
import { useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import Spinner from './SpinnerComponent'

function ThankYouPage() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const email = useSelector((state) => state.user.email)

  const handleNavigate = () => {
    navigate('/profile') // Navigate to the specified path
  }
  const { getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    setIsLoading(true)
    putStripePaymentUpdate(email, getAccessTokenSilently)
    setIsLoading(false)
    // eslint-disable-next-line
  }, [])

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <Spinner loading={isLoading} />
      <Typography variant="h4" gutterBottom>
        Thank you for your payment!
      </Typography>
      <YelloBackGroundBlackTextButton
        variant="contained"
        color="primary"
        onClick={handleNavigate} // Call handleNavigate when the button is clicked
        style={{ marginTop: '20px' }}
      >
        Dashboard
      </YelloBackGroundBlackTextButton>
    </div>
  )
}

export default ThankYouPage
