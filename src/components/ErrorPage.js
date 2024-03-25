import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
    // Optionally, you can log this error to a service for tracking
  }

  render() {
    if (this.state.hasError) {
      // Render the error page
      return (
        <div>
          <h1>Oops! Something went wrong.</h1>
          <p>We apologize for the inconvenience. Please try again later.</p>
        </div>
      )
    }

    // If no error, render the children
    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
}
export default ErrorBoundary
