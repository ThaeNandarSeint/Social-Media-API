const { uploadFileToCloudinary } = require('../libs/cloudinary');

module.exports = () => {
  const uploadFiles = async (payload) => {
    const files = [];
    if (Array.isArray(payload)) {
      files.push(...payload);
    } else {
      files.push(payload);
    }
    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        const uploadedFile = await uploadFileToCloudinary(file);
        return {
          url: uploadedFile.secure_url,
          key: uploadedFile.public_id,
          filename: file.originalname,
          mimetype: file.mimetype,
        };
      })
    );

    return uploadedFiles;
  };

  return {
    uploadFiles,
  };
};
