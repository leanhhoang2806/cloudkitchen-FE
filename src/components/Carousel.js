import React, { useState } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Slide from '@mui/material/Slide'
import Card from '@mui/material/Card'
import {CardMedia} from '@mui/material';
import PropTypes from 'prop-types';

function Carousel({ items }) {
  const isImageEndInJpgOrPng = (path) => {
    const regex = /\.(jpg|png)$/i;
    return regex.test(path);
  }
  const filterdDishes = items.filter(item => "s3_path" in item).filter(item => isImageEndInJpgOrPng(item.s3_path))
  const isEmpty = filterdDishes.length === 0;
  const [currentItemIndex, setCurrentItemIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentItemIndex((prevIndex) =>
      prevIndex === 0 ? filterdDishes.length - 1 : prevIndex - 1,
    )
  }

  const goToNext = () => {
    setCurrentItemIndex((prevIndex) =>
      prevIndex === filterdDishes.length - 1 ? 0 : prevIndex + 1,
    )
  }

  // Calculate indices for the three items to display
  const currentIndex = currentItemIndex % filterdDishes.length
  const previousIndex = (currentItemIndex - 1 + filterdDishes.length) % filterdDishes.length
  const nextIndex = (currentItemIndex + 1) % filterdDishes.length

  // Calculate width for the cards to occupy approximately 70% of the screen width
  const cardWidth = `${70 / 3}%`
  const cardHeight = `250px` // Increase the card height by 50%

  return (
    
  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
    {!isEmpty && (
      <>
      <IconButton onClick={goToPrevious}>
        <NavigateBeforeIcon />
      </IconButton>
      <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Card sx={{ width: cardWidth, height: cardHeight, marginRight: '10rem' }}>
          <CardMedia component="img" image={filterdDishes[previousIndex].s3_path} alt={filterdDishes[previousIndex].title} />
        </Card>
      </Slide>
      <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Card sx={{ width: cardWidth, height: cardHeight, marginRight: '10rem' }}>
          <CardMedia component="img" image={filterdDishes[currentIndex].s3_path} alt={filterdDishes[currentIndex].title} />
        </Card>
      </Slide>
      <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Card sx={{ width: cardWidth, height: cardHeight }}>
          <CardMedia component="img" image={filterdDishes[nextIndex].s3_path} alt={filterdDishes[nextIndex].title} />
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
