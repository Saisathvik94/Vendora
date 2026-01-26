import React, { useState } from "react";
import { Link } from "react-router-dom"
import { Search } from "lucide-react"

function Navbar(){
    const [ isLoggedIn, setisLoggedIn ]= useState(false)
    return(
        <>
        <nav className="w-full">
            <div className="grid grid-cols-3 items-center px-10 py-3">
                <span className="flex justify-start text-2xl font-bold">Vendora</span>
                <div className="flex justify-center items-center gap-5 text-lg">
                    <Link to="/" className="">Home</Link>
                    <Link to="products" className="">Products</Link>
                    <Link to="aboutus" className="">Aboutus</Link>
                    <Link to="/support" className="">Support</Link>
                </div>
                <div className="m-3 flex flex-row justify-end items-center gap-5"> 
                    <Search size={26} />
                    {!isLoggedIn ? (
                        <Link
                        to="/login"
                        className="px-4 py-2 rounded-full bg-black text-white text-sm font-medium"
                        >
                        Get started
                        </Link>
                    ) : (
                        <ProfileMenu />
                    )}
                </div>
            </div>
        </nav>
        </>
    )
}


export default Navbar;