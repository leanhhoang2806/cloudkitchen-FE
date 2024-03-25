import React from 'react'
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
import ThankYouPage from 'components/CompleteCheckoutStaticPage'
import ChatInterface from 'components/ChatInterface'
import ErrorBoundary from 'components/ErrorPage'

const AllRoutes = () => {
  const { isLoading, isAuthenticated } = useAuth0()
  const user = useSelector((state) => state.user)

  if (isLoading) {
    return <LoadingOverlay />
  }
  return (
    <ErrorBoundary>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route
          exact
          path="/thanks"
          element={
            isAuthenticated && user.isSeller ? (
              <ThankYouPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <ProfilePage /> : <Navigate to="/" />}
        />
        <Route
          path="/seller/dashboard"
          element={
            isAuthenticated && user.isSeller ? (
              <Dashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/seller/register"
          element={
            isAuthenticated ? <SellerRegistration /> : <Navigate to="/" />
          }
        />
        <Route
          path="/buyer/:buyer_id/cart"
          element={
            isAuthenticated ? <CheckoutOrdersPage /> : <Navigate to="/" />
          }
        />
        <Route
          path="/chat/:buyer_id"
          element={isAuthenticated ? <ChatInterface /> : <Navigate to="/" />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ErrorBoundary>
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
