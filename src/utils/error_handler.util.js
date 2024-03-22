const {
  BAD_REQUEST,
  NOT_AUTHENTICATED,
  NOT_AUTHORIZED,
  END_POINT_NOT_FOUND,
} = require('../constants/global_error.constant');

class ApiError extends Error {
  constructor(message, statusCode, data = null) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;

    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = BAD_REQUEST, data = null) {
    return new ApiError(message, 400, data);
  }

  static notAuthenticated(message = NOT_AUTHENTICATED, data = null) {
    return new ApiError(message, 401, data);
  }

  static notAuthorized(message = NOT_AUTHORIZED, data = null) {
    return new ApiError(message, 403, data);
  }

  static notFound(message = END_POINT_NOT_FOUND) {
    return new ApiError(message, 404);
  }
}

const catchAsync = (callback) => {
  return (req, res, next) => {
    callback(req, res, next).catch(next);
  };
};

module.exports = { ApiError, catchAsync };
