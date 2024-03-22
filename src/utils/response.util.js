const { NODE_ENV } = require('../constants/env.constant');

const sendFailedResponse = ({ res, error }) => {
  res.status(error.statusCode).json({
    code: error.statusCode,
    message: error.message,
    data: error.data,
    ...(NODE_ENV === 'local' ? { stack: error.stack } : undefined),
  });
};

const sendSuccessResponse = ({
  res,
  data = null,
  message = 'Success',
  code = 200,
}) => {
  res.status(code).json({
    code,
    data,
    message,
  });
};

module.exports = { sendFailedResponse, sendSuccessResponse };
