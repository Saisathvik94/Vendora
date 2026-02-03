import { createContext, useEffect, useState } from "react"
import { getProfile } from "../api/auth.js"

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [role, setRole] = useState(null)
    const [isLoggedIn, setisLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)

    const checkAuth = async() => {
        try {
            const res = await getProfile()
            if(res.data.loggedIn){
                setRole(res.data.user.role)
                setUser(res.data.user)
                setisLoggedIn(res.data.loggedIn)
            } else {
                console.log("Not logged in redirect to login")
                setUser(null)
                setRole(null)
                setisLoggedIn(false)
            }

        } catch {
            setUser(null)
            setRole(null)
            setisLoggedIn(false)
        } finally {
                setLoading(false)
        }
    }
    useEffect(()=>{
        checkAuth()   
    }, [])
    return (
        <AuthContext.Provider value={{ user,setUser,isLoggedIn,setisLoggedIn, checkAuth,role, loading }}>
        {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider



