const cloudinary = require('cloudinary').v2;
const {
  CLOUDINARY_API_SECRET,
  CLOUDINARY_API_KEY,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_BUCKET_NAME,
} = require('../constants/env.constant');
const {
  UPLOAD_ERROR,
} = require('../constants/errors/cloudinary.error.constant');
const { ApiError } = require('../utils/error_handler.util');

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const uploadFileToCloudinary = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: `${CLOUDINARY_BUCKET_NAME}/${folder}`,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            reject(new ApiError(UPLOAD_ERROR, 500, null));
          } else {
            resolve(result);
          }
        }
      )
      .end(file.buffer);
  });
};

module.exports = { uploadFileToCloudinary };
