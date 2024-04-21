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
  Grid,
  Modal,
  Box,
} from '@mui/material'
import Button from '@mui/material/Button'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import { useAuth0 } from '@auth0/auth0-react'
import { useSelector } from 'react-redux'
import { getDishBySellerId } from 'apis/dish'
import { postFeatureDish, deleteFeaturedDish } from 'apis/featured_dish'
import { deleteDishBySeller } from 'apis/dish'
import YelloBackGroundBlackTextButton from './shared-component/YellowBlackButton'
import {
  createDiscountedDish,
  getDiscountedDish,
  deleteDiscountedDish,
} from 'apis/discountedDish'
import Spinner from './SpinnerComponent'
import { mergeDishAndDiscountDish } from 'utilities/CombinedListObjects'

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

export const DashboardComponent = () => {
  const [dishes, setDishes] = useState([])
  const [page, setPage] = useState(1)

  const [loading, setLoading] = useState(false)
  const [displayMaxFeatureReached, setDisplayMaxFeatureReached] =
    useState(false)

  const mainUser = useSelector((state) => state.user)

  const { getAccessTokenSilently } = useAuth0()
  const itemsPerPage = 10

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  const handleCloseModal = () => {
    setDisplayMaxFeatureReached(false)
  }

  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const getDish = async () => {
    setLoading(true)
    const dishes = await getDishBySellerId(
      mainUser.sellerId,
      getAccessTokenSilently,
    )
    if (dishes.length > 0) {
      const dishIds = dishes.map((dish) => dish.id)
      const discountedDishes = await Promise.all(
        dishIds.map((id) => getDiscountedDish(id)),
      )
      setDishes(mergeDishAndDiscountDish(dishes, discountedDishes))

      setLoading(false)
      return
    }

    setDishes(dishes)

    setLoading(false)
    return dishes
  }

  const handleFeatureClick = async (dishId) => {
    try {
      await postFeatureDish(dishId, getAccessTokenSilently)
      await getDish()
    } catch (error) {
      if (error === 'MaximumFeaturedLimit') {
        setDisplayMaxFeatureReached(true)
      }
    }
  }

  const handleOnDeleteClick = async (dishId) => {
    try {
      await deleteDishBySeller(dishId, getAccessTokenSilently)
      await getDish()
    } catch (error) {
      console.error('Error featuring dish:', error)
    }
  }

  const handleUnfeatureClick = async (dishId) => {
    try {
      await deleteFeaturedDish(dishId, getAccessTokenSilently)
      await getDish()
    } catch (error) {
      console.error('Error featuring dish:', error)
    }
  }

  const createDiscountOnClick = async (dishId, percentage) => {
    await createDiscountedDish(
      {
        dish_id: dishId,
        discounted_percentage: percentage,
      },
      getAccessTokenSilently,
    )
    await getDish()
  }

  const onRemoveDiscountClick = async (dishId) => {
    await deleteDiscountedDish(dishId, getAccessTokenSilently)
    await getDish()
  }

  useEffect(() => {
    getDish()
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
      <Spinner loading={loading} />
      <Typography variant="h4" gutterBottom>
        My Menu
      </Typography>
      <Divider sx={{ bgcolor: 'grey.600', height: 3 }} />
      <List>
        {dishes.slice(startIndex, endIndex).map((dish) => (
          <React.Fragment key={dish.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt="Food"
                  src={dish.s3_path}
                  style={{ width: '150px', height: '150px' }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle1"
                    style={{ color: '#4287f5' }}
                  >{`Status: ${dish.status}`}</Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      variant="body2"
                      component="span"
                      color="textPrimary"
                      style={{ marginLeft: '20px' }}
                    >
                      Price: {dish.price}
                    </Typography>
                  </React.Fragment>
                }
                style={{ paddingLeft: '20px' }}
              />
              <ListItemSecondaryAction>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Grid item xs={1} />
                  {dish.discounted_percentage && (
                    <Grid item>
                      <Button
                        variant="contained"
                        disabled
                        size="small"
                        sx={{ marginRight: '10px' }}
                      >
                        {`${dish.discounted_percentage}% OFF`}
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => onRemoveDiscountClick(dish.discount_id)}
                      >
                        Remove Discount
                      </Button>
                    </Grid>
                  )}
                  {!dish.discounted_percentage && (
                    <>
                      <Grid item>
                        <YelloBackGroundBlackTextButton
                          onClick={() =>
                            createDiscountOnClick(dish.dish_id, 15)
                          }
                          size="small"
                        >
                          15% OFF
                        </YelloBackGroundBlackTextButton>
                      </Grid>
                      <Grid item>
                        <YelloBackGroundBlackTextButton
                          onClick={() =>
                            createDiscountOnClick(dish.dish_id, 25)
                          }
                          size="small"
                        >
                          25% OFF
                        </YelloBackGroundBlackTextButton>
                      </Grid>
                      <Grid item>
                        <YelloBackGroundBlackTextButton
                          onClick={() =>
                            createDiscountOnClick(dish.dish_id, 50)
                          }
                          size="small"
                        >
                          50% OFF
                        </YelloBackGroundBlackTextButton>
                      </Grid>
                    </>
                  )}
                  {/* Grid container for Delete and Feature buttons */}
                  <Grid item>
                    <Grid container spacing={1}>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => handleOnDeleteClick(dish.dish_id)}
                        >
                          DELETE
                        </Button>
                      </Grid>
                      {!dish.is_featured && (
                        <Grid item>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => handleFeatureClick(dish.dish_id)}
                          >
                            FEATURE
                          </Button>
                        </Grid>
                      )}
                      {dish.is_featured && (
                        <Grid item>
                          <Button
                            variant="contained"
                            color="inherit"
                            size="small"
                            onClick={() => handleUnfeatureClick(dish.dish_id)}
                          >
                            UNFEATURE
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      <Pagination
        count={Math.ceil(dishes.length / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />
      <Modal
        open={displayMaxFeatureReached}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* Your modal content here */}
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Maximum Feature Limit Reached
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You have reached the maximum feature limit.
          </Typography>
          {/* You can add buttons or actions as needed */}
        </Box>
      </Modal>
    </div>
  )
}
