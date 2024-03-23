const { catchAsync } = require('../utils/error_handler.util');
const { sendSuccessResponse } = require('../utils/response.util');

module.exports = ({ authService }) => {
  const register = catchAsync(async (req, res) => {
    const data = await authService.register(req.body);

    sendSuccessResponse({
      res,
      data,
    });
  });

  const login = catchAsync(async (req, res) => {
    const data = await authService.login(req.body);

    sendSuccessResponse({
      res,
      data,
    });
  });

  return {
    register,
    login,
  };
};
