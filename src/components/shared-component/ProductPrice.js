import React from 'react'
import PropTypes from 'prop-types'

import { Typography } from '@mui/material'

const ProductPrice = ({ price, discountPercentage, sellerName, dishName, quantities }) => {
  if (discountPercentage) {
    const discountedPrice = price * (1 - discountPercentage / 100)
    return (
      <>
        <Typography
          variant="body3"
          align="center"
          style={{ fontSize: 'small', color: 'black' }}
        >
          {dishName} - <span style={{ color: 'red' }}>{quantities}</span> available
        </Typography>
        <Typography
          variant="body1"
          align="center"
          style={{ fontWeight: 'bold', fontSize: 'larger', color: 'red' }}
        >
          <span style={{ textDecoration: 'line-through', color: 'black' }}>
            ${price.toFixed(2)}
          </span>
          &nbsp;
          <span style={{ color: 'red' }}> ${discountedPrice.toFixed(2)}</span>
        </Typography>

        <Typography
          variant="body3"
          align="center"
          style={{ fontSize: 'small' }}
        >
          Seller: {sellerName}
        </Typography>
      </>
    )
  } else {
    return (
      <>
        <Typography
          variant="body3"
          align="center"
          style={{ fontSize: 'small', color: 'black' }}
        >
          {dishName} - <span style={{ color: 'red', fontWeight: 'bold' }}>{quantities}</span> available
        </Typography>
        <Typography
          variant="body1"
          align="center"
          style={{ fontWeight: 'bold', fontSize: 'larger', color: 'red' }}
        >
          ${price.toFixed(2)}
        </Typography>
        <Typography
          variant="body3"
          align="center"
          style={{ fontSize: 'small' }}
        >
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
  dishName: PropTypes.string.isRequired,
  quantities: PropTypes.number.isRequired
}

export default ProductPrice
