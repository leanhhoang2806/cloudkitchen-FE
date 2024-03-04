import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from 'store/slices/userSlice';
import PropTypes from 'prop-types';

function SearchResultCard({ imageUrl, price, dishId }) {
     const dispatch = useDispatch();
    const handleAddToCart = () => {
        dispatch(addToCart(dishId))
    }
    return (
      <Card sx={{ width: '100%', height: '100%' }}>
        <CardMedia
          component="img"
          height="240" // Increased height for bigger cards
          image={imageUrl}
          alt="Default Image"
          sx={{ width: '100%' }}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary" align="center">
            Price: {price}
          </Typography>
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
      </Card>
    );
  }

SearchResultCard.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    price : PropTypes.number.isRequired,
    dishId: PropTypes.string.isRequired
}

function DisplayPaginatedDishResults({ dishes }) {
  const isImageEndInJpgOrPng = (path) => {
    const regex = /\.(jpg|png)$/i;
    return regex.test(path);
  }
  const filterdDishes = dishes.filter(item => isImageEndInJpgOrPng(item.s3_path))
  const numItems = filterdDishes.length;
  
  const gridProps = {
    xs: 12,
    sm: 6,
    lg: numItems === 1 ? 12 : 4, // Set to 12 for single item, otherwise 4
    xl: numItems === 1 ? 12 : 3, // Set to 12 for single item, otherwise 3
  };

  return (
    <Grid container spacing={4} style={{ paddingLeft: 200, paddingRight: 200 }}>
      {filterdDishes.map((item, index) => (
        <Grid item {...gridProps} key={index}>
          <SearchResultCard imageUrl={item.s3_path} price={item.price} dishId={item.id} />
        </Grid>
      ))}
    </Grid>
  );
}

DisplayPaginatedDishResults.propTypes = {
    dishes: PropTypes.array.isRequired
}

export default DisplayPaginatedDishResults;
