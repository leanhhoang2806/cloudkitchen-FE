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
import {ENUMS, StatusEnumsGraph} from 'utilities/EnumsConversions'
import { convertToHumanReadable } from 'utilities/DateTimeConversion'
import YelloBackGroundBlackTextButton from './shared-component/YellowBlackButton'
import { getBuyerById } from 'apis/buyer'
import { updateOrderStatusById } from 'apis/orders'

export const OrdersComponent = () => {
  const [orders, setOrders] = useState([])
  const [orderDetails, setOrderDetails] = useState([])
  const mainUser = useSelector((state) => state.user)
  const [page, setPage] = useState(1)
  const itemsPerPage = 10

  const { getAccessTokenSilently } = useAuth0()

  const getOrders = async () => {
    const orders = await getOrderBySellerId(
      mainUser.sellerId,
      getAccessTokenSilently,
    )
    if (orders.length > 0) {
      const orderIds = orders.map(order => order.id)
      const buyerIds = orders.map(order => order.buyer_id)
      const buyerInfo = await Promise.all(buyerIds.map(buyerId => getBuyerById(buyerId, getAccessTokenSilently)))
      getOrderDetailsByOrderIds(orderIds, getAccessTokenSilently).then(data => setOrderDetails(data.map((object, index) => ({ 
        ...object, ...orders[index], ...buyerInfo[index],
        order_id: orders[index].id,
        buyer_id: orders[index].buyer_id
      }))))
      setOrders(orders)
    }
    return orders
    
  }

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  const getNextStatus = (currentStatus) => StatusEnumsGraph[currentStatus]
  const handleProcessButtonOnClick = async (id, buyerId, status) => {
    await updateOrderStatusById({
      id,
      status,
      buyerId
    }, getAccessTokenSilently)
    getOrders()
  }

  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  useEffect(() => {
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
          <React.Fragment key={order.order_id}>
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
                <YelloBackGroundBlackTextButton variant="contained" onClick={() => handleProcessButtonOnClick(order.order_id, order.buyer_id, getNextStatus(order.status))} disabled={order.status === "ORDER_COMPLETE"}>
                  {ENUMS[getNextStatus(order.status)]}
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
