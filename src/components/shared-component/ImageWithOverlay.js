import React from 'react'
import PropTypes from 'prop-types'

const ImageWithOverlay = ({ imagePath, percentage }) => {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <img src={imagePath} alt="Product" style={{ maxWidth: '100%' }} />
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: 'red',
          borderRadius: '50%',
          padding: '5px',
          color: 'white',
          fontWeight: 'bold',
        }}
      >
        Sale {percentage}%
      </div>
    </div>
  )
}

ImageWithOverlay.propTypes = {
  imagePath: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
}

export default ImageWithOverlay
