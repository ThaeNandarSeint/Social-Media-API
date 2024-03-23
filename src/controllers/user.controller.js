const { catchAsync } = require('../utils/error_handler.util');
const { sendSuccessResponse } = require('../utils/response.util');

module.exports = ({ userService }) => {
  const getAllUsers = catchAsync(async (req, res) => {
    const { data, total } = await userService.getAllUsers(req.query);

    sendSuccessResponse({
      res,
      data,
      total,
    });
  });

  return {
    getAllUsers,
  };
};
