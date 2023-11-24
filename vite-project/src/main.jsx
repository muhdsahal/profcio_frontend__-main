import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { GoogleOAuthProvider } from "@react-oauth/google";

const theme = createTheme();

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='310290450644-el71l8nephjaa4ede8k9gvhbcbfjttp4.apps.googleusercontent.com' >

  
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
  </GoogleOAuthProvider>
)