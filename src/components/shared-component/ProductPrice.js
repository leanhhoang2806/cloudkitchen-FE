import React from 'react'
import PropTypes from 'prop-types'

import { Typography } from '@mui/material'

const ProductPrice = ({ price, discountPercentage, sellerName, dishName }) => {
  if (discountPercentage) {
    const discountedPrice = price * (1 - discountPercentage / 100)
    return (
      <Typography variant="body2" color="text.secondary" align="center" sx={{color: 'black'}}>
        <span style={{ textDecoration: 'line-through' }}>
          ${price.toFixed(2)}
        </span>
        &nbsp;
        <span style={{ color: 'red' }}> ${discountedPrice.toFixed(2)}</span>
      </Typography>
    )
  } else {
    return (
      <>  
      <Typography variant="body3"  align="center" style={{ fontSize: 'small', color: 'black' }}>
      {dishName}
    </Typography>
  <Typography variant="body1"  align="center" style={{ fontWeight: 'bold', fontSize: 'larger', color: 'red' }}>
    ${price.toFixed(2)}
  </Typography>
  <Typography variant="body3"  align="center" style={{ fontSize: 'small' }}>
    Seller: {sellerName}
  </Typography>
      </>
    )
  }
}

ProductPrice.propTypes = {
  price: PropTypes.number.isRequired,
  discountPercentage: PropTypes.number,
  sellerName: PropTypes.string.isRequired,
  dishName: PropTypes.string.isRequired
}

export default ProductPrice
