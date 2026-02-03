import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthContext.jsx"
import './App.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
)
