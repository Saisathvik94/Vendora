import api from "./axios.js"

export default function LoginUser(data){
    api.post('/auth/login/user', data)
}

export default function SignUpUser(data){
    api.post('/auth/signup/user',data)
}
export default function LoginVendor(data){
    api.post('/auth/login/user', data)
}

export default function SignUpVendor(data){
    api.post('/auth/signup/user', data)
}
export default async function getProfile(){
    const res = await api.get('/auth/profile')
    return res
}

export default function Logout(){
    api.post('/auth/logout')
}