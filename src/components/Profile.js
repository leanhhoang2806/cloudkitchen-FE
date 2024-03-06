import React, { useState, useEffect } from 'react'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Pagination,
} from '@mui/material'
// import Button from '@mui/material/Button'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import { useAuth0 } from '@auth0/auth0-react'
import { getBuyerByEmail } from 'apis/buyer'
import Theme from './Theme'
import { useDispatch } from 'react-redux'
import { changeEmail } from 'store/slices/userSlice'
import { getOrderByBuyerId } from 'apis/orders.'
import { getSellerByEmail } from 'apis/sellerRegister';
import { updateSeller } from 'store/slices/userSlice'

const ProfilePage = () => {
  const [page, setPage] = useState(1)
  const itemsPerPage = 10
  const [orders, setOrders] = useState([])
  const dispatch = useDispatch()

  const { getAccessTokenSilently, user } = useAuth0()

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  useEffect(() => {
    
    const fetchUser = async () => {
      const getUser = await getBuyerByEmail(getAccessTokenSilently, user.email)
      const getOrders = await getOrderByBuyerId(
        getUser.id,
        getAccessTokenSilently,
      )
      setOrders(getOrders)
      dispatch(changeEmail(getUser))
    }
    const getPossibleSeller = async () => {
      const seller = await getSellerByEmail(user.email, getAccessTokenSilently)

      dispatch(updateSeller(seller.id))
    }
    fetchUser()
    getPossibleSeller()
     // eslint-disable-next-line
  }, [])

  return (
    <Theme>
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
        {orders.length == 0 && 
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', color: 'red', marginTop: "10px" }}>
          No order is found
        </Typography>}
        <List>
          {orders.slice(startIndex, endIndex).map((order) => (
            <React.Fragment key={order.id}>
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
                        Time: {order.time}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="span"
                        color="textPrimary"
                        style={{ marginLeft: '20px' }}
                      >
                        Price: {order.price}
                      </Typography>
                    </React.Fragment>
                  }
                  style={{ paddingLeft: '20px' }} // Add left padding to the ListItemText
                />
                <ListItemSecondaryAction>
                  {/* <Button variant="contained" color="error" size="small">
                    DELETE
                  </Button> */}
                </ListItemSecondaryAction>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
        <Pagination
          count={Math.ceil(orders.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'center',
          }}
        />
      </div>
    </Theme>
  )
}

export default ProfilePage
