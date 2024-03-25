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
  Modal,
  Box,
  TextField,
  Rating,
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
import StarIcon from '@mui/icons-material/Star'
import { postDishReview } from 'apis/dish_review'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const ProfilePage = () => {
  const [page, setPage] = useState(1)
  const itemsPerPage = 10
  const [orders, setOrders] = useState([])
  const [orderDetails, setOrderDetails] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [reviewContent, setReviewContent] = useState('')
  const [rating, setRating] = useState(0)

  const [selectedOrder, setSelectedOrder] = useState(null)
  const dispatch = useDispatch()
  const mainUser = useSelector((state) => state.user)
  const navigate = useNavigate()

  const { getAccessTokenSilently, user } = useAuth0()

  const handlePageChange = (event, value) => {
    setPage(value)
  }
  const handleWriteReview = (order) => {
    setSelectedOrder(order)
    setShowModal(true)
  }

  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const handleChatButtonClick = async (sellerId) => {
    await postChatRoom(mainUser.buyerId, sellerId, getAccessTokenSilently)
    navigate(`/chat/${mainUser.buyerId}`)
  }
  const closeModalHandler = () => {
    setRating(0)
    setReviewContent('')
    setShowModal(false)
  }

  const handleReviewSubmit = async () => {
    await postDishReview(
      mainUser.buyerId,
      selectedOrder.id,
      reviewContent,
      rating,
      getAccessTokenSilently,
    )
    closeModalHandler()
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
                  {order.status === ENUMS.RECEIVED && (
                    <ListItem
                      alignItems="flex-start"
                      onClick={() => handleWriteReview(order)}
                    >
                      <ListItemText
                        primary={
                          <span
                            style={{
                              color: 'blue',
                              textDecoration: 'underline',
                              cursor: 'pointer',
                            }}
                          >
                            Write a Review
                          </span>
                        }
                      />
                    </ListItem>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>

        <Modal open={showModal} onClose={() => closeModalHandler()}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Write a Review
            </Typography>
            <img
              src={selectedOrder?.s3_path}
              alt="Dish"
              style={{
                width: '50%',
                height: '50%',
                margin: 'auto',
                display: 'block',
              }}
            />
            <Rating
              name="rating"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue)
              }}
              icon={<StarIcon />}
              sx={{ mt: 2 }}
            />
            <TextField
              label="Your Review"
              multiline
              rows={4}
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              fullWidth
              sx={{ mt: 2 }}
            />
            <YelloBackGroundBlackTextButton onClick={handleReviewSubmit}>
              Submit
            </YelloBackGroundBlackTextButton>
          </Box>
        </Modal>

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
