import React, { useState } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Slide from '@mui/material/Slide'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types';

function Carousel({ items }) {
  const [currentItemIndex, setCurrentItemIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentItemIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1,
    )
  }

  const goToNext = () => {
    setCurrentItemIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1,
    )
  }

  // Calculate indices for the three items to display
  const currentIndex = currentItemIndex % items.length
  const previousIndex = (currentItemIndex - 1 + items.length) % items.length
  const nextIndex = (currentItemIndex + 1) % items.length

  // Calculate width for the cards to occupy approximately 70% of the screen width
  const cardWidth = `${70 / 3}%`
  const cardHeight = `250px` // Increase the card height by 50%

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <IconButton onClick={goToPrevious}>
        <NavigateBeforeIcon />
      </IconButton>
      <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Card
          sx={{ width: cardWidth, height: cardHeight, marginRight: '10rem' }}
        >
          <CardContent>
            <Typography variant="h5">{items[previousIndex].title}</Typography>
            <Typography variant="body1">
              {items[previousIndex].content}
            </Typography>
          </CardContent>
        </Card>
      </Slide>
      <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Card
          sx={{ width: cardWidth, height: cardHeight, marginRight: '10rem' }}
        >
          <CardContent>
            <Typography variant="h5">{items[currentIndex].title}</Typography>
            <Typography variant="body1">
              {items[currentIndex].content}
            </Typography>
          </CardContent>
        </Card>
      </Slide>
      <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <Card sx={{ width: cardWidth, height: cardHeight }}>
          <CardContent>
            <Typography variant="h5">{items[nextIndex].title}</Typography>
            <Typography variant="body1">{items[nextIndex].content}</Typography>
          </CardContent>
        </Card>
      </Slide>
      <IconButton onClick={goToNext}>
        <NavigateNextIcon />
      </IconButton>
    </Box>
  )
}

Carousel.propTypes = {
  items: PropTypes.array
}

export default Carousel
