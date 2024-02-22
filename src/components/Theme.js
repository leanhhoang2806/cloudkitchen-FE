import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

function Theme({ children }) {
    const navigate = useNavigate();
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0(); // Access user object
    const [isSeller, setIsSeller] = useState(false);

    // Sample function to check if the user is a seller
    const checkIfSeller = () => {
        // Replace this with your logic to determine if the user is a seller
        // For demonstration, let's assume the user is a seller if their email contains "seller"
        const userEmail = user?.email || '';
        setIsSeller(userEmail.includes('seller'));
    };

    useEffect(() => {
        if (isAuthenticated) {
            checkIfSeller();
        }
    }, [isAuthenticated]);
    
    const onRegisterHandler = () => {
        navigate('/seller/register')
    }

    const handleLogout = () => {
      localStorage.removeItem('auth0.auth.redirect');
      localStorage.removeItem('auth0.is.authenticated');
      localStorage.removeItem('auth0.spajs.txs');
      logout({ returnTo: window.location.origin });
      navigate('/');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Roboto, sans-serif', backgroundColor: '#f0f0f0' }}>
            <AppBar position="static" sx={{ backgroundColor: 'hsl(50, 85%, 75%)', boxShadow: 'none' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'black' }}>
                        PoPo24
                    </Typography>
                    {/* Display user's name if authenticated */}
                    {isAuthenticated && 
                    <Typography variant="body1" color="black" sx={{ mr: 1 }}>
                        {user.name}
                    </Typography>}
                    
                    <Divider orientation="vertical" flexItem sx={{ borderWidth: '2px'}}/>
                    {isAuthenticated && !isSeller && (
                        <Button color="inherit" style={{ fontSize: '0.8rem', color: 'black' }} onClick={onRegisterHandler}>
                            Seller Register
                        </Button>
                    )}

                    <Divider orientation="vertical" flexItem sx={{ borderWidth: '2px'}}/>
                    <IconButton color="inherit" style={{ fontSize: '2rem', color: 'darkgray' }} onClick={handleLogout}>
                        <ExitToAppIcon sx={{ fontSize: '100%' }} />
                    </IconButton>
                    {!isAuthenticated && (
                        <IconButton color="inherit" style={{ fontSize: '2rem', color: 'darkgray' }} onClick={loginWithRedirect}>
                            <AccountCircleIcon sx={{ fontSize: '100%' }} />
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>

            {children}

            <AppBar position="static" sx={{ backgroundColor: 'hsl(50, 85%, 75%)', boxShadow: 'none', top: 'auto', bottom: 0, marginTop: '20px' }}>
                <Toolbar>
                    <Typography variant="body1" color="black" sx={{ flexGrow: 1 }}>
                        This is the footer.
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Theme;
