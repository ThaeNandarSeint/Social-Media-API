const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRE_TIME,
} = require('../constants/env.constant');
const { ApiError } = require('./error_handler.util');
const {
  INVALID_TOKEN,
  TOKEN_EXPIRED,
} = require('../constants/errors/auth.error.constant');

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

const verifyToken = (
  token,
  errorMessages = {
    invalid: INVALID_TOKEN,
    expired: TOKEN_EXPIRED,
  }
) => {
  return new Promise((resolve, reject) => {
    if (typeof token !== 'string') {
      reject(ApiError.notAuthenticated(errorMessages.expired));
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, {}, (error, decoded) => {
      if (error) {
        if (error.name === 'TokenExpiredError') {
          reject(ApiError.notAuthenticated(errorMessages.expired));
        } else {
          reject(ApiError.notAuthenticated(errorMessages.invalid));
        }
      }

      resolve(decoded);
    });
  });
};

module.exports = {
  verifyPassword,
  generateToken,
  verifyToken,
};
