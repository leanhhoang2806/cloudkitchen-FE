import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { Divider } from '@mui/material'
import Grid from '@mui/material/Grid'
import { getFeaturedDishPagination } from 'apis/featured_dish'
// import Carousel from 'components/Carousel'
import DisplayPaginatedDishResults from 'components/GridDisplay'
import BackGroundImage from 'media/images/background_image.jpg'
import Theme from 'components/Theme'
import { searchDishesByNameOrZipcode } from 'apis/search'
import YelloBackGroundBlackTextButton from './shared-component/YellowBlackButton'
import { useDispatch, useSelector } from 'react-redux'
import { updateSearchZipcode } from 'store/slices/userSlice'
import { getDiscountedDish } from 'apis/discountedDish'
import { mergeDishAndDiscountDish } from 'utilities/CombinedListObjects'
import { updateUseSpinner } from 'store/slices/userSlice'

function LandingPage() {
  const [skip, setSkip] = useState(0)
  const [dishes, setDishes] = useState([])
  // const [featuredDishes, setFeaturedDishes] = useState([])
  const [displayNoResult, setDisplayNoResult] = useState(false)
  const [zipCode, setZipCode] = useState('')

  const dispatch = useDispatch()

  const mainUser = useSelector((state) => state.user)

  const handleSearch = async (zipCode) => {
    try {
      dispatch(updateUseSpinner(true))
      const dishes = await searchDishesByNameOrZipcode(zipCode, '')
      if (dishes.length > 0) {
        const dishIds = dishes.map((dish) => dish.id)
        const discount = await Promise.all(
          dishIds.map((id) => getDiscountedDish(id)),
        )
        const discountsWithData = discount.filter(
          (data) => data !== null && data !== undefined && data !== '',
        )
        const merge = mergeDishAndDiscountDish(dishes, discountsWithData)
        setDishes(merge)
        dispatch(updateSearchZipcode(zipCode))
        dispatch(updateUseSpinner(false))
        return
      } else {
        setDisplayNoResult(true)
      }
      setDishes(dishes)
      dispatch(updateSearchZipcode(zipCode))

      dispatch(updateUseSpinner(false))
    } catch (error) {
      dispatch(updateUseSpinner(false))
    }
  }

  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value)
  }
  const handleLoadMore = () => {
    setSkip((prevSkip) => prevSkip + 10) // Adjust the pagination limit as needed
  }

  useEffect(() => {
    const getLastZipcodeSearch = async () => {
      if (mainUser.searchedZipcode !== '') {
        await handleSearch(mainUser.searchedZipcode)
      }
    }

    const getFeaturedDishes = async () => {
      const dishes = await getFeaturedDishPagination(skip)
      if (dishes) {
        // setFeaturedDishes(dishes)
      }
    }
    getFeaturedDishes()
    getLastZipcodeSearch()

    // eslint-disable-next-line
  }, [skip])

  return (
    <Theme>
      {/* Background Image with Title */}
      <div
        style={{
          backgroundImage: `url(${BackGroundImage})`,
          backgroundSize: 'cover',
          width: '90%',
          height: '400px',
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '50px',
        }}
      >
        <Typography
          variant="h1"
          component="div"
          style={{
            color: 'gold',
            backgroundImage: 'linear-gradient(to bottom, gold, #fff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
            fontSize: '6rem',
            letterSpacing: '2px',
          }}
        >
          PoPo24
        </Typography>
      </div>
      <div style={{ marginTop: '50px' }}>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          {/* Search Bar Row */}
          {/* <Grid item xs={9} sm={6}> */}
          {/* <TextField
              label="Restaurants"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ borderRadius: '20px', bgcolor: 'white' }}
              InputProps={{ sx: { borderRadius: '20px' } }}
              value={searchTerm}
              onChange={handleChange}
            /> */}
          {/* </Grid> */}
          <Grid item xs={6} sm={6}>
            <TextField
              label="Zip Code"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ borderRadius: '20px', bgcolor: 'white' }}
              InputProps={{
                sx: { borderRadius: '20px' },
                inputProps: {
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                  maxLength: 5, // Limit to 5 digits
                },
              }}
              value={zipCode}
              onChange={handleZipCodeChange}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <YelloBackGroundBlackTextButton
              variant="contained"
              color="primary"
              size="small"
              sx={{ borderRadius: '20px' }}
              onClick={() => handleSearch(zipCode)}
            >
              Search
            </YelloBackGroundBlackTextButton>
          </Grid>
        </Grid>
      </div>
      {/* Render Carousel only when featuredDishes is not empty */}

      {/* <div
        style={{
          marginTop: '20px',
          textAlign: 'left',
          paddingLeft: '20px',
          align: 'left',
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          style={{ fontWeight: 'bold' }}
          align="left"
        >
          Featured Dishes
        </Typography>
        <Divider style={{ marginTop: '5px', marginBottom: '20px' }} />
      </div>
      {featuredDishes.length > 0 && (
        <div style={{ marginTop: '50px', width: '70%' }}>
          <Carousel items={featuredDishes} />
        </div>
      )} */}
      {displayNoResult && (
        <div style={{ marginTop: '50px' }}>
          <Typography
            variant="h5"
            component="h4"
            align="left"
            style={{ fontWeight: 'bold', paddingLeft: '20px' }}
          >
            No seller is available in your area
          </Typography>
        </div>
      )}
      {/* Search Results */}
      {dishes.length > 0 && (
        <div style={{ marginTop: '50px' }}>
          <Typography
            variant="h5"
            component="h4"
            align="left"
            style={{ fontWeight: 'bold', paddingLeft: '20px' }}
          >
            Local Dishes
          </Typography>
          <Divider
            style={{
              marginTop: '5px',
              marginBottom: '20px',
              marginLeft: '20px',
            }}
          />

          <DisplayPaginatedDishResults dishes={dishes} />
        </div>
      )}
      {dishes.length > 10 && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <YelloBackGroundBlackTextButton
            variant="contained"
            color="primary"
            onClick={handleLoadMore}
          >
            Load More
          </YelloBackGroundBlackTextButton>
        </div>
      )}
    </Theme>
  )
}

export default LandingPage
