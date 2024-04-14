const { POST_NOT_FOUND } = require('../constants/errors/post.error.constant');
const { ApiError } = require('../utils/error_handler.util');

module.exports = ({ fileStorageService, postRepository }) => {
  const createPost = async ({ files, ...data }) => {
    const attachments = await fileStorageService.uploadFiles(files);
    return await postRepository.createPost({ ...data, attachments });
  };

  const getAllPosts = async (query) => {
    return await postRepository.getAllPosts(query);
  };

  const getPostById = async (id) => {
    const post = await postRepository.getPostById(id);
    if (!post) throw ApiError.badRequest(POST_NOT_FOUND);
    return post;
  };

  const updatePost = async (id, { files, ...data }) => {
    await getPostById(id);
    const attachments = await fileStorageService.uploadFiles(files);
    return await postRepository.updatePostById(id, { ...data, attachments });
  };

  return {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
  };
};
