import React, { useEffect } from 'react'
import LandingPage from 'components/LandingPage'
import { Auth0ProviderWithNavigate } from 'components/Auth0'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { NotFoundPage } from 'components/NotFound'
import ProfilePage from 'components/Profile'
import { useAuth0 } from '@auth0/auth0-react'
import LoadingOverlay from 'components/Loading'
import Dashboard from 'components/SellerDashboard'
import SellerRegistration from 'components/SellerRegister'
import { useSelector } from 'react-redux'
import CheckoutOrdersPage from 'components/CheckoutPage'

const AllRoutes = () => {
  const { isLoading, isAuthenticated, logout } = useAuth0()
  const user = useSelector((state) => state.user)
  useEffect(() => {
    // Add an event listener for unload
    const handleUnload = () => {
      logout()
    }

    window.addEventListener('unload', handleUnload)

    // Cleanup the event listeners when the component is unmounted
    return () => {
      window.removeEventListener('unload', handleUnload)
    }

    // eslint-disable-next-line
  }, [])

  if (isLoading) {
    return <LoadingOverlay />
  }
  return (
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route
        path="/profile"
        element={isAuthenticated ? <ProfilePage /> : <Navigate to="/" />}
      />
      <Route
        path="/seller/dashboard"
        element={
          isAuthenticated && user.isSeller ? <Dashboard /> : <Navigate to="/" />
        }
      />
      <Route
        path="/seller/register"
        element={isAuthenticated ? <SellerRegistration /> : <Navigate to="/" />}
      />
      <Route
        path="/buyer/:buyer_id/cart"
        element={isAuthenticated ? <CheckoutOrdersPage /> : <Navigate to="/" />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
function App() {
  return (
    <Router>
      <Auth0ProviderWithNavigate>
        <AllRoutes />
      </Auth0ProviderWithNavigate>
    </Router>
  )
}

export default App
