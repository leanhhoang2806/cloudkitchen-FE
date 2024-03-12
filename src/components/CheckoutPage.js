import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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
} from '@mui/material'
import { removeItemFromCart, clearCart } from 'store/slices/userSlice'
import Theme from './Theme'
import { postOrderByBuyer } from 'apis/orders'
import Spinner from './SpinnerComponent'
import { useAuth0 } from '@auth0/auth0-react'
import { postStripePayment } from 'apis/stripe'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from './CheckoutForm'
import { Elements } from '@stripe/react-stripe-js'
import { getDishById } from 'apis/dish'

const stripePromise = loadStripe(
  'pk_test_51OrlfSJDu1ygRJcYQYwCOhk8qGe1uioqkaDoeAPwNAPvpVzeowySDjfuJFjN75wmB1LZqieLBDze9ymBX0fCqp9j00L4pVYKeQ',
)

function CheckoutOrdersPage() {
  const [displayOrders, setDisplayOrders] = useState([]);
  const [loading, setLoading] = useState(false)
  const [clientSecret, setClientSecret] = useState('')
  const [loadPaymentPlatform, setLoadPaymentPlatform] = useState(false)
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

  // Function to handle deletion of an order
  const handleDelete = (index) => {
    dispatch(removeItemFromCart(index)) // Dispatch the action to delete the order
  }

  const { getAccessTokenSilently } = useAuth0()
  const handleCheckout = async () => {
    setLoading(true)
    await postOrderByBuyer(user.buyerId, orders, getAccessTokenSilently)
    dispatch(clearCart([]))
    setLoading(false)
  }

  const handleClickOnCheckout = () => {
    setLoadPaymentPlatform(true)
  }

  useEffect(() => {
    if (orders.length > 0) {
      postStripePayment(orders, getAccessTokenSilently).then((data) =>
        setClientSecret(data.client_secret),
      )
    }

    const fetchOrders = async () => {

      // Make multiple requests concurrently
      const requests = orders.map(orderId => getDishById(orderId,getAccessTokenSilently));

      try {
        const responses = await Promise.all(requests);
        setDisplayOrders(responses);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [orders, getAccessTokenSilently])

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
                        Price: $ {order.price}
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
      </div>
    </Theme>
  )
}

export default CheckoutOrdersPage
