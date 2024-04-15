const { POST_NOT_FOUND } = require('../constants/errors/post.error.constant');
const { ApiError } = require('../utils/error_handler.util');

module.exports = ({ postReactionRepository }) => {
  const createReaction = async (data) => {
    return await postReactionRepository.createReaction(data);
  };

  const getAllReactions = async (query) => {
    return await postReactionRepository.getAllReactions(query);
  };

  const getReactionById = async (id) => {
    const reaction = await postReactionRepository.getReactionById(id);
    if (!reaction) throw ApiError.badRequest(POST_NOT_FOUND);
    return reaction;
  };

  const updateReaction = async (id, data) => {
    await getReactionById(id);
    return await postReactionRepository.updateReactionById(id, data);
  };

  const invokeReaction = async (data) => {
    const [oldReaction, relatedReaction] = await Promise.all([
      postReactionRepository.getReaction(data),
      postReactionRepository.getReaction({
        actor: data.actor,
        post: data.post,
      }),
    ]);

    if (oldReaction) {
      await postReactionRepository.deleteReaction(data);
    } else {
      if (relatedReaction)
        return await updateReaction(relatedReaction._id, data);
      return await createReaction(data);
    }
  };

  return {
    createReaction,
    getAllReactions,
    getReactionById,
    updateReaction,
    invokeReaction,
  };
};
