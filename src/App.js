import React from 'react';
import LandingPage from 'components/LandingPage';
import { Auth0ProviderWithNavigate } from 'components/Auth0';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { NotFoundPage } from 'components/NotFound';
import { ProfilePage } from 'components/Profile';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingOverlay from 'components/Loading';
import Dashboard from 'components/SellerDashboard';


const AllRoutes = () => {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return <LoadingOverlay />
  }
  return (
    <Routes>
      <Route exact path="/" element={<LandingPage/>}/> 
      <Route path="/profile" element={isAuthenticated ? <ProfilePage />: <Navigate to="/"/>} />
      <Route path="/seller/dashboard" element={isAuthenticated ? <Dashboard />: <Navigate to="/"/>} />
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

  );
}

export default App;
