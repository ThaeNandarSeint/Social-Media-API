module.exports = ({ postReactionModel }) => {
  const getAllReactions = async (query) => {
    const {
      sort = '-createdAt',
      limit = 10,
      skip = 0,
      actor,
      post,
      type,
    } = query;
    const filter = {};

    if (actor) {
      filter.actor = actor;
    }

    if (post) {
      filter.post = post;
    }

    if (type) {
      filter.type = type;
    }

    const [reactions, count] = await Promise.all([
      postReactionModel.find(filter).sort(sort).skip(skip).limit(limit),
      postReactionModel.find(filter).countDocuments(),
    ]);

    return { count, reactions };
  };

  const getReaction = async (filter) => {
    return await postReactionModel.findOne(filter);
  };

  const getReactionById = async (id) => {
    return await postReactionModel.findById(id);
  };

  const createReaction = async (data) => {
    return await postReactionModel.create(data);
  };

  const updateReactionById = async (id, data) => {
    return await postReactionModel.findByIdAndUpdate(id, data, { new: true });
  };

  const deleteReaction = async (filter) => {
    return await postReactionModel.deleteOne(filter);
  };

  return {
    getAllReactions,
    getReaction,
    getReactionById,
    createReaction,
    updateReactionById,
    deleteReaction,
  };
};
