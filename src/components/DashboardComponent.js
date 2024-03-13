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
import Button from '@mui/material/Button'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import { useAuth0 } from '@auth0/auth0-react'
import { useSelector } from 'react-redux'
import { getDishBySellerId } from 'apis/dish'
import { postFeatureDish, deleteFeaturedDish } from 'apis/featured_dish'
import { deleteDishBySeller } from 'apis/dish'

export const DashboardComponent = () => {
  const [dishes, setDishes] = useState([])
  const [page, setPage] = useState(1)

  const mainUser = useSelector((state) => state.user)

  const { getAccessTokenSilently } = useAuth0()
  const itemsPerPage = 10

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const getDish = async () => {
    const dishes = await getDishBySellerId(
      mainUser.sellerId,
      getAccessTokenSilently,
    )
    if (dishes) {
      setDishes(dishes)
    }
    return dishes
  }

  const handleFeatureClick = async (dishId) => {
    try {
      await postFeatureDish(dishId, getAccessTokenSilently)
      await getDish()
    } catch (error) {
      console.error('Error featuring dish:', error)
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

  useEffect(() => {
    getDish()
    // eslint-disable-next-line
  }, [])

  console.log(dishes)

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
                style={{ paddingLeft: '20px' }} // Add left padding to the ListItemText
              />
              <ListItemSecondaryAction>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  sx={{ marginRight: '10px' }}
                  onClick={() => handleOnDeleteClick(dish.id)}
                >
                  DELETE
                </Button>
                {!dish.is_featured && (
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleFeatureClick(dish.id)}
                  >
                    FEATURE
                  </Button>
                )}
                {dish.is_featured && (
                  <Button
                    variant="contained"
                    color="inherit"
                    size="small"
                    onClick={() => handleUnfeatureClick(dish.id)}
                  >
                    UNFEATURE
                  </Button>
                )}
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
    </div>
  )
}
