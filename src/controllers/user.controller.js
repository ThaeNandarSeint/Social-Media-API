const { catchAsync } = require('../utils/error_handler.util');
const { sendSuccessResponse } = require('../utils/response.util');

module.exports = ({ userService }) => {
  const getAllUsers = catchAsync(async (req, res) => {
    const data = await userService.getAllUsers(req.query);

    sendSuccessResponse({
      res,
      data,
    });
  });

  const getMyInfo = catchAsync(async (req, res) => {
    const data = await userService.getUserById(req.user._id);

    sendSuccessResponse({
      res,
      data,
    });
  });

  const updateOwnPassword = catchAsync(async (req, res) => {
    const data = await userService.updateOwnPassword(req.user._id, req.body);

    sendSuccessResponse({
      res,
      data,
    });
  });

  return {
    getAllUsers,
    getMyInfo,
    updateOwnPassword,
  };
};
