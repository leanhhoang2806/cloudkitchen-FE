import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';

function SearchResultCard({ imageUrl, price }) {
  return (
    <Card sx={{ width: '100%', height: '100%' }}>
      <CardMedia
        component="img"
        height="240" // Increased height for bigger cards
        image={imageUrl}
        alt="Placeholder"
        sx={{ width: '70%' }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" align="center">
          Name: {price}
        </Typography>
      </CardContent>
    </Card>
  );
}

function DisplayPaginatedDishResults({ dishes }) {
  const numItems = dishes.length;
  const gridProps = {
    xs: 12,
    sm: 6,
    lg: numItems === 1 ? 12 : 4, // Set to 12 for single item, otherwise 4
    xl: numItems === 1 ? 12 : 3, // Set to 12 for single item, otherwise 3
  };

  return (
    <Grid container spacing={4}>
      {dishes.map((item, index) => (
        <Grid item {...gridProps} key={index}>
          <SearchResultCard imageUrl={'https://via.placeholder.com/150'} price={item.price} />
        </Grid>
      ))}
    </Grid>
  );
}

export default DisplayPaginatedDishResults;
