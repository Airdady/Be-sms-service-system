import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const authHelper = {
  createToken(userData) {
    return jwt.sign(userData, process.env.APP_KEY);
  },

  hashPassword(password) {
    return bcrypt.hashSync(password, 10, (err, hash) => hash);
  },

  hashData(password) {
    return bcrypt.hashSync(password, 10, (err, hash) => hash);
  },

  getToken(req) {
    const getToken = req.headers.authorization;
    const token =
      getToken && getToken.match("Bearer") ? getToken.split(" ")[1] : getToken;
    return req.params.token || token;
  },

  verifyToken(token) {
    return jwt.verify(token, process.env.APP_KEY, (error, user) => ({
      error,
      user,
    }));
  },

  comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash, (err, res) => res);
  },

  decrypt(password, hash) {
    return bcrypt.compareSync(password, hash, (err, res) => res);
  },
};

export default authHelper;
