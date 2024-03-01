import React, { useState } from 'react'
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
import { removeItemFromCart } from 'store/slices/userSlice'
import Theme from './Theme'
import { postOrderByBuyer } from 'apis/orders.'
import Spinner from './SpinnerComponent'
import { useAuth0 } from '@auth0/auth0-react'

function CheckoutOrdersPage() {
  const [loading, setLoading] = useState(false)
  const orders = useSelector((state) => state.user.cart) // Get orders from Redux state
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()

  // Function to handle deletion of an order
  const handleDelete = (index) => {
    dispatch(removeItemFromCart(index)) // Dispatch the action to delete the order
  }

  const { getAccessTokenSilently } = useAuth0()
  const handleCheckout = async () => {
    setLoading(true)
    await postOrderByBuyer(user.buyerId, orders, getAccessTokenSilently)
    setLoading(false)
  }

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
          My Orders
        </Typography>
        <Divider sx={{ bgcolor: 'grey.600', height: 3 }} />
        <List>
          {orders.map((order, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt="Food"
                    src={order.image}
                    style={{ width: '150px', height: '150px' }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle1"
                      style={{ color: '#4287f5' }}
                    >{`Status: ${order.status}`}</Typography>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        variant="body2"
                        component="span"
                        color="textPrimary"
                        style={{ paddingLeft: '10px' }}
                      >
                        OrderId: {order}
                      </Typography>
                    </React.Fragment>
                  }
                  style={{ paddingLeft: '20px' }} // Add left padding to the ListItemText
                />
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
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
        {orders.length !== 0 && 
        <Button
          variant="contained"
          color="primary"
          style={{ alignSelf: 'flex-end' }}
          onClick={handleCheckout}
        >
          CHECKOUT
        </Button>
        }
      </div>
    </Theme>
  )
}

export default CheckoutOrdersPage
