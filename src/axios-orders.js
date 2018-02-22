import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://ramley-burger-5814.firebaseio.com/'
});

export default instance;
