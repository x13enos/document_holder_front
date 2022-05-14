import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://localhost:3001/api/v1',
    withCredentials: true
});

// Where you would set stuff like your 'Authorization' header, etc ...
// instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

// Also add/ configure interceptors && all the other cool stuff
// instance.interceptors.request...

export default instance;