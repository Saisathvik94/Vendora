import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"
import { Routes, Route } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx"
import LoginPage from "./pages/Login.jsx"
import SignupPage from './pages/Signup.jsx'
import Product from './pages/Products.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import UserDashboard from './pages/UserDashboard.jsx'
import VendorDashboard from './pages/VendorDashboard.jsx'
import VendorProducts from './pages/VendorProducts.jsx'
import AddProduct from './pages/AddProduct.jsx'
import Orders from './pages/Orders.jsx'
import Aboutus from './pages/Aboutus.jsx'
import Support from './pages/Support.jsx'
import Cart from './pages/Cart.jsx'
import PageNotFound from "./components/PageNotFound.jsx";
import Checkout from './pages/Checkout.jsx'

function App() {

  return (
    <>
      <Toaster position="top-right" />
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />}></Route>
          <Route path="/products" element={<Product />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/support" element={<Support />} />
          <Route path="/pagenotfound" element={<PageNotFound/>}/>

          {/* Protected User Routes */}
          <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>
          
          {/* Protected Vendor Routes */}
          <Route element={<ProtectedRoute allowedRoles={["vendor"]} />}>
            <Route path="/vendor/dashboard" element={<VendorDashboard />} />
            <Route path="/vendor/products" element={<VendorProducts />} />
            <Route path="/vendor/products/add" element={<AddProduct />} />
          </Route>
          
          
        </Routes>
      </div>
      <Footer />

    </>
  )
}

export default App
