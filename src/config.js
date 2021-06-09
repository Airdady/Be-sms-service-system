const axios = require('axios');
require('dotenv').config();


const Router = axios.create({
  baseURL: 'https://api.rmlconnect.net',
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
    
  },
  params: {
    username: process.env.USERNAME.trim(),
    password: process.env.PASSWORD.trim(),
  },
});

export default Router;
