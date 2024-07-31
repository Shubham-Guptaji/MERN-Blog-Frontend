import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client' 
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './App.jsx'
import store from './Redux/store.js'
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store} >
      
      <BrowserRouter>
      <GoogleOAuthProvider clientId="638014892506-m49vr6rihciagu5u1qh2qtld164d5iq2.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
        <Toaster />
      </BrowserRouter>
      
    </Provider>
  // </React.StrictMode>,
)
