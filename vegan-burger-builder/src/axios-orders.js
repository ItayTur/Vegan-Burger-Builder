import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://vegan-burger-builder-3caa4.firebaseio.com/'
});

export default instance;