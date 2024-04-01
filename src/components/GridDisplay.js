import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Rating,
  Modal,
  Box,
  Typography,
  Paper,
  Divider,
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { addToCart } from 'store/slices/userSlice'
import PropTypes from 'prop-types'
import ImageWithOverlay from './shared-component/ImageWithOverlay'
import ProductPrice from './shared-component/ProductPrice'
import { getDishReviewByDishId } from 'apis/dishReview'
import { timeFromGivenTime } from 'utilities/DateTimeConversion'
import { getDishRatingByDishId } from 'apis/dishReview'
import { getBuyerByIdNoValidation } from 'apis/buyer'
import { getSellerById } from 'apis/sellerRegister'
import { useAuth0 } from '@auth0/auth0-react'

function SearchResultCard({ imageUrl, price, dishId, percentage, sellerName, dishName }) {

  const [openModal, setOpenModal] = useState(false)
  const [reviews, setReviews] = useState([])
  const [rating, setRating] = useState(0)

  const dispatch = useDispatch()
  const handleAddToCart = () => {
    dispatch(addToCart(dishId))
  }

  const handleRatingClick = async () => {
    const reviews = await getDishReviewByDishId(dishId)
    const buyerNames = await Promise.all(
      reviews.map((review) => getBuyerByIdNoValidation(review.buyer_id)),
    )
    for (var i = 0; i < reviews.length; i++) {
      reviews[i] = {
        ...reviews[i],
        names: buyerNames[i],
      }
    }
    setReviews(reviews)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  useEffect(() => {
    getDishRatingByDishId(dishId).then((data) => setRating(data.rating))
  }, [dishId])


  return (
    <Card sx={{ width: '100%', height: '100%' }}>
      {percentage === undefined ? (
        <CardMedia
          component="img"
          height="240" // Increased height for bigger cards
          image={imageUrl}
          alt="Default Image"
          sx={{ width: '100%' }}
          style={{ objectFit: 'cover' }}
        />
      ) : (
        <ImageWithOverlay imagePath={imageUrl} percentage={percentage} />
      )}
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexGrow: 1,
        }}
      >
        <ProductPrice
          price={price}
          discountPercentage={percentage}
          sellerName={sellerName}
          dishName={dishName}
        />
        <div onClick={handleRatingClick} style={{ cursor: 'pointer' }}>
          <Rating
            name="simple-controlled"
            value={rating}
            precision={0.5}
            readOnly
            size="small"
            sx={{ marginBottom: '10px' }}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: '#FFEB3B', // Yellow background
            color: 'black', // Black text color
            '&:hover': {
              backgroundColor: '#FFD600', // Darker yellow on hover
            },
          }}
          onClick={handleAddToCart}
          fullWidth
        >
          Add to Cart
        </Button>
      </CardContent>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'auto', // Enable scrolling when content exceeds viewport,
        }}
      >
        <Box
          sx={{
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxHeight: '90vh', // Limit modal height to 90% of viewport height
            maxWidth: '90vw', // Limit modal width to 90% of viewport width
            overflowY: 'auto', // Enable vertical scrolling within modal
            width: '50%',
          }}
        >
          {imageUrl && (
            <CardMedia
              component="img"
              image={imageUrl}
              alt=""
              sx={{
                height: '20%',
                width: '20%',
                maxHeight: '10%', // Set maximum height to 50% of modal's height
                objectFit: 'contain', // Ensure image fits inside modal without cropping
                marginBottom: '10px', // Add some space below the image
              }}
            />
          )}
          <Box sx={{ mt: 2, width: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Reviews
            </Typography>
            <Paper style={{ padding: '40px 20px', width: '100%' }}>
            {reviews.length === 0 && 
            <Typography variant="h6" gutterBottom>
              No Review
            </Typography>
            }
              {reviews.map((review) => {
                return (
                  <div key={review.id}>
                    <Grid container wrap="nowrap" spacing={2}>
                      <Grid justifyContent="left" item xs zeroMinWidth>
                        <h4 style={{ margin: 0, textAlign: 'left' }}>
                          {review.name}
                        </h4>
                        <p style={{ textAlign: 'left' }}>{review.content}</p>
                        <p style={{ textAlign: 'left', color: 'gray' }}>
                          {timeFromGivenTime(review.created_at)}
                        </p>
                      </Grid>
                    </Grid>
                    <Divider variant="fullWidth" style={{ margin: '30px 0' }} />
                  </div>
                )
              })}
            </Paper>
          </Box>
        </Box>
      </Modal>
    </Card>
  )
}

SearchResultCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  dishId: PropTypes.string.isRequired,
  percentage: PropTypes.number,
  sellerName: PropTypes.string.isRequired,
  dishName: PropTypes.string.isRequired
}

function DisplayPaginatedDishResults({ dishes }) {
  const { getAccessTokenSilently } = useAuth0()
  const isImageEndInJpgOrPng = (path) => {
    const regex = /\.(jpg|png)$/i
    return regex.test(path)
  }
  const filterdDishes = dishes.filter((item) =>
    isImageEndInJpgOrPng(item.s3_path),
  )

  const [displayDishes, setDisplayDishes] = useState([])

  const numItems = filterdDishes.length

  const gridProps = {
    xs: 12,
    sm: 6,
    lg: numItems === 1 ? 12 : 6, // Set to 12 for single item, otherwise 4
    xl: numItems === 1 ? 12 : 6, // Set to 12 for single item, otherwise 3
  }

  useEffect(() => {
    Promise.all(
      dishes.map((dish) =>
        getSellerById(dish.seller_id, getAccessTokenSilently)
      )
    )
      .then((data) => {
        const updatedDishes = dishes.map((dish, index) => ({
          ...dish,
          dishName: filterdDishes[index].name,
          sellerName: data[index].name,
          ...data[index],
        }));
        return updatedDishes;
      })
      .then((updatedDishes) => {
        setDisplayDishes(updatedDishes);
      })
  }, [dishes])

  console.log("displayDIshes")
  console.log(displayDishes)

  return (
    <Grid
      container
      spacing={4}
      style={{ paddingLeft: 200, paddingRight: 200, paddingBottom: '56px' }}
    >
      {displayDishes.map((item, index) => (
        <Grid item {...gridProps} key={index}>
          <SearchResultCard
            imageUrl={item.s3_path}
            price={item.price}
            dishId={item.dish_id}
            percentage={item.discounted_percentage}
            sellerName={item.sellerName}
            dishName = {item.dishName}
            item = {item}
          />
        </Grid>
      ))}
    </Grid>
  )
}

DisplayPaginatedDishResults.propTypes = {
  dishes: PropTypes.array.isRequired,
}

export default DisplayPaginatedDishResults
