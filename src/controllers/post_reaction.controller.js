const { catchAsync } = require('../utils/error_handler.util');
const { sendSuccessResponse } = require('../utils/response.util');

module.exports = ({ postReactionService }) => {
  const getAllReactions = catchAsync(async (req, res) => {
    const data = await postReactionService.getAllReactions(req.query);

    sendSuccessResponse({
      res,
      data,
    });
  });

  const getReactionById = catchAsync(async (req, res) => {
    const data = await postReactionService.getReactionById(req.params.id);

    sendSuccessResponse({
      res,
      data,
    });
  });

  const invokeReaction = catchAsync(async (req, res) => {
    const data = await postReactionService.invokeReaction({
      ...req.body,
      actor: req.user._id,
    });

    sendSuccessResponse({
      res,
      data,
    });
  });

  return {
    getAllReactions,
    getReactionById,
    invokeReaction,
  };
};
