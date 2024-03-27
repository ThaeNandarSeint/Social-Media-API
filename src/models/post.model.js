const mongoose = require('mongoose');

const { createCustomId } = require('../helpers/global.helper');

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    postId: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

postSchema.pre(
  'validate',
  createCustomId({
    modelName: 'Post',
    prefix: 'P',
    fieldName: 'postId',
  })
);

const Post = mongoose.model('Post', postSchema, 'posts');

module.exports = Post;
