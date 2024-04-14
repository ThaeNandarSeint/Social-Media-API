const { uploadFileToCloudinary } = require('../libs/cloudinary');

module.exports = () => {
  const uploadFile = async (file, folder) => {
    const uploadedFile = await uploadFileToCloudinary(file, folder);
    return {
      url: uploadedFile.secure_url,
      key: uploadedFile.public_id,
      filename: file.originalname,
      mimetype: file.mimetype,
    };
  };

  const uploadFiles = async (payload, folder) => {
    const files = [];
    if (Array.isArray(payload)) {
      files.push(...payload);
    } else {
      files.push(payload);
    }
    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        return await uploadFile(file, folder);
      })
    );

    return uploadedFiles;
  };

  return {
    uploadFile,
    uploadFiles,
  };
};
