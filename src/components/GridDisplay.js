import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  Grid,
  Button,
  Rating,
  Modal,
  Box,
  Typography,
  Paper,
  Divider,
  CardMedia,
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

function SearchResultCard({
  imageUrl,
  price,
  dishId,
  percentage,
  sellerName,
  dishName,
  quantities,
}) {
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
    <Card sx={{ width: '100%', height: '100%', borderRadius: '16px' }}>
      {percentage === undefined ? (
        <CardMedia
          component="img"
          height="240" // Increased height for bigger cards
          image={imageUrl}
          alt="Default Image"
          sx={{
            width: '100%',
            position: 'relative',
            objectFit: 'scale-down',
            left: 0,
            top: 0,
            height: '70%',
          }}
          style={{
            objectPosition: 'center',
            backgroundSize: 'cover',
          }}
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
          quantities={quantities}
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
          <div style={{ position: 'relative', width: '100%', height: '240px' }}>
            <img
              src={imageUrl}
              alt=""
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>

          <Box sx={{ mt: 2, width: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Reviews ({reviews.length})
            </Typography>
            <Paper style={{ padding: '40px 20px', width: '100%' }}>
              {reviews.length === 0 && (
                <Typography variant="h6" gutterBottom>
                  No Review
                </Typography>
              )}
              {reviews.map((review) => {
                return (
                  <div key={review.id}>
                    {review.s3_path && (
                      <img
                        src={review.s3_path}
                        alt="Review Image"
                        style={{
                          width: '20%',
                          objectFit: 'contain',
                          marginBottom: '10px', // Add some space below the image
                        }}
                      />
                    )}
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
  dishName: PropTypes.string.isRequired,
  quantities: PropTypes.number.isRequired,
}

function DisplayPaginatedDishResults({ dishes }) {
  const displayGrid = () => {
    if (dishes.length == 1) {
      return 12
    } else if (dishes.length == 2) {
      return 6
    } else {
      return 3
    }
  }

  useEffect(() => {}, [])

  return (
    <Grid
      container
      spacing={4}
      style={{ paddingLeft: 200, paddingRight: 200, paddingBottom: '56px' }}
    >
      {dishes.map((item, index) => (
        <Grid item xs={displayGrid()} key={index}>
          <SearchResultCard
            imageUrl={item.s3_path}
            price={item.price}
            dishId={item.dish_id}
            percentage={item.discounted_percentage}
            sellerName={item.seller_name}
            dishName={item.name}
            item={item}
            style={{ width: '100%' }}
            quantities={item.quantities}
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
