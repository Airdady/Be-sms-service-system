var axios = require('axios');

const Router = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
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
