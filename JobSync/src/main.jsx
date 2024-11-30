import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="1061754452822-0kt0ncjaci914qd9krpru9gi01haaef3.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
