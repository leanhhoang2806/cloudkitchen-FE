import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import Slide from '@mui/material/Slide'
import Card from '@mui/material/Card'
import { CardMedia, Modal, Button } from '@mui/material'
import { getAllFeaturedDish } from 'apis/dish'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { addToCart } from 'store/slices/userSlice'

function Carousel({ items }) {
  const isImageEndInJpgOrPng = (path) => {
    const regex = /\.(jpg|png)$/i
    return regex.test(path)
  }

  const [filteredDish, setFilteredDish] = useState([])
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDishId, setSelectedDishId] = useState('')

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

  const openModal = (image) => {
    setSelectedImage(image.s3_path)
    setSelectedDishId(image.id)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedImage(null)
    setSelectedDishId('')
    setIsModalOpen(false)
  }

  // Calculate indices for the three items to display
  const currentIndex = currentItemIndex % filteredDish.length
  const previousIndex =
    (currentItemIndex - 1 + filteredDish.length) % filteredDish.length
  const nextIndex = (currentItemIndex + 1) % filteredDish.length

  // Calculate width for the cards to occupy approximately 70% of the screen width
  const cardWidth = `${70 / 3}%`
  const cardHeight = `250px` // Increase the card height by 50%

  const dispatch = useDispatch()
  const handleAddToCart = () => {
    dispatch(addToCart(selectedDishId))
    closeModal()
  }

  useEffect(() => {
    const getFeaturedDish = async () => {
      const ids = items.map((item) => item.dish_id)
      const dishes = await getAllFeaturedDish(ids)
      const filtered = dishes.filter(
        (item) => 's3_path' in item && isImageEndInJpgOrPng(item.s3_path),
      )
      setFilteredDish(filtered)
    }
    getFeaturedDish()
  }, [items])

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      {filteredDish.length !== 0 && (
        <>
          {filteredDish.length > 3 && (
            <IconButton onClick={goToPrevious}>
              <NavigateBeforeIcon />
            </IconButton>
          )}
          <Slide direction="left" in={true} mountOnEnter unmountOnExit>
            <Card
              sx={{
                width: cardWidth,
                height: cardHeight,
                marginRight: '10rem',
                cursor: 'pointer',
              }}
              onClick={() => openModal(filteredDish[previousIndex])}
            >
              <CardMedia
                component="img"
                image={filteredDish[previousIndex].s3_path}
                alt={filteredDish[previousIndex].title}
              />
            </Card>
          </Slide>
          {filteredDish.length >= 2 && (
            <Slide direction="left" in={true} mountOnEnter unmountOnExit>
              <Card
                sx={{
                  width: cardWidth,
                  height: cardHeight,
                  marginRight: '10rem',
                  cursor: 'pointer',
                }}
                onClick={() => openModal(filteredDish[currentIndex])}
              >
                <CardMedia
                  component="img"
                  image={filteredDish[currentIndex].s3_path}
                  alt={filteredDish[currentIndex].title}
                />
              </Card>
            </Slide>
          )}
          {filteredDish.length >= 3 && (
            <Slide direction="left" in={true} mountOnEnter unmountOnExit>
              <Card
                sx={{ width: cardWidth, height: cardHeight, cursor: 'pointer' }}
                onClick={() => openModal(filteredDish[nextIndex])}
              >
                <CardMedia
                  component="img"
                  image={filteredDish[nextIndex].s3_path}
                  alt={filteredDish[nextIndex].title}
                />
              </Card>
            </Slide>
          )}
          {filteredDish.length > 3 && (
            <IconButton onClick={goToNext}>
              <NavigateNextIcon />
            </IconButton>
          )}
        </>
      )}
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            width: 400,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <CardMedia
            component="img"
            image={selectedImage}
            alt=""
            sx={{ width: '100%' }}
          />
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
        </Box>
      </Modal>
    </Box>
  )
}

Carousel.propTypes = {
  items: PropTypes.array,
}

export default Carousel
