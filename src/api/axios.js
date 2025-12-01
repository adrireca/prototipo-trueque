import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true, // Habilitar el envío de cookies en las solicitudes
});

export default instance;