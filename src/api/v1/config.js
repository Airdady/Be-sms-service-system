const axios = require('axios');
require('dotenv').config();

const Router = axios.create({
  baseURL: 'https://d7networks.com/api',
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
    Authorization: process.env.D7TOKEN,
  },
});

export default Router;
