import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import { Suspense } from 'react'
import App from './App'
import './i18n'
import './index.css'

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
	throw new Error('Missing Publishable Key')
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter>
        <Suspense fallback='loading'>
          <App />
        </Suspense>
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
)
