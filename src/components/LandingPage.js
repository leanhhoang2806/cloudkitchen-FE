import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Carousel from 'components/Carousel';
import SearchResultsGrid from 'components/GridDisplay';
import BackGroundImage from 'media/images/background_image.jpg';
import Theme from 'components/Theme';

const items = [
  { title: "Item 1", content: "Content for Item 1" },
  { title: "Item 2", content: "Content for Item 2" },
  { title: "Item 3", content: "Content for Item 3" },
];

function LandingPage() {
  return (
    <Theme>

      {/* Background Image with Title */}
      <div
        style={{
          backgroundImage: `url(${BackGroundImage})`,
          backgroundSize: 'cover',
          width: '90%', height: '500px', marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative',
          overflow: 'hidden',
          borderRadius: "50px"
        }}
      >
        <Typography variant="h1" component="div"
          style={{
            color: 'gold',
            backgroundImage: 'linear-gradient(to bottom, gold, #fff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
            fontSize: '6rem',
            letterSpacing: '2px'
          }}>
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
              InputProps={{ sx: { borderRadius: '20px'} }}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              label="Zip Code"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ borderRadius: '20px', bgcolor: 'white' }} 
              InputProps={{ sx: { borderRadius: '20px'} }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ borderRadius: '20px' }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </div>
      {/* Carousel Row */}
      <div style={{ marginTop: '50px', width: '70%' }}>
        <Carousel items={items} />
      </div>
      {/* Search Results */}
      <div style={{ marginTop: '50px' }}>
        <SearchResultsGrid />
      </div>

      </Theme>

  );
}

export default LandingPage;
