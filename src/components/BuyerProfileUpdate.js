import React, { useEffect, useState } from 'react'
import { Typography, Divider, TextField, Button } from '@mui/material'
import { useAuth0 } from '@auth0/auth0-react'
import { useSelector } from 'react-redux'
import { getBuyerById } from 'apis/buyer'
import Theme from './Theme'
import { updateBuyerInfo } from 'apis/buyer'

import { useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types'

function BuyerInfoUpdateForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const navigate = useNavigate()

  const mainUser = useSelector((state) => state.user)

  const { getAccessTokenSilently } = useAuth0()
  useEffect(() => {
    getBuyerById(mainUser.buyerId, getAccessTokenSilently).then(
      response => {
        setName(response.name || 'Please Add Name')
        setPhone(response.phone || 'Please add phone number')
        setAddress(response.address || 'Please add delivery address')
      },
    )
    // eslint-disable-next-line
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = {
      name,
      phone,
      address,
      
    }
    updateBuyerInfo(mainUser.buyerId, {...formData}, getAccessTokenSilently).then(navigate("/profile"))
  }

  return (
    <Theme>
    <div
      style={{
        width: '30%',
        margin: 'auto',
        backgroundColor: 'white',
        padding: '20px',
        marginTop: '20px'
      }}
    >
      <Typography variant="h4" gutterBottom>
        Update Buyer Information
      </Typography>
      <Divider sx={{ bgcolor: 'grey.600', height: 3 }} />
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
          margin="normal"
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '20px',
          }}
        >
          <Button type="submit" variant="contained" color="primary">
            Update
          </Button>
        </div>
      </form>
   
      </div>
    </Theme>
  )
}

// BuyerInfoUpdateForm.propTypes = {
//   setSelectedItem: PropTypes.func.isRequired,
// }

export default BuyerInfoUpdateForm
