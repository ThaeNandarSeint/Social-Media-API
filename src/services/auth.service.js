const { USER_ALREADY_EXIST } = require('../constants/auth_error.constant');
const { generateToken } = require('../utils/auth.util');
const { ApiError } = require('../utils/error_handler.util');

module.exports = ({ userRepository }) => {
  const register = async (payload) => {
    const { email } = payload;

    const existingUser = await userRepository.getUserByUniqueField(
      'email',
      email
    );

    if (existingUser) {
      throw ApiError.badRequest(USER_ALREADY_EXIST);
    }

    const user = await userRepository.createUser(payload);

    const token = await generateToken({ userId: user._id });

    return { user, token };
  };

  return {
    register,
  };
};
