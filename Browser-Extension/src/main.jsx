import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserProvider} from './context/Browser-context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserProvider>
    <App />
    </BrowserProvider>
  </StrictMode>
)
