import React from 'react'
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar.jsx"
import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home.jsx"
import LoginPage from "./pages/Login.jsx"
import SignupPage from './pages/Signup.jsx'
function App() {

  return (
    <>
    <Toaster position="top-right" />
    <Navbar/>
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}></Route>
      </Routes>
    </div>
      
    </>
  )
}

export default App
