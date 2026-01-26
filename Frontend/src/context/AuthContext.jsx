import { createContext, useEffect, useState } from "react"
import { getProfile } from "../api/auth"

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [role, setRole] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const checkAuth = async() => {
            try {
                const res = await getProfile()
                if(!res.data.loggedIn){
                    console.log("Not logged in redirect to login")
                    setUser(null)
                    setRole(null)
                    return
                }
                setRole(res.data.user.role)
                setUser(res.data.user)

            } catch {
                setUser(null)
                setRole(null)
            } finally {
                setLoading(false)
            }
        }
        checkAuth()   
    }, [])
    return (
        <AuthContext.Provider value={{ user, role, loading }}>
        {children}
        </AuthContext.Provider>
    )
}

