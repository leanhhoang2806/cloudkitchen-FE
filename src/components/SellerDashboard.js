import React, { useState } from 'react'
import Theme from './Theme'
import CssBaseline from '@mui/material/CssBaseline'
import MuiDrawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import RestaurantIcon from '@mui/icons-material/Restaurant'
import PeopleIcon from '@mui/icons-material/People'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import { DashboardComponent } from './DashboardComponent'
import { OrdersComponent } from './SellerOrders'
import { DishesComponent } from './DishesComponent'
import SellerInfoUpdateForm from './SellerProfile'
import { styled } from '@mui/material/styles'
import SellerChatInterface from './SellerChatInterface'

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: 240,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}))

const mainListItems = [
  { icon: <DashboardIcon />, text: 'Dashboard' },
  { icon: <ShoppingCartIcon />, text: 'Orders' },
  { icon: <RestaurantIcon />, text: 'Dishes' },
  { icon: <QuestionAnswerIcon />, text: 'Chat' },
  { icon: <PeopleIcon />, text: 'Profile' },
]

const Dashboard = () => {
  const [open, setOpen] = useState(true)
  const [selectedItem, setSelectedItem] = useState('Dashboard')

  const toggleDrawer = () => {
    setOpen(!open)
  }

  const handleItemClick = (text) => {
    setSelectedItem(text)
  }

  const renderComponent = () => {
    switch (selectedItem) {
      case 'Dashboard':
        return <DashboardComponent setSelectedItem={setSelectedItem} />
      case 'Orders':
        return <OrdersComponent setSelectedItem={setSelectedItem} />
      case 'Dishes':
        return <DishesComponent setSelectedItem={setSelectedItem} />
      case 'Profile':
        return <SellerInfoUpdateForm setSelectedItem={setSelectedItem} />
      case 'Chat':
        return <SellerChatInterface />
      default:
        return null
    }
  }

  return (
    <Theme>
      <div
        style={{
          width: '80%',
          margin: 'auto',
          backgroundColor: 'white',
          padding: '20px',
          marginTop: '20px',
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              {mainListItems.map((item, index) => (
                <ListItemButton
                  key={index}
                  onClick={() => handleItemClick(item.text)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              ))}
              <Divider sx={{ my: 1 }} />
            </List>
          </Drawer>

          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100%',
              overflow: 'auto',
              width: '70vw',
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
              <Grid
                container
                spacing={3}
                justifyContent="center"
                alignItems="center"
              >
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  {selectedItem}
                </div>
                <Grid item xs={12} md={12} lg={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      paddingBottom: '10px',
                    }}
                  >
                    {renderComponent()}
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </div>
    </Theme>
  )
}

export default Dashboard
