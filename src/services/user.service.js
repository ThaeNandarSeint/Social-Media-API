const {
  INCORRECT_PASSWORD,
} = require('../constants/errors/auth.error.constant');
const { USER_NOT_FOUND } = require('../constants/errors/user.error.constant');
const { verifyPassword } = require('../utils/auth.util');
const { ApiError } = require('../utils/error_handler.util');

module.exports = ({ fileStorageService, userRepository }) => {
  const getAllUsers = async (query) => {
    return await userRepository.getAllUsers(query);
  };

  const getUserById = async (id) => {
    const user = await userRepository.getUserById(id);
    if (!user) throw ApiError.badRequest(USER_NOT_FOUND);
    return user;
  };

  const updateUser = async (id, { file, ...data }) => {
    await getUserById(id);
    let avatar;
    if (file) {
      avatar = await fileStorageService.uploadFile(file, 'users');
    }
    return await userRepository.updateUserById(id, { ...data, avatar });
  };

  const updateOwnPassword = async (id, data) => {
    const { oldPassword, password } = data;

    const user = await userRepository.getUserById(id, '+password');

    const isCorrectPassword = await verifyPassword(oldPassword, user.password);

    if (!isCorrectPassword) throw ApiError.badRequest(INCORRECT_PASSWORD);

    return await userRepository.updateUserById(id, {
      password,
    });
  };

  const deleteUser = async (id) => {
    await getUserById(id);
    await userRepository.deleteUser({ id });
  };

  return {
    getAllUsers,
    getUserById,
    updateUser,
    updateOwnPassword,
    deleteUser,
  };
};
