import React from 'react'
import { Button } from '@mui/material'
import PropTypes from 'prop-types'

function YelloBackGroundBlackTextButton({ onClick, children, ...props }) {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        backgroundColor: '#FFEB3B', // Yellow background
        color: 'black', // Black text color
        '&:hover': {
          backgroundColor: '#FFD600', // Darker yellow on hover
        },
        marginTop: '20px',
        marginBottom: '20px',
      }}
      onClick={onClick}
      fullWidth
      {...props}
    >
      {children}
    </Button>
  )
}

YelloBackGroundBlackTextButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
}

export default YelloBackGroundBlackTextButton
