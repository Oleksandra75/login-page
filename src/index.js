import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import App from 'App'
import 'index.css'
import store from 'store'
import { Provider } from 'react-redux'
// import {ApiProvider} from '@reduxjs/toolkit/query/react'
// import {apiMovie} from './util/apiSlice'

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    {/* <ApiProvider api={apiMovie}> */}
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ClerkProvider>
    {/* </ApiProvider> */}
    {/* </React.StrictMode> */}
  </Provider>
)
