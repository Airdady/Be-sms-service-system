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

export const SmsRouter = axios.create({
  baseURL: 'https://rest-api.d7networks.com/secure/',
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
    Authorization: 'Basic d3N0bjY2NzY6ZFVLMEZwWmQ=',
  },
});

export default Router;
