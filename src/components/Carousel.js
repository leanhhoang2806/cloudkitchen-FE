import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Slide from '@mui/material/Slide'
import Card from '@mui/material/Card'
import {CardMedia} from '@mui/material';
import { getAllFeaturedDish } from 'apis/dish'
import { useAuth0 } from '@auth0/auth0-react'
import PropTypes from 'prop-types';


function Carousel({ items }) {
  const isImageEndInJpgOrPng = (path) => {
    const regex = /\.(jpg|png)$/i;
    return regex.test(path);
  }
  const [filteredDish, setFilteredDish] = useState([])
  const [currentItemIndex, setCurrentItemIndex] = useState(0)

  const { getAccessTokenSilently } = useAuth0()

  const goToPrevious = () => {
    setCurrentItemIndex((prevIndex) =>
      prevIndex === 0 ? filteredDish.length - 1 : prevIndex - 1,
    )
  }

  const goToNext = () => {
    setCurrentItemIndex((prevIndex) =>
      prevIndex === filteredDish.length - 1 ? 0 : prevIndex + 1,
    )
  }

  // Calculate indices for the three items to display
  const currentIndex = currentItemIndex % filteredDish.length
  const previousIndex = (currentItemIndex - 1 + filteredDish.length) % filteredDish.length
  const nextIndex = (currentItemIndex + 1) % filteredDish.length

  // Calculate width for the cards to occupy approximately 70% of the screen width
  const cardWidth = `${70 / 3}%`
  const cardHeight = `250px` // Increase the card height by 50%
  
  useEffect(() => {
    const getFeaturedDish = async () => {
      const ids = items.map(item => item.dish_id)
      const dishes = await getAllFeaturedDish( ids,getAccessTokenSilently)
      dishes.filter(item => "s3_path" in item).filter(item => isImageEndInJpgOrPng(item.s3_path))
      setFilteredDish(dishes)
    }
    getFeaturedDish()

  }, [items, getAccessTokenSilently])

  return (
    
  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
    {filteredDish.length !== 0 && (
      <>
      <IconButton onClick={goToPrevious}>
        <NavigateBeforeIcon />
      </IconButton>
      <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Card sx={{ width: cardWidth, height: cardHeight, marginRight: '10rem' }}>
          <CardMedia component="img" image={filteredDish[previousIndex].s3_path} alt={filteredDish[previousIndex].title} />
        </Card>
      </Slide>
      <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Card sx={{ width: cardWidth, height: cardHeight, marginRight: '10rem' }}>
          <CardMedia component="img" image={filteredDish[currentIndex].s3_path} alt={filteredDish[currentIndex].title} />
        </Card>
      </Slide>
      <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Card sx={{ width: cardWidth, height: cardHeight }}>
          <CardMedia component="img" image={filteredDish[nextIndex].s3_path} alt={filteredDish[nextIndex].title} />
        </Card>
      </Slide>
      <IconButton onClick={goToNext}>
        <NavigateNextIcon />
      </IconButton>
      </>
      )}
    </Box>
  )
}

Carousel.propTypes = {
  items: PropTypes.array
}

export default Carousel
