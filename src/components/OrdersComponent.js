import React, { useState, useEffect } from 'react'
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Pagination,
} from '@mui/material'
// import Button from '@mui/material/Button'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import { useAuth0 } from '@auth0/auth0-react'
import { useSelector } from 'react-redux'
import { getOrderBySellerId } from 'apis/orders.'

export const OrdersComponent = () => {
  const [orders, setOrders] = useState([])
  const mainUser = useSelector((state) => state.user)
  const [page, setPage] = useState(1)
  const itemsPerPage = 10

  const { getAccessTokenSilently } = useAuth0()

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  useEffect(() => {
    const getOrders = async () => {
      const orders = await getOrderBySellerId(
        mainUser.sellerId,
        getAccessTokenSilently,
      )
      if (orders) {
        setOrders(orders)
      }
      return orders
    }
    getOrders()
     // eslint-disable-next-line
  },[])

  return (
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
        {orders.slice(startIndex, endIndex).map((order) => (
          <React.Fragment key={order.id}>
            <ListItem alignItems="flex-start">
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
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />
    </div>
  )
}
