import axios from "axios";

const api= axios.create({
    baseURL:"https://jsonplaceholder.typicode.com"
})


api.interceptors.request.use((c)=>{
    console.log(`API is ${c.method?.toUpperCase()} ${c.url}`)
    return c
})
api.interceptors.response.use(
    (res)=>res,
    (err)=>{
    return Promise.reject(err)
})


export default api;