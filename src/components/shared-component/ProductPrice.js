import React from 'react'
import PropTypes from 'prop-types'

import { Typography } from '@mui/material'

const ProductPrice = ({ price, discountPercentage }) => {
  if (discountPercentage) {
    const discountedPrice = price * (1 - discountPercentage / 100)
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        <span style={{ textDecoration: 'line-through' }}>
          Price: ${price.toFixed(2)}
        </span>
        &nbsp;
        <span style={{ color: 'red' }}> ${discountedPrice.toFixed(2)}</span>
      </Typography>
    )
  } else {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        Price: ${price.toFixed(2)}
      </Typography>
    )
  }
}

ProductPrice.propTypes = {
  price: PropTypes.number.isRequired,
  discountPercentage: PropTypes.number,
}

export default ProductPrice
