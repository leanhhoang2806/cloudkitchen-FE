import { Auth0Provider } from '@auth0/auth0-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

export const Auth0ProviderWithNavigate = ({ children }) => {
  const navigate = useNavigate()

  const redirectUri = window.location.origin + '/profile'

  const onRedirectCallback = (appState) => {
    navigate(
      appState && appState.returnTo
        ? appState.returnTo
        : window.location.pathname,
    )
  }

  // Production credentials 
  // return (
  //   <Auth0Provider
  //     domain="dev-1wecvjynzqyw78g0.us.auth0.com"
  //     clientId="NSaedQleuwPbqfdgR6RF5PTX9T7hvRS4" 
  //     cacheLocation="localstorage"
  //     authorizationParams={{
  //       redirect_uri: redirectUri,
  //       audience: 'https://dev-1wecvjynzqyw78g0.us.auth0.com/api/v2/',
  //     }}
  //     onRedirectCallback={onRedirectCallback}
  //   >
  //     {children}
  //   </Auth0Provider>
  // )

  // Development credentials
  return (
    <Auth0Provider
      domain="dev-1wecvjynzqyw78g0.us.auth0.com"
      clientId="PM3G9YAvqYvMEKGOP5htCpZd5iG8VIxz" 
      cacheLocation="localstorage"
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: 'https://dev-1wecvjynzqyw78g0.us.auth0.com/api/v2/',
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  )
}

Auth0ProviderWithNavigate.propTypes = {
  children: PropTypes.node.isRequired,
}
