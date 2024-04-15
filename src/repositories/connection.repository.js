module.exports = ({ connectionModel }) => {
  const getAllConnections = async (query) => {
    const {
      sort = '-createdAt',
      limit = 10,
      skip = 0,
      status,
      user,
      friend,
      search,
    } = query;
    const filter = {};

    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [{ 'user.name': regex }, { 'friend.name': regex }];
    }

    if (user) {
      filter.user = user;
    }

    if (friend) {
      filter.friend = friend;
    }

    if (status) {
      filter.status = status;
    }

    const [connections, count] = await Promise.all([
      connectionModel
        .find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate('user friend'),
      connectionModel.find(filter).countDocuments(),
    ]);

    return { count, connections };
  };

  const getConnectionByUniqueField = async (field, value) => {
    return await connectionModel.findOne({ [field]: value });
  };

  const getConnectionById = async (id) => {
    return await connectionModel.findById(id);
  };

  const createConnection = async (data) => {
    return await connectionModel.create(data);
  };

  const updateConnectionById = async (id, data) => {
    return await connectionModel.findByIdAndUpdate(id, data, { new: true });
  };

  return {
    getAllConnections,
    getConnectionByUniqueField,
    getConnectionById,
    createConnection,
    updateConnectionById,
  };
};
