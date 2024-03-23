module.exports = ({ userRepository }) => {
  const getAllUsers = async (query) => {
    return await userRepository.getAllUsers(query);
  };

  const getUserById = async (id) => {
    return await userRepository.getUserById(id);
  };

  return {
    getAllUsers,
    getUserById,
  };
};
