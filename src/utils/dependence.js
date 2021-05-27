const axios = require('axios');

const Router = axios.create({
  baseURL: 'https://api-airdady.herokuapp.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

const client = {
  otp: {
    keys: (keys) => {
      return {
        generate: ({ to }) => {
          return Router.post(`/generate/${to}?keys=${keys}`);
        },
        verify: ({ to }) => {
          return Router.post(`/generate/${to}?keys=${keys}`);
        },
        resend: ({ to }) => {
          return Router.post(`/generate/${to}?keys=${keys}`);
        },
      };
    },
  },
};

export default client;
