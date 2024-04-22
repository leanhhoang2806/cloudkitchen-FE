import React, { useState } from 'react'
import { Select, MenuItem } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import { useAuth0 } from '@auth0/auth0-react'
import PropTypes from 'prop-types'

const DropdownMenu = ({ showSignOut, showSeller, showSellerDashboard }) => {
  const [selectedItem, setSelectedItem] = useState('')

  const { logout } = useAuth0()

  const handleLogout = () => {
    logout({ returnTo: window.location.origin })
    navigate('/')
  }
  const navigate = useNavigate()

  const handleChange = (event) => {
    const value = event.target.value
    if (value === 'signout') {
      handleLogout()
      return
    }
    setSelectedItem(value)
    navigate(value) // Navigate immediately upon item selection
  }

  // Create seller register through API.

  return (
    <Select
      value={selectedItem}
      onChange={handleChange}
      displayEmpty
      IconComponent={MenuIcon}
    >
      <MenuItem value="/profile/update">Update Buyer Profile</MenuItem>
      {showSeller && (
        <MenuItem value="/seller/register">Seller Register</MenuItem>
      )}
      {showSellerDashboard && (
        <MenuItem value="/seller/dashboard">Seller Dashboard</MenuItem>
      )}
      {showSignOut && <MenuItem value="signout">Sign Out</MenuItem>}
    </Select>
  )
}

DropdownMenu.propTypes = {
  showSignOut: PropTypes.bool.isRequired,
  showSeller: PropTypes.bool.isRequired,
  showSellerDashboard: PropTypes.bool.isRequired,
}

export default DropdownMenu
