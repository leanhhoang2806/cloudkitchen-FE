import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { getDishesPagination } from 'apis/dish'
import { getFeaturedDishPagination } from 'apis/featured_dish'
import Spinner from './SpinnerComponent'
import Carousel from 'components/Carousel'
import DisplayPaginatedDishResults from 'components/GridDisplay'
import BackGroundImage from 'media/images/background_image.jpg'
import Theme from 'components/Theme'
import { searchDishesByNameOrZipcode } from 'apis/search'

function LandingPage() {
  const [skip, setSkip]= useState(0)
  const [dishes, setDishes] = useState([])
  const [featuredDishes, setFeaturedDishes] = useState([])
  const [zipCode, setZipCode] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const getDish = async () => {
      const fetchedDishes = await getDishesPagination(skip)
      if (fetchedDishes) {
        setDishes((prevDishes) => [...prevDishes, ...fetchedDishes]);
      }
    }
    const getFeaturedDishes = async () => {
      const dishes = await getFeaturedDishPagination(skip)
      if (dishes) {
        setFeaturedDishes(dishes)
      }
    }
    getDish()
    getFeaturedDishes()
    setLoading(false)
  }, [skip])

  const handleSearch = async () => {
    try {
      setLoading(true)
      const dishes = await searchDishesByNameOrZipcode(searchTerm, zipCode)
      setDishes(dishes)
      setLoading(false)
    } catch (error) {
      console.error('Error searching for dishes:', error)
      setLoading(false)
    }
  }

  const handleChange = (event) => {
    setSearchTerm(event.target.value)
  }
  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value)
  }
  const handleLoadMore = () => {
    setSkip((prevSkip) => prevSkip + 10); // Adjust the pagination limit as needed
  };

  return (
    <Theme>
      <Spinner loading={loading} />

      {/* Background Image with Title */}
      <div
        style={{
          backgroundImage: `url(${BackGroundImage})`,
          backgroundSize: 'cover',
          width: '90%',
          height: '500px',
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
          <Grid item xs={9} sm={6}>
            <TextField
              label="Restaurants"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ borderRadius: '20px', bgcolor: 'white' }}
              InputProps={{ sx: { borderRadius: '20px' } }}
              value={searchTerm}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              label="Zip Code"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ borderRadius: '20px', bgcolor: 'white' }}
              InputProps={{ sx: { borderRadius: '20px' } }}
              value={zipCode}
              onChange={handleZipCodeChange}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ borderRadius: '20px' }}
              onClick={handleSearch}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </div>
      {/* Render Carousel only when featuredDishes is not empty */}
      {featuredDishes.length > 0 && (
        <div style={{ marginTop: '50px', width: '70%' }}>
          <Carousel items={featuredDishes} />
        </div>
      )}
      {/* Search Results */}
      <div style={{ marginTop: '50px' }}>
        <DisplayPaginatedDishResults dishes={dishes} />
      </div>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Button variant="contained" color="primary" onClick={handleLoadMore}>
          Load More
        </Button>
      </div>
    </Theme>
  )
}

export default LandingPage
