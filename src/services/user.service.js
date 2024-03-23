module.exports = ({ userRepository }) => {
  const getAllUsers = async (query) => {
    return await userRepository.getAllUsers(query);
  };

  return {
    getAllUsers,
  };
};
