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
        <Typography variant="body2" color="text.secondary" align="right">
          Price: {price}
        </Typography>
      </CardContent>
    </Card>
  );
}

function SearchResultsGrid() {
  // Dummy data for now
  const dummyData = [
    { imageUrl: 'https://via.placeholder.com/150', price: 10 },
    { imageUrl: 'https://via.placeholder.com/150', price: 20 },
    { imageUrl: 'https://via.placeholder.com/150', price: 30 },
    { imageUrl: 'https://via.placeholder.com/150', price: 40 },

    { imageUrl: 'https://via.placeholder.com/150', price: 50 },
    // Add more dummy data as needed
  ];

  return (
    <Grid container spacing={4}>
      {dummyData.map((item, index) => (
        <Grid item xs={6} sm={4} lg={3} xl={3} key={index}>
          <SearchResultCard imageUrl={item.imageUrl} price={item.price} />
        </Grid>
      ))}
    </Grid>
  );
}

export default SearchResultsGrid;
