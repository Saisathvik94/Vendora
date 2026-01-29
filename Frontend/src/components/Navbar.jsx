import { useState, useContext, useEffect } from "react";
import { Logout } from "../api/auth.js"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/AuthContext.jsx";
import { useLocation } from "react-router-dom";
import { Search, Menu, X, User } from "lucide-react"

function Navbar(){
    const { user, setUser,isLoggedIn,setisLoggedIn,loading } = useContext(AuthContext)
    const [menuOpen, setMenuOpen] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)

    const location = useLocation()
    if (location.pathname === "/login" || location.pathname === "/signup") return null
    
    const handleLogout = async () => {
        try {
            await Logout();       // backend deletes cookie
            setUser(null);
            setisLoggedIn(false)
            setProfileOpen(false)
        } catch (err) {
            console.error(err);
        }
    };


    return(
        <>
        <nav className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-3 items-center px-4 md:px-10 py-3">
                <span className="flex justify-start text-xl md:text-2xl font-bold">Vendora</span>
                <div className="hidden md:flex justify-center items-center gap-5 text-lg">
                    <Link to="/">Home</Link>
                    <Link to="products">Products</Link>
                    <Link to="aboutus">Aboutus</Link>
                    <Link to="/support">Support</Link>
                </div>
                <div className="hidden md:flex m-3 justify-end items-center gap-5"> 
                    <Search size={26} />
                    {!isLoggedIn ? (
                        <Link
                            to="/login"
                            className="px-4 py-2 rounded-full bg-black text-white text-sm font-medium"
                        >
                            Get started
                        </Link>
                    ) : (
                    <div className="relative">
                        {/* Profile Icon */}
                        <button
                        onClick={() => setProfileOpen(prev => !prev)}
                        className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"
                        >
                        <span className="text-sm font-semibold">
                            {user?.name?.[0] || <User/>}
                        </span>
                        </button>

                        {/* Dropdown */}
                        {profileOpen && (
                            <div className="absolute right-0 mt-2 w-40 rounded-lg shadow-lg border">
                                <Link
                                to="/profile"
                                className="block px-4 py-2 text-sm"
                                onClick={() => setProfileOpen(prev => !prev)}
                                >
                                Profile
                                </Link>

                                <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-sm text-red-600"
                                >
                                Logout
                                </button>
                            </div>
                        )}
                    </div>
                    )}
                </div>

                {/* Mobile Hamburger */}
                <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex justify-end">
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>
            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className="md:hidden mx-4 mt-2 flex flex-col gap-4 p-5 bg-white/10 backdrop-blur-xl rounded-2xl border border-white shadow-lg">
                    <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link to="products" onClick={() => setMenuOpen(false)}>Products</Link>
                    <Link to="aboutus" onClick={() => setMenuOpen(false)}>Aboutus</Link>
                    <Link to="/support" onClick={() => setMenuOpen(false)}>Support</Link>
                    <div className="flex items-center gap-2 border rounded-xl px-3 py-2">
                        <Search size={20} className="text-gray-500" />
                        <input
                            type="search"
                            placeholder="Search products..."
                            className="w-full bg-transparent p-2 outline-none text-sm"
                        />
                    </div>
                    {!isLoggedIn ? (
                        <Link
                            to="/login"
                            onClick={() => setMenuOpen(false)}
                            className="px-4 py-2 rounded-full bg-black text-white text-sm font-medium text-center"
                        >
                            Get started
                        </Link>
                        ) : (
                        <div className="flex flex-col gap-2 pt-3 border-t">
                            <Link
                            to="/profile"
                            onClick={() => setMenuOpen(false)}
                            className="px-4 py-2 rounded-lg bg-gray-100"
                            >
                            Profile
                            </Link>

                            <button
                            onClick={handleLogout}
                            className="px-4 py-2 rounded-lg bg-red-100 text-red-600 text-left"
                            >
                            Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
        </>
    )
}


export default Navbar;