const { CONNECTION_STATUSES } = require('../constants/connection.constant');
const { catchAsync } = require('../utils/error_handler.util');
const { sendSuccessResponse } = require('../utils/response.util');

module.exports = ({ connectionService }) => {
  const sendFriendRequest = catchAsync(async (req, res) => {
    const data = await connectionService.sendFriendRequest({
      ...req.body,
      user: req.user._id,
    });

    sendSuccessResponse({
      res,
      data,
    });
  });

  const acceptFriendRequest = catchAsync(async (req, res) => {
    const data = await connectionService.acceptFriendRequest(req.params.id, {
      status: CONNECTION_STATUSES.ACCEPTED,
      accepted_at: Date.now(),
    });

    sendSuccessResponse({
      res,
      data,
    });
  });

  const rejectFriendRequest = catchAsync(async (req, res) => {
    const data = await connectionService.rejectFriendRequest(req.params.id, {
      status: CONNECTION_STATUSES.REJECTED,
    });

    sendSuccessResponse({
      res,
      data,
    });
  });

  const getAllConnections = catchAsync(async (req, res) => {
    const data = await connectionService.getAllConnections(req.query);

    sendSuccessResponse({
      res,
      data,
    });
  });

  const getConnectionById = catchAsync(async (req, res) => {
    const data = await connectionService.getConnectionById(req.params.id);

    sendSuccessResponse({
      res,
      data,
    });
  });

  return {
    sendFriendRequest,
    getAllConnections,
    getConnectionById,
    acceptFriendRequest,
    rejectFriendRequest,
  };
};
