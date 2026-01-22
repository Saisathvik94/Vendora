import api from "./axios.js"

export default function LoginUser(data){
    api.post('/auth/login/user', data)
}

export default function SignUpUser(data){
    api.post('/auth/signup/user')
}
export default function LoginVendor(data){
    api.post('/auth/login/user', data)
}

export default function SignUpVendor(data){
    api.post('/auth/signup/user')
}
export default function getProfile(){
    api.get('/auth/profile', data)
}

export default function Logout(){
    api.post('/auth/logout')
}