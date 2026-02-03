import api from "./axios.js"

export function LoginUser(data){
    return api.post('/auth/login/user', data)
}

export function SignUpUser(data){
    return api.post('/auth/signup/user',data)
}
export function LoginVendor(data){
    return api.post('/auth/login/vendor', data)
}

export function SignUpVendor(data){
    return api.post('/auth/signup/vendor', data)
}
// export function LoginAdmin(data){
//     return api.post('/auth/login/admin', data)
// }
export async function getProfile(){
    const res = await api.get('/auth/profile')
    return res
}

export function Logout(){
    return api.post('/auth/logout')
}