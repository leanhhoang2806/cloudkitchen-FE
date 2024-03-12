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
import { useSelector } from 'react-redux'
import { getOrderBySellerId } from 'apis/orders'
import { getOrderDetailsByOrderIds } from 'apis/orders'
import ENUMS from 'utilities/EnumsConversions'
import { convertToHumanReadable } from 'utilities/DateTimeConversion'
import YelloBackGroundBlackTextButton from './shared-component/YellowBlackButton'
import { getBuyerById } from 'apis/buyer'

export const OrdersComponent = () => {
  const [orders, setOrders] = useState([])
  const [orderDetails, setOrderDetails] = useState([])
  const mainUser = useSelector((state) => state.user)
  const [page, setPage] = useState(1)
  const itemsPerPage = 10

  const { getAccessTokenSilently } = useAuth0()

  const handlePageChange = (event, value) => {
    setPage(value)
  }
  const handleProcessButtonOnClick = (id) => {
    console.log(id)
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
        const orderIds = orders.map(order => order.id)
        const buyerIds = orders.map(order => order.buyer_id)
        const buyerInfo = await Promise.all(buyerIds.map(buyerId => getBuyerById(buyerId, getAccessTokenSilently)))
        getOrderDetailsByOrderIds(orderIds, getAccessTokenSilently).then(data => setOrderDetails(data.map((object, index) => ({ ...object, ...orders[index], ...buyerInfo[index] }))))
        setOrders(orders)
      }
      return orders
      
    }
    getOrders()
    // eslint-disable-next-line
  }, [])


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
        {orderDetails.slice(startIndex, endIndex).map((order) => (
          <React.Fragment key={order.id}>
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
                  >{`Status: ${ENUMS[order.status]}`}</Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      variant="body2"
                      component="span"
                      color="textPrimary"
                      style={{ paddingLeft: '10px' }}
                    >
                      Time: {convertToHumanReadable(order.created_at)}
                    </Typography>
                    <br/>
                    <Typography
                      variant="body2"
                      component="span"
                      color="textPrimary"
                      style={{ marginLeft: '10px' }}
                    >
                      Price: {order.price}
                    </Typography>
                    <br/>
                    <Typography
                      variant="body2"
                      component="span"
                      color="textPrimary"
                      style={{ marginLeft: '10px' }}
                    >
                      Buyer:  {order.email}
                    </Typography>
                  </React.Fragment>
                }
                style={{ paddingLeft: '20px' }} // Add left padding to the ListItemText
              />
              <ListItemSecondaryAction>
                <YelloBackGroundBlackTextButton variant="contained" onClick={() => handleProcessButtonOnClick(order.id)}>
                  PROCESS
                </YelloBackGroundBlackTextButton>
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
