const mongoose = require('mongoose');
const { createCustomId } = require('../helpers/global.helper');
const { REACTION_TYPES } = require('../constants/reaction.constant');

const Schema = mongoose.Schema;

const postReactionSchema = new Schema(
  {
    postReactionId: {
      type: String,
      required: true,
      unique: true,
    },
    actor: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    post: {
      type: mongoose.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    type: {
      type: String,
      enum: [...Object.values(REACTION_TYPES)],
      default: REACTION_TYPES.LIKE,
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

postReactionSchema.pre(
  'validate',
  createCustomId({
    modelName: 'PostReaction',
    prefix: 'PostReaction',
    fieldName: 'postReactionId',
  })
);

const PostReaction = mongoose.model(
  'PostReaction',
  postReactionSchema,
  'post_reactions'
);

module.exports = PostReaction;
