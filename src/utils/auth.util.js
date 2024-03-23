const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRE_TIME,
} = require('../constants/env.constant');

const verifyPassword = async (plainText, encrypted) => {
  return await bcrypt.compare(plainText, encrypted);
};

const generateToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRE_TIME },
      (error, token) => {
        if (error) reject(error);

        resolve(token);
      }
    );
  });
};

module.exports = {
  verifyPassword,
  generateToken,
};
