import axios from 'axios'
import { toast } from 'react-toastify';
//set config defaults when creating new instance

const instance = axios.create({
    baseURL: 'http://localhost:8080'
})

instance.defaults.withCredentials = true

// instance.defaults.headers.common['Authorization'] = 'AUTH_TOKEN'



// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (err) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    const status = err && err.response && err.response.status || 500
    console.log('check status: ', status)
    switch (status) {
        case 401: {
            toast.error('Unathorized user... Please login.')
            // window.location.href('/login')
            return Promise.reject(err)
        }
        case 403: {
            toast.error('You do not have permission to access this resource.')
            return Promise.reject(err)
        }
        case 400: {
            return Promise.reject(err)
        }
        case 404: {
            return Promise.reject(err)
        }
        case 409: {
            return Promise.reject(err)
        }
        case 422: {
            return Promise.reject(err)
        }
        default: {
            return Promise.reject(err)

        }
    }
    // return Promise.reject(error);
});

export default instance