module.exports = ({ userModel }) => {
  const getAllUsers = async (query) => {
    const { search, sort = '-createdAt', limit = 10, skip = 0 } = query;
    const filter = {};

    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [{ name: regex }];
    }

    const [data, count] = await Promise.all([
      userModel.find(filter).sort(sort).skip(skip).limit(limit),
      userModel.find(filter).countDocuments(),
    ]);

    return { data, count };
  };

  return {
    getAllUsers,
  };
};
