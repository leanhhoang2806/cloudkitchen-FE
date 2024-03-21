import React, { useEffect, useState } from 'react'
import { Typography, Divider, TextField, Button } from '@mui/material'
import { useAuth0 } from '@auth0/auth0-react'
import { useSelector } from 'react-redux'
import { getSellerByEmail } from 'apis/sellerRegister'
import { updateSeller } from 'apis/sellerRegister'
import PropTypes from 'prop-types'

function SellerInfoUpdateForm({ setSelectedItem }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [sellerId, setSellerId] = useState('')

  const mainUser = useSelector((state) => state.user)

  const { getAccessTokenSilently } = useAuth0()
  useEffect(() => {
    getSellerByEmail(mainUser.email, getAccessTokenSilently).then(
      (response) => {
        setName(response.name || '')
        setPhone(response.phone || '')
        setAddress(response.address || '')
        setZipcode(response.zipcode || '')
        setSellerId(response.id)
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
      zipcode,
    }
    try {
      updateSeller(sellerId, formData, getAccessTokenSilently).then(
        setSelectedItem('Dashboard'),
      )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Update Seller Information
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
        <TextField
          label="Zipcode"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
          fullWidth
          margin="normal"
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <Button type="submit" variant="contained" color="primary">
            Update
          </Button>
        </div>
      </form>
    </>
  )
}

SellerInfoUpdateForm.propTypes = {
  setSelectedItem: PropTypes.func.isRequired,
}

export default SellerInfoUpdateForm
