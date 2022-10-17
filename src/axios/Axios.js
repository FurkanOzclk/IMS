import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/",
    
});
axiosInstance.interceptors.request.use(async req => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken !==null){
        req.headers.Authorization = `Bearer ${accessToken}`
      
    }
    return req
})


export  {axiosInstance};
