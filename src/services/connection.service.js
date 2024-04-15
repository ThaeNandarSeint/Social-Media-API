const { CONNECTION_STATUSES } = require('../constants/connection.constant');
const {
  CONNECTION_NOT_FOUND,
  CANNOT_ACCEPT_FRIEND_REQUEST,
  CANNOT_REJECT_FRIEND_REQUEST,
  ALREADY_HAVE_RELATED_CONNECTIONS,
} = require('../constants/errors/connection.error.constant');
const { ApiError } = require('../utils/error_handler.util');

module.exports = ({ connectionRepository }) => {
  const getAllConnections = async (query) => {
    return await connectionRepository.getAllConnections(query);
  };

  const getConnectionById = async (id) => {
    const connection = await connectionRepository.getConnectionById(id);
    if (!connection) throw ApiError.badRequest(CONNECTION_NOT_FOUND);
    return connection;
  };

  const updateConnection = async (id, data) => {
    await getConnectionById(id);
    return await connectionRepository.updateConnectionById(id, data);
  };

  const sendFriendRequest = async ({ user, friend }) => {
    const [
      { connections: myFriendRequests },
      { connections: relatedFriendRequests },
    ] = await Promise.all([
      connectionRepository.getAllConnections({
        user,
        friend,
      }),
      connectionRepository.getAllConnections({
        user: friend,
        friend: user,
      }),
    ]);

    if (myFriendRequests.length || relatedFriendRequests.length) {
      throw ApiError.badRequest(ALREADY_HAVE_RELATED_CONNECTIONS);
    }

    return await connectionRepository.createConnection({ user, friend });
  };

  const acceptFriendRequest = async (id, data) => {
    const connection = await getConnectionById(id);
    if (connection.status !== CONNECTION_STATUSES.PENDING)
      throw ApiError.badRequest(CANNOT_ACCEPT_FRIEND_REQUEST);
    return await connectionRepository.updateConnectionById(id, data);
  };

  const rejectFriendRequest = async (id, data) => {
    const connection = await getConnectionById(id);
    if (connection.status !== CONNECTION_STATUSES.PENDING)
      throw ApiError.badRequest(CANNOT_REJECT_FRIEND_REQUEST);
    return await connectionRepository.updateConnectionById(id, data);
  };

  return {
    getAllConnections,
    getConnectionById,
    updateConnection,
    acceptFriendRequest,
    rejectFriendRequest,
    sendFriendRequest,
  };
};
