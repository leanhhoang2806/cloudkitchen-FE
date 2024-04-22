import React from 'react'
import PropTypes from 'prop-types'

const AspectRatioBox = ({ ratio, children }) => {
  const style = {
    position: 'relative',
    width: '100%',
    paddingTop: `${(1 / ratio) * 100}%`, // Calculate padding based on aspect ratio
  }

  return (
    <div style={style}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        {children}
      </div>
    </div>
  )
}

AspectRatioBox.propTypes = {
  ratio: PropTypes.number.isRequired, // Aspect ratio (width / height)
  children: PropTypes.node.isRequired, // Child components
}

export default AspectRatioBox
