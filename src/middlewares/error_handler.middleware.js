const { SERVER_FALSE } = require('../constants/global_error.constant');
const { ApiError } = require('../utils/error_handler.util');
const { sendFailedResponse } = require('../utils/response.util');

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  if (error instanceof ApiError) {
    sendFailedResponse({ res, error });
  } else {
    res.status(500).json({
      code: 500,
      message: SERVER_FALSE,
      data: null,
    });
  }
};

module.exports = { errorHandler };
