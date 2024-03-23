module.exports = ({ userModel }) => {
  const getAllUsers = async (query) => {
    const { search, sort = '-createdAt', limit = 10, skip = 0 } = query;
    const filter = {};

    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [{ name: regex }];
    }

    const [users, count] = await Promise.all([
      userModel.find(filter).sort(sort).skip(skip).limit(limit),
      userModel.find(filter).countDocuments(),
    ]);

    return { count, users };
  };

  const getUserByUniqueField = async (field, value) => {
    return await userModel.findOne({ [field]: value });
  };

  const createUser = async (data) => {
    const user = await userModel.create(data);
    user.password = undefined;
    return user;
  };

  return {
    getAllUsers,
    getUserByUniqueField,
    createUser,
  };
};
