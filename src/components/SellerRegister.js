import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import Theme from './Theme';
import { sellerPost } from 'apis/sellerRegister';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

function SellerRegistration() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { getAccessTokenSilently } = useAuth0();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Perform form validation here if needed
        
        try {
            await sellerPost(formData, getAccessTokenSilently)
            navigate("/seller/dashboard")
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <Theme>
            <Typography variant="h4" 
                        sx={{ marginBottom: '20px', marginTop: '20px' }}>Seller Registration</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    fullWidth
                    sx={{ marginBottom: '20px' }}
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    fullWidth
                    sx={{ marginBottom: '20px' }}
                />
                <TextField
                    label="Phone (Optional)"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    fullWidth
                    sx={{ marginBottom: '20px' }}
                />
                <TextField
                    label="Address (Optional)"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    fullWidth
                    sx={{ marginBottom: '20px' }}
                />
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    Register
                </Button>
            </form>
        </Theme>
    );
}

export default SellerRegistration;
