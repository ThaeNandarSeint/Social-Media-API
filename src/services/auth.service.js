const {
  WRONG_CREDENTIALS,
} = require('../constants/errors/auth.error.constant');
const {
  USER_ALREADY_EXIST,
} = require('../constants/errors/user.error.constant');
const { generateToken, verifyPassword } = require('../utils/auth.util');
const { ApiError } = require('../utils/error_handler.util');

module.exports = ({ userRepository }) => {
  const register = async (payload) => {
    const { email } = payload;

    const existingUser = await userRepository.getUserByUniqueField(
      'email',
      email
    );

    if (existingUser) throw ApiError.badRequest(USER_ALREADY_EXIST);

    const user = await userRepository.createUser(payload);

    const token = await generateToken({ userId: user._id });

    return { user, token };
  };

  const login = async (payload) => {
    const { email, password } = payload;

    const user = await userRepository.getUserByUniqueField(
      'email',
      email,
      '+password'
    );

    if (!user) throw ApiError.badRequest(WRONG_CREDENTIALS);

    const isCorrectPassword = await verifyPassword(password, user.password);

    if (!isCorrectPassword) throw ApiError.badRequest(WRONG_CREDENTIALS);

    user.password = undefined;

    const token = await generateToken({ userId: user._id });

    return { user, token };
  };

  return {
    register,
    login,
  };
};
