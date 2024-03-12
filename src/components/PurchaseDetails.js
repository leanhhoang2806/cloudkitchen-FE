import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
import { useParams } from 'react-router-dom';
import Theme from './Theme'
import { getOrderDetailsByOrderId } from 'apis/orders.';
import { useAuth0 } from '@auth0/auth0-react'


const PurchaseDetails = () => {

  const [page, setPage] = useState(1)
  const { purchaseId } = useParams();
  const itemsPerPage = 10
  const [ orderDetails, setOrderDetails] = useState([])
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const { getAccessTokenSilently } = useAuth0()

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  useEffect(() => {
    // get dishes given a
    getOrderDetailsByOrderId(purchaseId, getAccessTokenSilently).then(data => setOrderDetails(data))
  }, [])

  console.log("orderDetails")
  console.log(orderDetails)

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
          Order Details
        </Typography>
        <Divider sx={{ bgcolor: 'grey.600', height: 3 }} />
        <List>
          {orderDetails.slice(startIndex, endIndex).map((order) => (
            <React.Fragment key={order.id}>
              <ListItem alignItems="flex-start">
              <Link to={`/purchase/details/${order.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItemAvatar>
                  <Avatar
                    alt="Food"
                    src={order.image}
                    style={{ width: '150px', height: '150px' }}
                  />
                </ListItemAvatar>
                </Link>
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
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
        <Pagination
          count={Math.ceil(orderDetails.length / itemsPerPage)}
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

export default PurchaseDetails
