module.exports = ({ postModel }) => {
  const getAllPosts = async (query) => {
    const { sort = '-createdAt', limit = 10, skip = 0, search, author } = query;
    const filter = {};

    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [{ title: regex }];
    }

    if (author) {
      filter.author = author;
    }

    const [users, count] = await Promise.all([
      postModel.find(filter).sort(sort).skip(skip).limit(limit),
      postModel.find(filter).countDocuments(),
    ]);

    return { count, users };
  };

  const getPostByUniqueField = async (field, value) => {
    return await postModel.findOne({ [field]: value });
  };

  const getPostById = async (id) => {
    return await postModel.findById(id);
  };

  const createPost = async (data) => {
    return await postModel.create(data);
  };

  const updatePostById = async (id, data) => {
    return await postModel.findByIdAndUpdate(id, data, { new: true });
  };

  return {
    getAllPosts,
    getPostByUniqueField,
    getPostById,
    createPost,
    updatePostById,
  };
};
