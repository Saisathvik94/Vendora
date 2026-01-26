import React from 'react'
import Navbar from "./components/Navbar.jsx"
import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home.jsx"
function App() {

  return (
    <>
    <Navbar/>
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </div>
      
    </>
  )
}

export default App
