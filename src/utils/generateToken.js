const Token = {
  generate: (data) => {
    const token = Buffer.alloc(24, data + ' ');
    return token.toString('base64');
  },
  decode: (token) => {
    const b64 = Buffer(token, 'base64');
    return b64.toString();
  },
};

export default Token;
