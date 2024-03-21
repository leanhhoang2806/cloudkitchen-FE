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
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import { useAuth0 } from '@auth0/auth0-react'
import { getBuyerByEmail } from 'apis/buyer'
import Theme from './Theme'
import { useDispatch } from 'react-redux'
import { changeEmail } from 'store/slices/userSlice'
import { getOrderByBuyerId } from 'apis/orders'
import { getSellerByEmail } from 'apis/sellerRegister'
import { updateSeller } from 'store/slices/userSlice'
import { convertToHumanReadable } from 'utilities/DateTimeConversion'
import { getDishById } from 'apis/dish'
import { ENUMS } from 'utilities/EnumsConversions'
import YelloBackGroundBlackTextButton from './shared-component/YellowBlackButton'
import { postChatRoom } from 'apis/chatRoom'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProfilePage = () => {
  const [page, setPage] = useState(1)
  const itemsPerPage = 10
  const [orders, setOrders] = useState([])
  const [orderDetails, setOrderDetails] = useState([])
  const dispatch = useDispatch()
  const mainUser = useSelector((state) => state.user)
  const navigate = useNavigate()

  const { getAccessTokenSilently, user } = useAuth0()

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const handleChatButtonClick = async (sellerId) => {
    await postChatRoom(mainUser.buyerId, sellerId, getAccessTokenSilently)
    navigate(`/chat/${mainUser.buyerId}`)
  }

  useEffect(() => {
    const fetchUser = async () => {
      const getUser = await getBuyerByEmail(getAccessTokenSilently, user.email)
      const getOrders = await getOrderByBuyerId(
        getUser.id,
        getAccessTokenSilently,
      )
      if (getOrders.length > 0) {
        const orderIds = getOrders.map((order) => order.dish_id)
        const dishesByOrder = await Promise.all(
          orderIds.map((id) => getDishById(id, getAccessTokenSilently)),
        )
        setOrderDetails(dishesByOrder)
      }
      setOrders(getOrders)
      dispatch(changeEmail(getUser))
    }
    const getPossibleSeller = async () => {
      const seller = await getSellerByEmail(user.email, getAccessTokenSilently)
      if (seller) {
        dispatch(updateSeller(seller.id))
      }
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
          My Purchases
        </Typography>
        <Divider sx={{ bgcolor: 'grey.600', height: 3 }} />
        {orders.length == 0 && (
          <Typography
            variant="h5"
            gutterBottom
            sx={{ textAlign: 'center', color: 'red', marginTop: '10px' }}
          >
            No order is found
          </Typography>
        )}
        <List>
          {orderDetails.slice(startIndex, endIndex).map((order, index) => (
            <React.Fragment key={`${index}_${order.order_id}`}>
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
                    >{`Status: ${ENUMS[orders[index].status]}`}</Typography>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        variant="body2"
                        component="span"
                        color="textPrimary"
                        style={{ paddingLeft: '10px' }}
                      >
                        Order at: {convertToHumanReadable(order.created_at)}
                      </Typography>
                      <br />
                      <Typography
                        variant="body2"
                        component="span"
                        color="textPrimary"
                        style={{ paddingLeft: '10px' }}
                      >
                        Price: {order.price}
                      </Typography>
                    </React.Fragment>
                  }
                  style={{ paddingLeft: '20px' }} // Add left padding to the ListItemText
                />
                <ListItemSecondaryAction>
                  <YelloBackGroundBlackTextButton
                    variant="contained"
                    size="small"
                    onClick={() => handleChatButtonClick(order.seller_id)}
                  >
                    Chat
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
