const { catchAsync } = require('../utils/error_handler.util');
const { sendSuccessResponse } = require('../utils/response.util');

module.exports = ({ postService }) => {
  const createPost = catchAsync(async (req, res) => {
    const data = await postService.createPost({
      ...req.body,
      author: req.user._id,
      files: req.files,
    });

    sendSuccessResponse({
      res,
      data,
    });
  });

  const getAllPosts = catchAsync(async (req, res) => {
    const data = await postService.getAllPosts({
      ...req.query,
      author: req.user._id,
    });

    sendSuccessResponse({
      res,
      data,
    });
  });

  const getPostById = catchAsync(async (req, res) => {
    const data = await postService.getPostById(req.params.id);

    sendSuccessResponse({
      res,
      data,
    });
  });

  const updatePost = catchAsync(async (req, res) => {
    const data = await postService.updatePost(req.params.id, req.body);

    sendSuccessResponse({
      res,
      data,
    });
  });

  return {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
  };
};
