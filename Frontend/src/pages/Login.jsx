import { useState, useEffect, useContext } from 'react';
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext.jsx";
import { LoginAdmin, LoginUser, LoginVendor } from '../api/auth.js';
import LoginImage from '../assets/Login.jpg'

function LoginPage(){
    const { user,checkAuth,loading } = useContext(AuthContext)
    const [role, setRole] = useState("user");
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate()

    const handleRoleChange = (e) =>{
        setRole(e.target.value)
    }

    // Redirect if already logged in
    useEffect(() => {
        if (!loading && user) {
        navigate("/")
        }
    }, [user, loading, navigate])

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            let response;
            if(role==="vendor"){
                response = await LoginVendor(formData)
            } else if(role==="admin"){
                response = await LoginAdmin(formData)
            } else{
                response = await LoginUser(formData)
            }

            checkAuth()
            toast.success(`Welcome ${response.data.user.name}`);
            navigate("/")
        } catch(error) {
            console.error('Error:', error)
            const message = error.response.data.message
            toast.error(message)

        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-[#FAF9F6] grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="hidden m-3 md:block">
                    <img src={LoginImage} alt="image" className="w-full h-full rounded-md object-cover"/>
                </div>
                <div className="flex flex-col justify-center p-5">
                    <h1 className="text-6xl mb-5" style={{ fontFamily: "'Great Vibes', cursive" }}>Login</h1>
                    <select 
                    name="role" 
                    id="role" 
                    value={role} 
                    onChange={handleRoleChange}
                    className="my-5 p-3 rounded-lg border">
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="vendor">Vendor</option>
                    </select>
                    <form onSubmit={handleSubmit} method="post" className='flex flex-col justify-center'>
                        <label className="block text-sm font-medium text-gray-700">Enter your Email:</label><br />
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required 
                            placeholder='Enter your email here.....' 
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 
                            focus:outline-none focus:ring-2 focus:ring-black
                            placeholder-gray-400"
                        /><br />

                        <label className="block text-sm font-medium text-gray-700">Enter your Password:</label><br />

                        <input 
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required 
                            placeholder='Enter your email here.....'
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 
                            focus:outline-none focus:ring-2 focus:ring-black
                            placeholder-gray-400"
                        /><br />

                        <button 
                            type="submit"
                            className="w-full py-3 rounded-full bg-black text-white 
                            font-semibold tracking-wide
                            hover:bg-gray-900 transition"
                        >Submit</button>
                    </form>
                    <Link to="/signup" className="text-grey text-center m-2">Dont have an account</Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage