const { POST_NOT_FOUND } = require('../constants/errors/post.error.constant');
const { ApiError } = require('../utils/error_handler.util');

module.exports = ({ postRepository }) => {
  const createPost = async (data) => {
    return await postRepository.createPost(data);
  };

  const getAllPosts = async (query) => {
    return await postRepository.getAllPosts(query);
  };

  const getPostById = async (id) => {
    const post = await postRepository.getPostById(id);
    if (!post) throw ApiError.badRequest(POST_NOT_FOUND);
    return post;
  };

  const updatePost = async (id, data) => {
    const post = await postRepository.updatePostById(id, data);
    if (!post) throw ApiError.badRequest(POST_NOT_FOUND);
    return post;
  };

  return {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
  };
};
