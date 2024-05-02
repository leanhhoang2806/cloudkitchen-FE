import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
  Button,
  Box,
  Modal,
} from '@mui/material'
import {
  removeItemFromCart,
  clearCart,
  updateUseSpinner,
} from 'store/slices/userSlice'
import Theme from './Theme'
import { postOrderByBuyer } from 'apis/orders'
import Spinner from './SpinnerComponent'
import { useAuth0 } from '@auth0/auth0-react'
import { postStripePayment } from 'apis/stripe'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from './CheckoutForm'
import { Elements } from '@stripe/react-stripe-js'
import { getDishById } from 'apis/dish'
import { getDiscountedDish } from 'apis/discountedDish'

const stripePromise = loadStripe(
  'pk_test_51OrlfSJDu1ygRJcYQYwCOhk8qGe1uioqkaDoeAPwNAPvpVzeowySDjfuJFjN75wmB1LZqieLBDze9ymBX0fCqp9j00L4pVYKeQ',
)

function CheckoutOrdersPage() {
  const [displayOrders, setDisplayOrders] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [clientSecret, setClientSecret] = useState('')
  const [loadPaymentPlatform, setLoadPaymentPlatform] = useState(false)
  const [error, setError] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const orders = useSelector((state) => state.user.cart) // Get orders from Redux state
  const user = useSelector((state) => state.user)
  const appearance = {
    theme: 'stripe',
  }
  const options = {
    clientSecret,
    appearance,
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Function to handle deletion of an order
  const handleDelete = (index) => {
    dispatch(removeItemFromCart(index)) // Dispatch the action to delete the order
  }

  const { getAccessTokenSilently } = useAuth0()
  const handleCheckout = async () => {
    setLoading(true)
    const onesArray = new Array(orders.length).fill([1]);
    await postOrderByBuyer(user.buyerId, orders, onesArray, getAccessTokenSilently)
    dispatch(clearCart([]))
    setLoading(false)
  }

  const handleClickOnCheckout = () => {
    setLoadPaymentPlatform(true)
  }

  const handleNavigateToUpdateProfile = () => {
    navigate('/profile/update')
  }

  useEffect(() => {
    dispatch(updateUseSpinner(true))
    if (orders.length > 0) {
      postStripePayment(user.buyerId, orders, getAccessTokenSilently)
        .then((data) => setClientSecret(data.client_secret))
        .catch((error) => {
          setError(error)
          setOpenModal(true)
        })

      dispatch(updateUseSpinner(false))
    }

    const fetchOrders = async () => {
      dispatch(updateUseSpinner(true))
      // Make multiple requests concurrently
      const requests = orders.map((orderId) =>
        getDishById(orderId, getAccessTokenSilently),
      )

      try {
        const responses = await Promise.all(requests)
        const discount = await Promise.all(
          responses.map((res) => getDiscountedDish(res.id)),
        )

        const dishToDiscountMapping = {}
        discount.forEach((element) => {
          dishToDiscountMapping[element.dish_id] = element.discounted_percentage
        })
        const calculate_total = responses
          .map(
            (res) =>
              res.price * (1 - (dishToDiscountMapping[res.id] ?? 0) / 100),
          )
          .reduce((accumulator, currentVal) => accumulator + currentVal, 0)
        setTotal(calculate_total)
        setDisplayOrders(responses)

        dispatch(updateUseSpinner(false))
      } catch (error) {
        console.error('Error fetching orders:', error)

        dispatch(updateUseSpinner(false))
      }
    }

    fetchOrders()

    // eslint-disable-next-line
  }, [orders])

  return (
    <Theme>
      <Spinner loading={loading} />
      <div
        style={{
          width: '80%',
          margin: 'auto',
          backgroundColor: 'white',
          padding: '20px',
          marginTop: '20px',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Cart
        </Typography>
        <Divider sx={{ bgcolor: 'grey.600', height: 3 }} />
        <List>
          {displayOrders.map((order, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt="Food"
                    src={order.s3_path}
                    style={{ width: '150px', height: '150px' }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle1"
                      style={{ color: '#4287f5' }}
                    >{`Name: ${order.name}`}</Typography>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        variant="body2"
                        component="span"
                        color="textPrimary"
                        style={{ paddingLeft: '10px' }}
                      >
                        Price:{' '}
                        <Typography
                          component="span"
                          variant="body1"
                          style={{ fontWeight: 'bold', color: 'green' }}
                        >
                          $
                        </Typography>{' '}
                        {order.price}
                      </Typography>
                    </React.Fragment>
                  }
                  style={{ paddingLeft: '20px' }} // Add left padding to the ListItemText
                />
                {!loadPaymentPlatform && (
                  <ListItemSecondaryAction>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(index)}
                    >
                      DELETE
                    </Button>
                  </ListItemSecondaryAction>
                )}
              </ListItem>
            </React.Fragment>
          ))}
        </List>
        <Divider
          variant="inset"
          sx={{ marginTop: '20px', marginBottom: '20px' }}
        />
        <Typography variant="h6" align="right" sx={{ marginTop: '10px' }}>
          <span style={{ color: 'black' }}>Total: </span>
          <span style={{ color: 'red', fontWeight: 'bold' }}>
            {total.toFixed(2)} USD
          </span>
        </Typography>
        {orders.length !== 0 && !loadPaymentPlatform && (
          <Button
            variant="contained"
            color="primary"
            style={{ alignSelf: 'flex-end' }}
            onClick={handleClickOnCheckout}
          >
            Check out
          </Button>
        )}
        {loadPaymentPlatform && (
          <Divider
            variant="inset"
            sx={{ marginTop: '20px', marginBottom: '20px' }}
          />
        )}
        {clientSecret && loadPaymentPlatform && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm handleCheckout={handleCheckout} />
          </Elements>
        )}
        <Modal
          open={openModal}
          aria-labelledby="error-modal"
          aria-describedby="error-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            <p id="error-description">{error}</p>
            <Button onClick={handleNavigateToUpdateProfile}>
              Update Profile
            </Button>
          </Box>
        </Modal>
      </div>
    </Theme>
  )
}

export default CheckoutOrdersPage
