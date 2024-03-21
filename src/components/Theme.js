import React from 'react'
import { Link } from 'react-router-dom' // Import Link
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PropTypes from 'prop-types'
import { Badge } from '@mui/material'
import StoreIcon from '@mui/icons-material/Store'

function Theme({ children }) {
  const navigate = useNavigate()
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0()
  const location = useLocation()
  const regexBuyerCart =
    /^\/buyer\/[a-f\d]{8}-([a-f\d]{4}-){3}[a-f\d]{12}\/cart$/i

  const onRegisterHandler = () => {
    navigate('/seller/register')
  }

  const handleLogout = () => {
    logout({ returnTo: window.location.origin })
    navigate('/')
  }

  const mainUser = useSelector((state) => state.user)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Roboto, sans-serif',
        backgroundColor: '#f0f0f0',
        minHeight: '100vh',
      }}
    >
      <AppBar
        position="static"
        sx={{ backgroundColor: 'hsl(50, 85%, 75%)', boxShadow: 'none' }}
      >
        <Toolbar>
          {/* Wrap "PoPo24" with Link */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, color: 'black', textDecoration: 'none' }}
          >
            PoPo24
          </Typography>
          {isAuthenticated && !regexBuyerCart.test(location.pathname) && (
            <>
              <IconButton
                color="inherit"
                component={Link}
                to={`/buyer/${mainUser.buyerId}/cart`}
                style={{
                  fontSize: '1rem',
                  color: 'darkgray',
                  paddingLeft: '5px',
                }}
              >
                <Badge badgeContent={mainUser.cart.length} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              <Divider
                orientation="vertical"
                flexItem
                sx={{ borderWidth: '1px' }}
              />
            </>
          )}
          {/* Display user's name if authenticated */}
          {isAuthenticated && (
            <Typography
              variant="body1"
              color="black"
              component={Link}
              to="/profile"
              sx={{ mr: 1, paddingLeft: 3, paddingRight: 3 }}
            >
              {user.name}
            </Typography>
          )}

          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderWidth: '1px' }}
          />
          {isAuthenticated &&
            !mainUser.isSeller &&
            location.pathname === '/profile' && (
              <>
                <Button
                  color="inherit"
                  style={{ fontSize: '0.8rem', color: 'black' }}
                  onClick={onRegisterHandler}
                >
                  <StoreIcon />
                </Button>

                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ borderWidth: '1px', color: 'black' }}
                />
              </>
            )}
          {isAuthenticated && mainUser.isSeller && (
            <>
              <Button
                color="inherit"
                style={{ fontSize: '0.8rem', color: 'black' }}
                onClick={() => navigate('/seller/dashboard')}
              >
                Dashboard
              </Button>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ borderWidth: '2px' }}
              />
            </>
          )}

          {isAuthenticated && (
            <IconButton
              color="inherit"
              style={{ fontSize: '2rem', color: 'darkgray' }}
              onClick={handleLogout}
            >
              <ExitToAppIcon sx={{ fontSize: '80%' }} />
            </IconButton>
          )}

          {!isAuthenticated && (
            <IconButton
              color="inherit"
              style={{ fontSize: '2rem', color: 'darkgray' }}
              onClick={loginWithRedirect}
            >
              <AccountCircleIcon sx={{ fontSize: '100%' }} />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      {/* <main style={{ flexGrow: 1, paddingBottom: '20px' }}> */}
      {children}
      {/* </main> */}
      <AppBar
        position="relative"
        sx={{
          backgroundColor: 'hsl(50, 85%, 75%)',
          boxShadow: 'none',
          top: 'auto',
          // bottom: 'auto',
          bottom: 0,
          marginTop: '10px',
        }}
      >
        <Toolbar>
          <Typography variant="body1" color="black" sx={{ flexGrow: 1 }}>
            This is the footer.
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

Theme.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Theme
